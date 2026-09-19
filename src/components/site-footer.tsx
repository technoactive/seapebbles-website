import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { OpeningHours } from "@/components/opening-hours";
import { business, formatAddress, navigation } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-sea-900 text-white/85">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
        <div className="space-y-5">
          <Image
            src="/images/logo-white.png"
            alt="Sea Pebbles, The Plaice to Eat, established 1990"
            width={160}
            height={121}
            className="h-20 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed">
            A family fish restaurant and takeaway on Uxbridge Road, Hatch End. Frying since 1990, still
            run by the same family.
          </p>
          <div className="flex gap-3">
            <a
              href={business.social.instagram}
              rel="noopener"
              target="_blank"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Sea Pebbles on Instagram</span>
            </a>
            <a
              href={business.social.facebook}
              rel="noopener"
              target="_blank"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Sea Pebbles on Facebook</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display mb-4 text-lg text-white">Opening hours</h2>
          <OpeningHours variant="stacked" />
          <p className="mt-5 text-xs leading-relaxed text-white/60">
            Bank holiday hours may differ. Check Google Maps or call before you travel.
          </p>
        </div>

        <div>
          <h2 className="font-display mb-4 text-lg text-white">Find us</h2>
          <address className="space-y-1 text-sm not-italic">
            <p className="flex gap-3">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.town}
                <br />
                {business.address.region}, {business.address.postcode}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 shrink-0" />
              <a href={`tel:${business.phoneIntl}`} className="inline-flex min-h-10 items-center hover:text-white">
                {business.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 shrink-0" />
              <a href={`mailto:${business.email}`} className="inline-flex min-h-10 items-center hover:text-white">
                {business.email}
              </a>
            </p>
          </address>
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-sea-300 hover:text-white"
          >
            Directions on Google Maps
          </a>
        </div>

        <div>
          <h2 className="font-display mb-4 text-lg text-white">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-4 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reserve" className="inline-flex min-h-10 items-center hover:text-white">
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/menu/lunch-deal" className="inline-flex min-h-10 items-center hover:text-white">
                Lunch Deal
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="inline-flex min-h-10 items-center hover:text-white">
                Privacy
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Review us on Google
            </a>
            <a
              href={business.tripadvisorUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20"
            >
              Tripadvisor
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {business.name}, {formatAddress()}. All rights reserved.
          </p>
          <p>Food Hygiene Rating 5. Prices include VAT.</p>
        </div>
      </div>
    </footer>
  );
}
