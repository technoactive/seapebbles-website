import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/lib/site";

export function CtaBand({
  title = "Hungry? We'll see you soon.",
  text = "Book a table for dinner, or order online for collection or delivery.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-site">
      <div className="relative overflow-hidden rounded-3xl bg-sea-700 px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sea-500/40 blur-3xl"
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl !text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-lg text-white/85">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/reserve" className="btn-light">
              Book a table
            </Link>
            <Link href="/order" className="btn-outline-light">
              Order online
            </Link>
            <a href={`tel:${business.phoneIntl}`} className="btn-outline-light">
              <PhoneIcon className="h-4 w-4" /> {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
