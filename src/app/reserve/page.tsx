import type { Metadata } from "next";
import { PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { OpeningHours } from "@/components/opening-hours";
import { PageHero } from "@/components/page-hero";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { ReservationForm } from "./reservation-form";

const description =
  "Book a table at Sea Pebbles fish restaurant in Hatch End. Request online in under a minute or call 020 8428 0203. Open Tuesday to Saturday for lunch and dinner.";

export const metadata: Metadata = pageMetadata({
  title: "Book a Table at Sea Pebbles, Hatch End",
  description,
  path: "/reserve",
});

export default function ReservePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/reserve",
            name: "Reserve a table at Sea Pebbles",
            description,
          }),
        )}
      />
      <PageHero
        eyebrow="Reservations"
        title="Book a table"
        intro="Fill in the form and we'll confirm by phone or email. If it's for tonight, ringing us is quicker."
        crumbs={[{ name: "Reservations", path: "/reserve" }]}
      >
        <a href={`tel:${business.phoneIntl}`} className="btn-light mt-6">
          <PhoneIcon className="h-4 w-4" /> Call {business.phone}
        </a>
      </PageHero>

      <section className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <ReservationForm />

        <aside className="space-y-6">
          <div className="card p-7">
            <h2 className="text-xl">Opening hours</h2>
            <div className="mt-4">
              <OpeningHours />
            </div>
          </div>
          <div className="card p-7 text-sm leading-relaxed text-pebble-800">
            <h2 className="text-xl">Good to know</h2>
            <ul className="mt-4 space-y-3">
              <li>Your table is confirmed once we&rsquo;ve replied, not when you press send.</li>
              <li>For groups larger than twelve, or for private events, please phone and we&rsquo;ll plan it properly.</li>
              <li>If you have an allergy or intolerance, mention it in the notes and again when you arrive.</li>
              <li>Plans changed? Call us as early as you can so we can offer the table to someone else.</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
