import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import {
  ArrowRightIcon,
  BagIcon,
  BikeIcon,
  CheckIcon,
  ExternalIcon,
  PhoneIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { OpenNowBadge } from "@/components/open-now-badge";
import { OpeningHours } from "@/components/opening-hours";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Order fish and chips from Sea Pebbles, Hatch End, for collection or delivery. Order direct through our website or app, or via Deliveroo across Pinner and Harrow.";

export const metadata: Metadata = pageMetadata({
  title: "Order Online: Collection & Delivery in Hatch End, Pinner and Harrow",
  description,
  path: "/order",
});

const directBenefits = [
  "Choose a collection time that suits you",
  "Pay online, then walk straight to the counter",
  "No platform fees, so it costs less than the apps",
  "Any changes? You deal with us, not a call centre",
];

const deliveryApps = [
  {
    name: "Deliveroo",
    area: "Hatch End, Pinner and the surrounding area",
    href: business.ordering.deliveroo,
  },
];

const steps = [
  {
    title: "Pick your fish",
    text: "Cod, haddock, plaice, rock or skate. Battered, in matzo meal, or grilled, same as in the restaurant.",
  },
  {
    title: "Choose a time and pay",
    text: "Tell us when you want it ready. We start frying so it comes out of the pan as you arrive.",
  },
  {
    title: "Collect at the counter",
    text: `Say your name at ${business.address.street}. Parking is on the road and in the side streets.`,
  },
];

const goodToKnow = [
  "Fish can be battered, in matzo meal, or grilled on takeaway orders too.",
  "Tell us about allergies when you order, whichever way you order.",
  "Delivery areas and fees are set by Deliveroo, not by us.",
  "Bank holiday hours may differ; check Instagram or Google before you order.",
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-sea-900 text-white">
        <div className="container-site pt-8 sm:pt-10">
          <Breadcrumbs items={[{ name: "Order Online", path: "/order" }]} light />
        </div>
        <div className="container-site grid items-center gap-10 pt-6 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-8 lg:pb-20">
          <div className="max-w-2xl">
            <OpenNowBadge />
            <p className="eyebrow mt-5 !text-sea-300">Collection &amp; delivery</p>
            <h1 className="mt-3 text-4xl leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
              Fish and chips, ready when you are
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Collect from the counter on Uxbridge Road or have it brought to your door. Ordering
              direct is the cheapest way; the delivery apps are the easiest if you&rsquo;re further
              out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.ordering.direct} target="_blank" rel="noopener" className="btn-light">
                Order for collection <ExternalIcon className="h-4 w-4" />
              </a>
              <a href="#delivery" className="btn-outline-light">
                Get it delivered
              </a>
              <a href={`tel:${business.phoneIntl}`} className="btn-outline-light">
                <PhoneIcon className="h-4 w-4" /> {business.phone}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
              <Image
                src="/images/gallery/takeaway-counter.jpg"
                alt="The Sea Pebbles takeaway counter with the heated display and menu boards"
                fill
                priority
                quality={80}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white p-4 text-sea-900 shadow-lift sm:block">
              <p className="text-xs font-semibold tracking-wide text-sea-700 uppercase">Order direct</p>
              <p className="font-display text-2xl font-semibold">No platform fees</p>
              <p className="text-xs text-pebble-600">Same menu, same prices as the counter</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two ways to order */}
      <section aria-labelledby="ways-heading" className="container-site py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Two ways to order</p>
          <h2 id="ways-heading" className="mt-3 text-3xl sm:text-4xl">
            Collect it yourself, or let someone bring it
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Collection */}
          <article className="card relative flex flex-col overflow-hidden p-7 ring-2 ring-sea-500 sm:p-9">
            <span className="absolute top-5 right-5 rounded-full bg-sea-600 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
              Best value
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-50 text-sea-700">
              <BagIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl sm:text-3xl">Collect from Uxbridge Road</h3>
            <p className="mt-3 text-pebble-600">
              Order through our own site or app. Everything is priced as it is at the counter, and
              the whole amount goes to the shop.
            </p>
            <ul className="mt-6 space-y-3">
              {directBenefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-pebble-800">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.ordering.direct} target="_blank" rel="noopener" className="btn-primary">
                Order direct <ExternalIcon className="h-4 w-4" />
              </a>
              <a href={business.ordering.iosApp} target="_blank" rel="noopener" className="btn-secondary">
                Get the iPhone app <ExternalIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-sm text-pebble-600">
              Rather talk to a person? Ring{" "}
              <a href={`tel:${business.phoneIntl}`} className="font-semibold whitespace-nowrap text-sea-700 underline underline-offset-2">
                {business.phone}
              </a>{" "}
              during opening hours and we&rsquo;ll have it ready to collect.
            </p>
          </article>

          {/* Delivery */}
          <article id="delivery" className="card flex scroll-mt-24 flex-col p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-50 text-sea-700">
              <BikeIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl sm:text-3xl">Get it delivered</h3>
            <p className="mt-3 text-pebble-600">
              We deliver through Deliveroo. The delivery area and fee are set by them, and you can
              track the rider in their app.
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {deliveryApps.map((app) => (
                <li key={app.name}>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-sand-50 px-5 py-4 ring-1 ring-sea-900/5 transition-colors hover:bg-sea-50 hover:ring-sea-200"
                  >
                    <span>
                      <span className="block font-semibold text-sea-900">Order on {app.name}</span>
                      <span className="mt-0.5 block text-sm text-pebble-600">{app.area}</span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sea-700 ring-1 ring-sea-900/10 transition-colors group-hover:bg-sea-600 group-hover:text-white group-hover:ring-sea-600">
                      <ExternalIcon className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-sand-100 px-4 py-3 text-sm text-pebble-600">
              Ordering for a group or an office? Call ahead and we can time everything to come out of
              the fryer together.
            </p>
          </article>
        </div>
      </section>

      {/* How collection works */}
      <section aria-labelledby="steps-heading" className="bg-white py-16 lg:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">How collection works</p>
            <h2 id="steps-heading" className="mt-3 text-3xl sm:text-4xl">
              Three steps and it&rsquo;s in the bag
            </h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="font-display text-5xl font-semibold text-sea-200">{i + 1}</span>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pebble-600">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/menu" className="link-arrow mt-8">
            Browse the full menu first <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Hours and tips */}
      <section className="container-site grid gap-6 py-16 lg:grid-cols-2 lg:items-start lg:py-20">
        <div className="card p-7 sm:p-9">
          <p className="eyebrow">Takeaway hours</p>
          <h2 className="mt-3 text-2xl">Same hours as the restaurant</h2>
          <div className="mt-6">
            <OpeningHours />
          </div>
          <p className="mt-6 text-sm text-pebble-600">
            Prefer to sit down?{" "}
            <Link href="/reserve" className="font-semibold text-sea-700 underline underline-offset-2">
              Book a table
            </Link>{" "}
            instead.
          </p>
        </div>
        <div className="card p-7 sm:p-9">
          <p className="eyebrow">Good to know</p>
          <h2 className="mt-3 text-2xl">Before you order</h2>
          <ul className="mt-6 space-y-3">
            {goodToKnow.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-pebble-800">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-sea-600" />
                {item}
              </li>
            ))}
          </ul>
          <a href={`tel:${business.phoneIntl}`} className="btn-secondary mt-8">
            <PhoneIcon className="h-4 w-4" /> Call {business.phone}
          </a>
        </div>
      </section>

      <div className="pb-4">
        <CtaBand
          title="Eating in tonight?"
          text="Tables go quickly on Friday and Saturday. Book ahead and we'll have one ready."
          showOrder={false}
        />
      </div>
    </>
  );
}
