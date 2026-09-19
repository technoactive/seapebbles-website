import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon, ExternalIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { OpenNowBadge } from "@/components/open-now-badge";
import { OpeningHours } from "@/components/opening-hours";
import { Testimonials } from "@/components/testimonials";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business, lunchDeal } from "@/lib/site";

const description =
  "Family-run fish and chip restaurant and takeaway on Uxbridge Road, Hatch End. Fresh cod, haddock and plaice fried in batter or matzo meal, or grilled. Dine in, collect or order delivery.";

export const metadata: Metadata = pageMetadata({
  title: "Sea Pebbles | Fish & Chips Restaurant and Takeaway in Hatch End",
  description,
  path: "/",
});

const trustPoints = [
  { label: "Food Hygiene Rating", value: "5 out of 5" },
  { label: "Frying since", value: "1990" },
  { label: "Fish & Chip Shop of the Year", value: "Area winner" },
  { label: "Recommended by", value: "Evening Standard" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: "Sea Pebbles, Hatch End",
            description,
          }),
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sea-900 text-white">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="max-w-2xl">
            <OpenNowBadge />
            <p className="eyebrow mt-5 !text-sea-300">Est. 1990 · Hatch End, Pinner</p>
            <h1 className="mt-3 text-4xl leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
              Fried fish at its best, on Uxbridge Road since 1990
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Sea Pebbles is a family-run fish restaurant and takeaway in Hatch End. Cod, haddock,
              plaice, rock and skate, fried in batter or matzo meal or grilled, with chips cut fresh
              every day. Eat in, collect from the counter, or have it delivered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-light">
                See the menu
              </Link>
              <Link href="/reserve" className="btn-primary">
                Book a table
              </Link>
              <Link href="/order" className="btn-outline-light">
                Order online
              </Link>
            </div>
            <div className="mt-8 flex flex-col gap-2 text-sm text-white/75 sm:flex-row sm:items-center sm:gap-6">
              <a href={business.googleMapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white">
                <PinIcon className="h-4 w-4" />
                {business.address.street}, {business.address.locality}, {business.address.postcode}
              </a>
              <a href={`tel:${business.phoneIntl}`} className="inline-flex items-center gap-2 hover:text-white">
                <PhoneIcon className="h-4 w-4" />
                {business.phone}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10 sm:aspect-[5/6]">
              <Image
                src="/images/hero-dining-room-mural.jpg"
                alt="Sea Pebbles dining room with its hand-drawn Billingsgate market mural"
                fill
                priority
                quality={80}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white p-4 text-sea-900 shadow-lift sm:block">
              <p className="text-xs font-semibold tracking-wide text-sea-700 uppercase">Lunch deal</p>
              <p className="font-display text-2xl font-semibold">
                {lunchDeal.courses} courses, £{lunchDeal.price.toFixed(2)}
              </p>
              <p className="text-xs text-pebble-600">Tue to Thu until 2:30pm, Fri until 3pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Awards and ratings" className="border-b border-sea-900/5 bg-white">
        <div className="container-site grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label}>
              <p className="text-xs font-medium text-pebble-600">{point.label}</p>
              <p className="font-display mt-1 text-xl font-semibold text-sea-900">{point.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/hero-restaurant-entrance.jpg"
              alt="The pebble-clad entrance to the Sea Pebbles restaurant"
              fill
              quality={80}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -top-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft sm:-right-6">
            <Image src="/images/food-hygiene-rating.png" alt="Food Hygiene Rating 5" width={56} height={56} />
            <Image src="/images/tripadvisor-award.png" alt="Trusted on Tripadvisor" width={56} height={56} />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow">The plaice to eat</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Thirty-five years, one family, and a lot of cod</h2>
          <div className="prose-site mt-6">
            <p>
              We opened the doors on Uxbridge Road in 1990 and have been frying here ever since. The
              restaurant has been refurbished since then, so the room is brighter and the seats are
              more comfortable, but the way the fish is cooked has not changed much. It still comes
              in fresh, gets filleted in the kitchen, and goes into the fryer when you order it.
            </p>
            <p>
              Over the years the shop has picked up the Observer Fish and Chip Shop of the Year
              award, a regional final in the national competition, and a recommendation from the
              Evening Standard&rsquo;s ES Magazine. We are proud of those, but the thing we hear most
              often from customers is simpler: it tastes the way it did when they came here as kids.
            </p>
          </div>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-sea-700 hover:text-sea-900">
            More about Sea Pebbles <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Menus */}
      <section aria-labelledby="menus-heading" className="bg-sand-100 py-20 lg:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Our menus</p>
            <h2 id="menus-heading" className="mt-3 text-3xl sm:text-4xl">
              Fish first, but plenty for everyone else
            </h2>
            <p className="mt-4 text-pebble-600">
              Every main course comes with chips, new potatoes, rice or salad, and homemade tartare
              sauce. There is a proper vegetarian section, a kids menu, and a bar with wine and a
              Cypriot lager.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link href="/menu/lunch-deal" className="card group flex flex-col p-7 transition-shadow hover:shadow-lift">
              <p className="text-xs font-semibold tracking-wide text-batter-600 uppercase">Best value</p>
              <h3 className="mt-2 text-2xl">Lunch deal</h3>
              <p className="mt-3 flex-1 text-sm text-pebble-600">
                Two courses for £{lunchDeal.price.toFixed(2)}. Cod, haddock or plaice fried or grilled,
                with a starter or a dessert. Tuesday to Friday lunchtimes, not bank holidays.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 group-hover:text-sea-900">
                View lunch deal <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/menu" className="card group flex flex-col p-7 transition-shadow hover:shadow-lift">
              <p className="text-xs font-semibold tracking-wide text-sea-600 uppercase">Restaurant & takeaway</p>
              <h3 className="mt-2 text-2xl">Main menu</h3>
              <p className="mt-3 flex-1 text-sm text-pebble-600">
                Starters, fish mains from £20.95, salads, pies, burgers, a vegetarian section, kids
                meals and sides. Battered, matzo meal or grilled.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 group-hover:text-sea-900">
                View main menu <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/menu/desserts" className="card group flex flex-col p-7 transition-shadow hover:shadow-lift">
              <p className="text-xs font-semibold tracking-wide text-sea-600 uppercase">Always room</p>
              <h3 className="mt-2 text-2xl">Desserts & hot drinks</h3>
              <p className="mt-3 flex-1 text-sm text-pebble-600">
                Pineapple and banana fritters, bread and butter pudding, crème caramel, cheesecake.
                All £6.50. Coffee from the machine, tea from the pot.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 group-hover:text-sea-900">
                View desserts <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <p className="mt-8 text-sm text-pebble-600">
            Seasonal menus appear on the <Link href="/menu" className="font-semibold text-sea-700 underline underline-offset-2">menu page</Link> when they run.
            For allergens and dietary questions, please ask a member of the team before you order.
          </p>
        </div>
      </section>

      {/* Ways to eat */}
      <section aria-labelledby="ways-heading" className="container-site py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Dine in, collect or deliver</p>
          <h2 id="ways-heading" className="mt-3 text-3xl sm:text-4xl">
            However you want it
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-xl">Eat in the restaurant</h3>
            <p className="mt-3 text-sm text-pebble-600">
              Table service, a licensed bar and high chairs for the little ones. Booking is a good idea
              on Friday and Saturday evenings.
            </p>
            <Link href="/reserve" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 hover:text-sea-900">
              Reserve a table <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">Collect from the counter</h3>
            <p className="mt-3 text-sm text-pebble-600">
              Order ahead through our own ordering site or the Sea Pebbles app and pick it up hot. No
              third-party fees.
            </p>
            <a
              href={business.ordering.direct}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sea-700 hover:text-sea-900"
            >
              Order for collection <ExternalIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="card p-7">
            <h3 className="text-xl">Get it delivered</h3>
            <p className="mt-3 text-sm text-pebble-600">
              We are on Uber Eats and Deliveroo across Hatch End, Pinner, Harrow and the surrounding
              postcodes.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
              <a href={business.ordering.uberEats} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sea-700 hover:text-sea-900">
                Uber Eats <ExternalIcon className="h-4 w-4" />
              </a>
              <a href={business.ordering.deliveroo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sea-700 hover:text-sea-900">
                Deliveroo <ExternalIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Hours and location */}
      <section aria-labelledby="visit-heading" className="container-site py-20 lg:py-24">
        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-sea-900/5 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Opening hours</p>
            <h2 id="visit-heading" className="mt-3 text-3xl">
              When we&rsquo;re frying
            </h2>
            <div className="mt-6 max-w-sm">
              <OpeningHours />
            </div>
            <p className="mt-6 text-sm text-pebble-600">
              Lunch deal runs Tuesday to Thursday until 2:30pm and Friday until 3pm. Hours can change
              on bank holidays; we post updates on Instagram and Google.
            </p>
          </div>
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="mt-3 text-3xl">On the main road through Hatch End</h2>
            <address className="mt-6 space-y-1 not-italic text-pebble-800">
              <p className="font-semibold text-sea-900">{business.name}</p>
              <p>{business.address.street}</p>
              <p>
                {business.address.locality}, {business.address.town}
              </p>
              <p>
                {business.address.region}, {business.address.postcode}
              </p>
            </address>
            <p className="mt-4 text-sm text-pebble-600">
              A few minutes on foot from Hatch End station (London Overground), with parking on and
              around Uxbridge Road and several bus routes stopping outside.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={business.googleMapsUrl} target="_blank" rel="noopener" className="btn-secondary">
                <PinIcon className="h-4 w-4" /> Directions
              </a>
              <a href={`tel:${business.phoneIntl}`} className="btn-secondary">
                <PhoneIcon className="h-4 w-4" /> {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
