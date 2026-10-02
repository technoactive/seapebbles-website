"use server";

import { redirect } from "next/navigation";
import { formatTime12h } from "@/lib/hours";
import { RESERVATIONS_TO, makeReference, renderEmail, sendMail } from "@/lib/mail";
import {
  validateReservation,
  type ReservationFields,
  type ReservationState,
} from "@/lib/reservation";
import { SITE_URL, business } from "@/lib/site";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(new Date(Date.UTC(y, m - 1, d, 12)));
}

/** Email to the restaurant: everything they need to confirm the table. */
function restaurantEmail(v: ReservationFields, ref: string) {
  const when = `${longDate(v.date)} at ${formatTime12h(v.time)}`;
  return renderEmail({
    preheader: `${v.name}, ${v.people} people, ${when}`,
    eyebrow: "New table request",
    heading: `${v.people} ${Number(v.people) === 1 ? "person" : "people"}, ${when}`,
    intro: [`A guest has asked for a table through the website. Please confirm with them by phone or email; the table is not booked until you do.`],
    rows: [
      { label: "Reference", value: ref },
      { label: "Name", value: v.name },
      { label: "Party size", value: v.people },
      { label: "Date", value: `${longDate(v.date)}` },
      { label: "Time", value: formatTime12h(v.time) },
      { label: "Phone", value: v.phone },
      { label: "Email", value: v.email },
    ],
    quote: v.notes ? { label: "Guest's notes", text: v.notes } : undefined,
    outro: ["Replying to this email goes straight to the guest."],
    cta: { label: `Call ${v.name.split(" ")[0]}`, href: `tel:${v.phone.replace(/[^\d+]/g, "")}` },
    footnote: `Sent by the booking form at ${SITE_URL}/reserve. The guest was told to expect a confirmation from you.`,
  });
}

/** Acknowledgement to the guest. Clear that it is a request, not a booking. */
function guestEmail(v: ReservationFields, ref: string) {
  const firstName = v.name.split(" ")[0];
  const when = `${longDate(v.date)} at ${formatTime12h(v.time)}`;
  return renderEmail({
    preheader: `We've received your request for ${when}. We'll confirm shortly.`,
    eyebrow: "Table request received",
    heading: `Thanks ${firstName}, we've got your request`,
    intro: [
      `You asked for a table for ${v.people} on ${when}. One of the team will check the diary and confirm by phone or email, usually within a few hours during opening times.`,
      `Your table isn't booked until you hear back from us.`,
    ],
    rows: [
      { label: "Reference", value: ref },
      { label: "Party size", value: v.people },
      { label: "Date", value: longDate(v.date) },
      { label: "Time", value: formatTime12h(v.time) },
      { label: "Phone we'll call", value: v.phone },
    ],
    quote: v.notes ? { label: "Your notes", text: v.notes } : undefined,
    outro: [
      `Need to change anything, or is it for tonight? Ringing us on ${business.phone} is quickest. You can also just reply to this email.`,
    ],
    cta: { label: "See the menu", href: `${SITE_URL}/menu` },
    footnote: `We only use these details to manage your booking. ${SITE_URL}/privacy-policy`,
  });
}

export async function submitReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  // Honeypot: real browsers leave this empty. Pretend it worked.
  if (str(formData, "website")) {
    redirect("/reserve/thank-you");
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

  const ref = makeReference("SP");
  const toRestaurant = restaurantEmail(values, ref);
  const toGuest = guestEmail(values, ref);

  const delivered = await sendMail({
    to: RESERVATIONS_TO,
    replyTo: values.email,
    subject: `Table request ${ref}: ${values.name}, ${values.people} people, ${values.date} ${values.time}`,
    ...toRestaurant,
    tags: { form: "reservation", kind: "restaurant" },
  });

  if (!delivered.ok) {
    return {
      status: "error",
      message: `Sorry, we couldn't send your request just now. Please call us on ${business.phone} and we'll sort it over the phone.`,
      values,
    };
  }

  // The guest's copy is best-effort: the request has already reached the
  // restaurant, so a failure here should not show the guest an error.
  await sendMail({
    to: values.email,
    replyTo: RESERVATIONS_TO,
    subject: `We've received your table request (${ref})`,
    ...toGuest,
    tags: { form: "reservation", kind: "guest" },
  });

  const params = new URLSearchParams({
    ref,
    name: values.name.split(" ")[0],
    people: values.people,
    date: values.date,
    time: values.time,
  });
  redirect(`/reserve/thank-you?${params.toString()}`);
}
