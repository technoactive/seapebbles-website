import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "The story of Sea Pebbles: a family fish restaurant on Uxbridge Road, Hatch End, frying since 1990. Awards, the way we cook, and the people behind the counter.";

export const metadata: Metadata = pageMetadata({
  title: "About Sea Pebbles, Family Fish Restaurant in Hatch End Since 1990",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/about",
            name: "About Sea Pebbles",
            description,
            type: "AboutPage",
          }),
        )}
      />
      <PageHero
        eyebrow="About us"
        title="A family fish restaurant, since 1990"
        intro="Sea Pebbles has been on the same stretch of Uxbridge Road for more than thirty-five years. This is who we are and how we do things."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <article className="container-site grid gap-14 py-16 lg:grid-cols-[1fr_360px] lg:py-20">
        <div className="prose-site max-w-3xl">
          <h2 className="!mt-0">How it started</h2>
          <p>
            Sea Pebbles opened its doors in 1990 and has served Hatch End and the surrounding area from
            348 to 352 Uxbridge Road ever since. What began as a fish and chip shop has grown into a
            proper restaurant with a busy takeaway counter, and it has stayed a family business
            throughout.
          </p>
          <p>
            Regulars tend to know the team by name. If a review on Google thanks Florin for cooking the
            fish exactly the way someone likes it, that is not a marketing line; that is just a Tuesday.
          </p>

          <h2>What we cook</h2>
          <p>
            Fish is the point. Cod, haddock, plaice, rock, skate, sea bass and Scottish salmon come in
            fresh and are prepared in the kitchen. You choose how you want it: fried in traditional
            batter, fried in egg and matzo meal in the old London style, or grilled with a little
            flour, or none if you ask. Grilled takes a few minutes longer and is worth the wait.
          </p>
          <p>
            Chips are cut daily. Tartare sauce is made here. The minestrone soup and the fish cakes are
            homemade, and so are the pineapple and banana fritters that have been on the dessert menu
            for as long as anyone can remember. There is a full vegetarian section, a kids menu with
            juice and ice cream included, and a bar with house wines picked to go with fish, plus Keo
            lager, which gives away the family&rsquo;s Cypriot roots.
          </p>
          <p>
            The full menu is on the site, so you can read it rather than squint at a PDF. Have a look
            at the <Link href="/menu">main menu</Link>, the <Link href="/menu/lunch-deal">lunch deal</Link>,
            the <Link href="/menu/desserts">desserts</Link> or the <Link href="/menu/drinks">drinks list</Link>.
          </p>

          <h2>The room</h2>
          <p>
            The restaurant was recently refurbished. The frontage is clad in pebbles, the dining room
            has a skylight that keeps lunch service bright even in January, and one wall carries a
            hand-drawn mural of Billingsgate market, where London&rsquo;s fish trade has run for
            centuries. In the evening the ceiling lights turn blue. It is comfortable rather than
            fancy, and it suits everything from a quick lunch to a family birthday. There is outside
            seating too when the weather allows.
          </p>

          <h2>Awards and recognition</h2>
          <p>
            We do not build the business around trophies, but a few have arrived over the years and we
            are pleased to have them:
          </p>
          <ul>
            {business.awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>

          <h2>Allergies and dietary needs</h2>
          <p>
            Our battered products and chips contain fish and gluten. Matzo meal contains egg. The
            mayonnaise and tartare sauce contain egg, and every dessert contains milk. If you have an
            allergy or intolerance, please tell a member of the team before you order, whether you are
            eating in, collecting or ordering through an app, and we will tell you exactly what we can
            and cannot do.
          </p>

          <h2>Come and say hello</h2>
          <p>
            We are open Tuesday to Saturday. You can <Link href="/reserve">book a table</Link>,{" "}
            <Link href="/order">order for collection or delivery</Link>, or just walk in. The address is{" "}
            {business.address.street}, {business.address.locality}, {business.address.postcode}, and the
            phone number is <a href={`tel:${business.phoneIntl}`}>{business.phone}</a>.
          </p>
        </div>

        <aside className="space-y-6 lg:pt-2">
          <figure className="overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/gallery/team-member.jpg"
              alt="A member of the Sea Pebbles team in the restaurant polo shirt"
              width={1077}
              height={1600}
              sizes="(min-width: 1024px) 360px, 100vw"
              className="h-auto w-full"
            />
          </figure>
          <figure className="overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/gallery/chips-being-fried.jpg"
              alt="Fresh chips being lowered into the fryer"
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 360px, 100vw"
              className="h-auto w-full"
            />
          </figure>
          <div className="card p-6">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-pebble-600">Established</dt>
                <dd className="font-semibold text-sea-900">{business.foundingYear}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-pebble-600">Cuisine</dt>
                <dd className="text-right font-semibold text-sea-900">Fish & chips, seafood</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-pebble-600">Hygiene rating</dt>
                <dd className="font-semibold text-sea-900">5 (Very good)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-pebble-600">Licensed</dt>
                <dd className="font-semibold text-sea-900">Yes, full bar</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-pebble-600">Children</dt>
                <dd className="font-semibold text-sea-900">Welcome, high chairs</dd>
              </div>
            </dl>
          </div>
        </aside>
      </article>

      <CtaBand />
    </>
  );
}
