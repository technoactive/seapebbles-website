import type { Metadata } from "next";
import Link from "next/link";
import { FishIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <FishIcon className="h-16 w-16 text-sea-300" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-3 text-4xl">That one got away</h1>
      <p className="mt-4 max-w-md text-pebble-600">
        The page you were after isn&rsquo;t here. It may have moved when we rebuilt the site. Try one
        of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/menu" className="btn-secondary">
          Menu
        </Link>
        <Link href="/reserve" className="btn-secondary">
          Book a table
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact
        </Link>
      </div>
    </section>
  );
}
