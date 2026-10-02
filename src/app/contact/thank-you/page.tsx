import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYou } from "@/components/thank-you";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Message received",
  description: "Thanks for getting in touch with Sea Pebbles. We'll reply within a day or so.",
  path: "/contact/thank-you",
  noIndex: true,
});

const clean = (v: string | string[] | undefined, max = 40) =>
  (typeof v === "string" ? v : "").replace(/[^\w\s'-]/g, "").slice(0, max);

const steps = [
  "Your message has gone to the restaurant's inbox and we've emailed you a copy.",
  "Someone from the team replies, usually within a day.",
  `If it can't wait, ring ${business.phone} during opening hours.`,
];

async function Content({ searchParams }: { searchParams: PageProps<"/contact/thank-you">["searchParams"] }) {
  const sp = await searchParams;
  const ref = clean(sp.ref, 12);
  const name = clean(sp.name, 30);
  return (
    <ThankYou
      eyebrow="Contact"
      title={name ? `Thanks ${name}, we've got your message` : "Thanks, we've got your message"}
      lead="We read everything that comes through the website and reply personally."
      reference={ref || undefined}
      nextSteps={steps}
    />
  );
}

export default function ContactThankYouPage(props: PageProps<"/contact/thank-you">) {
  return (
    <Suspense
      fallback={
        <ThankYou
          eyebrow="Contact"
          title="Thanks, we've got your message"
          lead="We read everything that comes through the website and reply personally."
          nextSteps={steps}
        />
      }
    >
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
