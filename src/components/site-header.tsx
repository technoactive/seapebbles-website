import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sea-900/5 bg-sand-50/90 backdrop-blur supports-[backdrop-filter]:bg-sand-50/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-sea-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={`${business.name} home`}>
          <Image
            src="/images/logo.png"
            alt=""
            width={48}
            height={54}
            priority
            className="h-11 w-auto sm:h-12"
          />
          <span className="hidden flex-col leading-tight whitespace-nowrap sm:flex">
            <span className="font-display text-xl font-semibold text-sea-900">Sea Pebbles</span>
            <span className="text-[11px] font-medium tracking-[0.14em] text-sea-700 uppercase">
              Hatch End · Est. 1990
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phoneIntl}`}
            className="btn-ghost hidden items-center gap-2 px-3 whitespace-nowrap md:inline-flex lg:hidden xl:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="tabular-nums">{business.phone}</span>
          </a>
          <Link href="/reserve" className="btn-primary hidden sm:inline-flex">
            Book a table
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
