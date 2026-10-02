import "server-only";

import { SITE_URL, business, formatAddress } from "@/lib/site";

/**
 * Outbound email for the website forms, sent through Resend's HTTP API.
 *
 * Everything leaves from one verified sender (website@seapebbles.co.uk) so
 * DKIM/SPF line up. Replies are steered with `reply_to`: the restaurant
 * replies straight to the guest, and the guest's auto-acknowledgement replies
 * to the relevant restaurant mailbox.
 */

export const MAIL_FROM = process.env.MAIL_FROM ?? `${business.name} <website@seapebbles.co.uk>`;
export const RESERVATIONS_TO = process.env.RESERVATIONS_TO_EMAIL ?? "reservations@seapebbles.co.uk";
export const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? business.email;

export type Mail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  /** Resend tags, useful for filtering in the dashboard. */
  tags?: Record<string, string>;
};

export type SendResult = { ok: true; id?: string } | { ok: false; reason: string };

export async function sendMail(mail: Mail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail] RESEND_API_KEY not set; would send to ${mail.to}:\n${mail.text}`);
      return { ok: true };
    }
    console.error("[mail] RESEND_API_KEY missing in production; message not sent.");
    return { ok: false, reason: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: Array.isArray(mail.to) ? mail.to : [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        tags: mail.tags
          ? Object.entries(mail.tags).map(([name, value]) => ({ name, value }))
          : undefined,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[mail] Resend responded", res.status, body);
      return { ok: false, reason: `http-${res.status}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (error) {
    console.error("[mail] send failed", error);
    return { ok: false, reason: "network" };
  }
}

/** Short human-friendly reference, e.g. "SP-7K3MQ". Not a security token. */
export function makeReference(prefix = "SP") {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L
  let s = "";
  for (let i = 0; i < 5; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${prefix}-${s}`;
}

export function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
}

/* ------------------------------------------------------------------ */
/* Branded template                                                    */
/* ------------------------------------------------------------------ */

export type EmailRow = { label: string; value: string };

export type EmailTemplate = {
  /** Hidden preview text shown in inbox lists. */
  preheader: string;
  /** Small uppercase label above the heading. */
  eyebrow: string;
  heading: string;
  /** Paragraphs under the heading. Plain text; line breaks become <br>. */
  intro: string[];
  /** Label/value table. */
  rows?: EmailRow[];
  /** Free text block shown in a quoted panel (e.g. the guest's message). */
  quote?: { label: string; text: string };
  /** Paragraphs after the table. */
  outro?: string[];
  cta?: { label: string; href: string };
  /** Tiny grey note at the bottom of the card. */
  footnote?: string;
};

const NAVY = "#0b2540";
const SEA = "#0f7cb4";
const SAND = "#fcfaf5";
const INK = "#2e302e";
const MUTED = "#5e615d";
const LINE = "#e6e8e6";

function paragraphs(items: string[] | undefined, style: string) {
  if (!items?.length) return "";
  return items
    .map((p) => `<p style="${style}">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

/** Builds matching HTML and plain-text versions of a message. */
export function renderEmail(t: EmailTemplate): { html: string; text: string } {
  const pStyle = `margin:0 0 14px;font:16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};`;
  const smallStyle = `margin:0;font:13px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${MUTED};`;

  const rowsHtml = t.rows?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 18px;border-collapse:collapse;">
        ${t.rows
          .map(
            (r, i) => `<tr>
              <td style="padding:10px 12px;border-top:1px solid ${LINE};${i === t.rows!.length - 1 ? `border-bottom:1px solid ${LINE};` : ""}font:600 13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${MUTED};width:38%;vertical-align:top;">${escapeHtml(r.label)}</td>
              <td style="padding:10px 12px;border-top:1px solid ${LINE};${i === t.rows!.length - 1 ? `border-bottom:1px solid ${LINE};` : ""}font:15px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${NAVY};vertical-align:top;">${escapeHtml(r.value).replace(/\n/g, "<br>")}</td>
            </tr>`,
          )
          .join("")}
      </table>`
    : "";

  const quoteHtml = t.quote
    ? `<div style="margin:6px 0 18px;padding:14px 16px;background:${SAND};border-left:3px solid ${SEA};border-radius:0 8px 8px 0;">
        <p style="margin:0 0 6px;font:600 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${SEA};">${escapeHtml(t.quote.label)}</p>
        <p style="${pStyle}margin:0;white-space:pre-wrap;">${escapeHtml(t.quote.text)}</p>
      </div>`
    : "";

  const ctaHtml = t.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;"><tr><td style="border-radius:999px;background:${SEA};">
        <a href="${escapeHtml(t.cta.href)}" style="display:inline-block;padding:12px 22px;font:600 15px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(t.cta.label)}</a>
      </td></tr></table>`
    : "";

  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(t.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#eef1f4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(t.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f4;">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="background:${NAVY};border-radius:16px 16px 0 0;padding:24px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:14px;"><img src="${SITE_URL}/images/logo-white.png" width="64" height="48" alt="" style="display:block;width:64px;height:auto;border:0;"></td>
        <td style="vertical-align:middle;">
          <div style="font:600 20px/1.2 Georgia,'Times New Roman',serif;color:#ffffff;">${escapeHtml(business.name)}</div>
          <div style="font:11px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#9fd3ef;">Hatch End · Est. ${business.foundingYear}</div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="background:#ffffff;padding:32px 32px 24px;">
      <p style="margin:0 0 8px;font:600 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${SEA};">${escapeHtml(t.eyebrow)}</p>
      <h1 style="margin:0 0 16px;font:600 26px/1.2 Georgia,'Times New Roman',serif;color:${NAVY};">${escapeHtml(t.heading)}</h1>
      ${paragraphs(t.intro, pStyle)}
      ${rowsHtml}
      ${quoteHtml}
      ${paragraphs(t.outro, pStyle)}
      ${ctaHtml}
      ${t.footnote ? `<p style="${smallStyle}border-top:1px solid ${LINE};padding-top:14px;">${escapeHtml(t.footnote)}</p>` : ""}
    </td></tr>
    <tr><td style="background:${SAND};border-radius:0 0 16px 16px;padding:18px 32px;border-top:1px solid ${LINE};">
      <p style="${smallStyle}"><strong style="color:${NAVY};">${escapeHtml(business.name)}</strong> · ${escapeHtml(formatAddress())}<br>
      <a href="tel:${business.phoneIntl}" style="color:${SEA};text-decoration:none;">${business.phone}</a> · <a href="${SITE_URL}" style="color:${SEA};text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    t.heading.toUpperCase(),
    "",
    ...t.intro,
    "",
    ...(t.rows ?? []).map((r) => `${r.label}: ${r.value}`),
    t.rows?.length ? "" : null,
    t.quote ? `${t.quote.label}:\n${t.quote.text}\n` : null,
    ...(t.outro ?? []),
    t.cta ? `\n${t.cta.label}: ${t.cta.href}` : null,
    t.footnote ? `\n${t.footnote}` : null,
    "",
    "--",
    `${business.name} · ${formatAddress()}`,
    `${business.phone} · ${SITE_URL}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { html, text };
}
