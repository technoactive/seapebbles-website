import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ExternalIcon, PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { OpeningHours } from "@/components/opening-hours";
import { PageHero } from "@/components/page-hero";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Order fish and chips from Sea Pebbles, Hatch End, for collection or delivery. Order direct through our website or app, or via Uber Eats and Deliveroo across Pinner and Harrow.";

export const metadata: Metadata = pageMetadata({
  title: "Order Online: Collection & Delivery in Hatch End, Pinner and Harrow",
  description,
  path: "/order",
});

const options = [
  {
    name: "Order direct for collection",
    blurb:
      "Our own ordering site. Choose a pick-up time, pay online and it will be ready at the counter. No platform fees, and you deal with us directly if anything needs changing.",
    href: business.ordering.direct,
    cta: "Order direct",
    highlight: true,
  },
  {
    name: "Sea Pebbles app",
    blurb:
      "The same direct ordering, in an app. Saves your usual order and lets you reorder in a couple of taps. Available for iPhone.",
    href: business.ordering.iosApp,
    cta: "Get the iPhone app",
  },
  {
    name: "Uber Eats",
    blurb: "Delivery to Hatch End, Pinner, Harrow and nearby postcodes. Track the driver in the Uber Eats app.",
    href: business.ordering.uberEats,
    cta: "Order on Uber Eats",
  },
  {
    name: "Deliveroo",
    blurb: "Delivery to Hatch End, Pinner and the surrounding area through Deliveroo.",
    href: business.ordering.deliveroo,
    cta: "Order on Deliveroo",
  },
];

export default function OrderPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/order",
            name: "Order online from Sea Pebbles",
            description,
          }),
        )}
      />
      <PageHero
        eyebrow="Collection & delivery"
        title="Order online"
        intro="Collect from the counter on Uxbridge Road or have it brought to your door. Ordering direct is the cheapest way; the delivery apps are the easiest if you're further out."
        crumbs={[{ name: "Order Online", path: "/order" }]}
      />

      <section className="container-site grid gap-6 md:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.name}
            className={`card flex flex-col p-7 ${option.highlight ? "ring-2 ring-sea-500" : ""}`}
          >
            {option.highlight && (
              <p className="mb-2 text-xs font-semibold tracking-wide text-sea-600 uppercase">Recommended</p>
            )}
            <h2 className="text-2xl">{option.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-pebble-600">{option.blurb}</p>
            <a
              href={option.href}
              target="_blank"
              rel="noopener"
              className={`mt-6 ${option.highlight ? "btn-primary" : "btn-secondary"} self-start`}
            >
              {option.cta} <ExternalIcon className="h-4 w-4" />
            </a>
          </div>
        ))}
      </section>

      <section className="container-site mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="prose-site">
          <h2 className="!mt-0">Or just call us</h2>
          <p>
            If you would rather speak to a person, ring{" "}
            <a href={`tel:${business.phoneIntl}`}>{business.phone}</a> during opening hours and we will
            have it ready for you to collect. Takeaway is served across the same hours as the
            restaurant.
          </p>
          <p>
            Ordering for a group or an office? Call ahead and we can time everything to come out of the
            fryer together.
          </p>
          <h3>Things worth knowing</h3>
          <ul>
            <li>Fish can be battered, in matzo meal, or grilled on takeaway orders too.</li>
            <li>Tell us about allergies when you order, whichever way you order.</li>
            <li>Delivery areas and fees are set by Uber Eats and Deliveroo, not by us.</li>
            <li>Bank holiday hours may differ; check Instagram or Google before you order.</li>
          </ul>
          <a
            href={`tel:${business.phoneIntl}`}
            className="btn-secondary mt-4 !no-underline"
          >
            <PhoneIcon className="h-4 w-4" /> Call {business.phone}
          </a>
        </div>
        <div className="space-y-6">
          <div className="card p-7">
            <h2 className="text-xl">Takeaway hours</h2>
            <div className="mt-4">
              <OpeningHours />
            </div>
          </div>
          <figure className="overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/gallery/battered-fish-takeaway-counter.jpg"
              alt="Freshly battered fish resting in the heated display at the takeaway counter"
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </figure>
          <p className="text-sm text-pebble-600">
            Prefer to sit down? <Link href="/reserve" className="font-semibold text-sea-700 underline underline-offset-2">Book a table</Link> instead.
          </p>
        </div>
      </section>

      <div className="mt-20">
        <CtaBand title="Eating in tonight?" text="Tables go quickly on Friday and Saturday. Book ahead and we'll have one ready." />
      </div>
    </>
  );
}
