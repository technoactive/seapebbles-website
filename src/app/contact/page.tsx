import type { Metadata } from "next";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { OpeningHours } from "@/components/opening-hours";
import { PageHero } from "@/components/page-hero";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Contact Sea Pebbles fish restaurant in Hatch End: 348-352 Uxbridge Road, HA5 4HR. Phone 020 8428 0203, email info@seapebbles.co.uk. Map, directions and opening hours.";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Find Us: Uxbridge Road, Hatch End HA5 4HR",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/contact",
            name: "Contact Sea Pebbles",
            description,
            type: "ContactPage",
          }),
        )}
      />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Phone is quickest during opening hours. For anything that can wait, email works well and we reply within a day or so."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <div className="card p-7">
            <h2 className="text-2xl">Sea Pebbles</h2>
            <address className="mt-5 space-y-4 not-italic">
              <p className="flex gap-3">
                <PinIcon className="mt-1 h-5 w-5 shrink-0 text-sea-600" />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.locality}, {business.address.town}
                  <br />
                  {business.address.region}, {business.address.postcode}
                </span>
              </p>
              <p className="flex gap-3">
                <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-sea-600" />
                <a href={`tel:${business.phoneIntl}`} className="font-semibold text-sea-900 hover:underline">
                  {business.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <MailIcon className="mt-1 h-5 w-5 shrink-0 text-sea-600" />
                <a href={`mailto:${business.email}`} className="font-semibold text-sea-900 hover:underline">
                  {business.email}
                </a>
              </p>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={business.googleMapsUrl} target="_blank" rel="noopener" className="btn-primary">
                Directions
              </a>
              <Link href="/reserve" className="btn-secondary">
                Book a table
              </Link>
            </div>
          </div>

          <div className="card p-7">
            <h2 className="text-xl">Opening hours</h2>
            <div className="mt-4">
              <OpeningHours />
            </div>
          </div>

          <div className="card p-7">
            <h2 className="text-xl">Follow along</h2>
            <p className="mt-2 text-sm text-pebble-600">
              Seasonal menus, bank holiday hours and the occasional photo of a very large plaice.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener"
                className="btn-secondary"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener"
                className="btn-secondary"
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-sea-900/5">
            <iframe
              title="Map showing Sea Pebbles on Uxbridge Road, Hatch End"
              src={business.googleMapsEmbedUrl}
              width="600"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[420px] w-full border-0 sm:h-[520px]"
            />
          </div>
          <div className="prose-site text-sm">
            <h2 className="!mt-0 !text-xl">Getting here</h2>
            <p>
              We are on Uxbridge Road, the main road through Hatch End. Hatch End station (London
              Overground, Watford DC line) is a few minutes&rsquo; walk. Several bus routes stop on
              Uxbridge Road, and there is local parking nearby.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
