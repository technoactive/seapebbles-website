"use server";

import { weekdayOf } from "@/lib/hours";
import {
  validateReservation,
  type ReservationFields,
  type ReservationState,
} from "@/lib/reservation";
import { business } from "@/lib/site";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
}

/**
 * Sends the request to the restaurant. Uses Resend's HTTP API when
 * RESEND_API_KEY is configured; in development without a key it logs instead.
 */
async function deliver(values: ReservationFields): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATIONS_TO_EMAIL ?? business.email;
  const from =
    process.env.RESERVATIONS_FROM_EMAIL ?? "Sea Pebbles Website <reservations@seapebbles.co.uk>";

  const summary = [
    `Name: ${values.name}`,
    `Party size: ${values.people}`,
    `Date: ${values.date} (${weekdayOf(values.date)})`,
    `Time: ${values.time}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    values.notes ? `Notes: ${values.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[reservation] RESEND_API_KEY not set; request logged only:\n${summary}`);
      return true;
    }
    console.error("[reservation] RESEND_API_KEY missing in production; request not delivered.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Table request: ${values.name}, ${values.people} people, ${values.date} ${values.time}`,
        text: `New table request from the website.\n\n${summary}\n\nPlease confirm with the guest by phone or email.`,
        html: `<p>New table request from the website.</p><pre style="font:14px/1.5 ui-monospace,monospace">${escapeHtml(summary)}</pre><p>Please confirm with the guest by phone or email.</p>`,
      }),
    });

    if (!res.ok) {
      console.error("[reservation] Resend responded", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.error("[reservation] delivery failed", error);
    return false;
  }
}

export async function submitReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  // Honeypot: real browsers leave this empty.
  if (str(formData, "website")) {
    return { status: "success", message: "Thanks, we have your request." };
  }

  const values: ReservationFields = {
    name: str(formData, "name"),
    people: str(formData, "people"),
    date: str(formData, "date"),
    time: str(formData, "time"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    notes: str(formData, "notes"),
  };

  const errors = validateReservation(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const delivered = await deliver(values);
  if (!delivered) {
    return {
      status: "error",
      message: `Sorry, we couldn't send your request just now. Please call us on ${business.phone} and we'll sort it over the phone.`,
      values,
    };
  }

  const firstName = values.name.split(" ")[0];
  return {
    status: "success",
    message: `Thanks ${firstName}, we've received your request for ${values.people} on ${values.date} at ${values.time}. We'll confirm by phone or email shortly. Your table isn't booked until you hear from us.`,
  };
}
