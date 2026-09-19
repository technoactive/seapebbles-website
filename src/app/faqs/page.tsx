import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/lib/faq";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Answers to common questions about Sea Pebbles in Hatch End: bookings, opening hours, parking, takeaway and delivery, allergies, vegetarian options and children.";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: Bookings, Hours, Allergies, Parking & Delivery",
  description,
  path: "/faqs",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/faqs",
              name: "Sea Pebbles FAQs",
              description,
              type: "FAQPage",
            }),
            ...faqSchema(faqs),
          },
        )}
      />
      <PageHero
        eyebrow="FAQs"
        title="Questions we get asked a lot"
        intro="If yours isn't here, call us on 020 8428 0203 or send an email and a real person will answer."
        crumbs={[{ name: "FAQs", path: "/faqs" }]}
      />

      <section className="container-site max-w-3xl">
        <dl className="divide-y divide-sea-900/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="font-display text-xl text-sea-900">{faq.question}</dt>
              <dd className="mt-3 leading-relaxed text-pebble-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-2xl bg-sand-100 p-6 text-sm text-pebble-800">
          <p>
            Still stuck? Email{" "}
            <a href={`mailto:${business.email}`} className="font-semibold text-sea-700 underline underline-offset-2">
              {business.email}
            </a>
            , call{" "}
            <a href={`tel:${business.phoneIntl}`} className="font-semibold text-sea-700 underline underline-offset-2">
              {business.phone}
            </a>{" "}
            during opening hours, or use the{" "}
            <Link href="/contact" className="font-semibold text-sea-700 underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="mt-20">
        <CtaBand />
      </div>
    </>
  );
}
