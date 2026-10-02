"use server";

import { redirect } from "next/navigation";
import { topicLabel, validateContact, type ContactFields, type ContactState } from "@/lib/contact";
import { CONTACT_TO, fromMailbox, makeReference, renderEmail, sendMail } from "@/lib/mail";
import { SITE_URL, business } from "@/lib/site";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function restaurantEmail(v: ContactFields, ref: string) {
  return renderEmail({
    preheader: `${v.name}: ${v.message.slice(0, 90)}`,
    eyebrow: "Website message",
    heading: topicLabel(v.topic),
    intro: [`${v.name} sent a message through the contact form.`],
    rows: [
      { label: "Reference", value: ref },
      { label: "Name", value: v.name },
      { label: "Email", value: v.email },
      { label: "Phone", value: v.phone || "Not given" },
      { label: "About", value: topicLabel(v.topic) },
    ],
    quote: { label: "Message", text: v.message },
    outro: ["Replying to this email goes straight to them."],
    footnote: `Sent by the contact form at ${SITE_URL}/contact.`,
  });
}

function senderEmail(v: ContactFields, ref: string) {
  const firstName = v.name.split(" ")[0];
  return renderEmail({
    preheader: "We've received your message and will reply within a day or so.",
    eyebrow: "Message received",
    heading: `Thanks ${firstName}, we've got your message`,
    intro: [
      "It's landed in the restaurant's inbox and someone will reply, usually within a day. If it's about a table for today, ringing us is quicker.",
    ],
    rows: [
      { label: "Reference", value: ref },
      { label: "About", value: topicLabel(v.topic) },
    ],
    quote: { label: "What you sent", text: v.message },
    outro: [`Anything urgent? Call ${business.phone} during opening hours.`],
    cta: { label: "Opening hours and directions", href: `${SITE_URL}/contact` },
    footnote: `We only use these details to reply to you. ${SITE_URL}/privacy-policy`,
  });
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (str(formData, "website")) {
    redirect("/contact/thank-you");
  }

  const values: ContactFields = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    topic: str(formData, "topic"),
    message: str(formData, "message"),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const ref = makeReference("SP");

  const delivered = await sendMail({
    to: CONTACT_TO,
    replyTo: values.email,
    subject: `${topicLabel(values.topic)} from ${values.name} (${ref})`,
    ...restaurantEmail(values, ref),
    tags: { form: "contact", kind: "restaurant" },
  });

  if (!delivered.ok) {
    return {
      status: "error",
      message: `Sorry, we couldn't send your message just now. Please email ${business.email} or call ${business.phone}.`,
      values,
    };
  }

  await sendMail({
    to: values.email,
    from: fromMailbox(CONTACT_TO),
    subject: `We've received your message (${ref})`,
    ...senderEmail(values, ref),
    tags: { form: "contact", kind: "sender" },
  });

  const params = new URLSearchParams({ ref, name: values.name.split(" ")[0] });
  redirect(`/contact/thank-you?${params.toString()}`);
}
