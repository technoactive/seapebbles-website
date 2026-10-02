import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYou } from "@/components/thank-you";
import { formatTime12h } from "@/lib/hours";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Table request received",
  description: "Thanks for your table request. We'll confirm by phone or email shortly.",
  path: "/reserve/thank-you",
  noIndex: true,
});

function longDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/London",
  }).format(new Date(Date.UTC(y, m - 1, d, 12)));
}

const clean = (v: string | string[] | undefined, max = 40) =>
  (typeof v === "string" ? v : "").replace(/[^\w\s:'-]/g, "").slice(0, max);

async function Content({ searchParams }: { searchParams: PageProps<"/reserve/thank-you">["searchParams"] }) {
  const sp = await searchParams;
  const ref = clean(sp.ref, 12);
  const name = clean(sp.name, 30);
  const people = clean(sp.people, 3);
  const date = longDate(clean(sp.date, 10));
  const time = /^\d{2}:\d{2}$/.test(clean(sp.time, 5)) ? formatTime12h(clean(sp.time, 5)) : "";

  const details = [
    people && { label: "Party size", value: `${people} ${people === "1" ? "person" : "people"}` },
    date && { label: "Date", value: date },
    time && { label: "Time", value: time },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <ThankYou
      eyebrow="Reservations"
      title={name ? `Thanks ${name}, we've got your request` : "Thanks, we've got your request"}
      lead="We've sent a copy to your email. One of the team will check the diary and confirm by phone or email, usually within a few hours during opening times."
      reference={ref || undefined}
      details={details}
      nextSteps={[
        "We check the diary and call or email you to confirm.",
        "Your table is only booked once you've heard from us.",
        `Need to change anything, or is it for tonight? Ring ${business.phone}.`,
      ]}
    />
  );
}

export default function ReserveThankYouPage(props: PageProps<"/reserve/thank-you">) {
  return (
    <Suspense
      fallback={
        <ThankYou
          eyebrow="Reservations"
          title="Thanks, we've got your request"
          lead="One of the team will confirm by phone or email shortly."
          nextSteps={["We check the diary and get back to you.", "Your table is only booked once you've heard from us."]}
        />
      }
    >
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
