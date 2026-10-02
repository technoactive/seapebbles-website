import Link from "next/link";
import type { ReactNode } from "react";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/lib/site";

/**
 * Confirmation screen shown after a form has been submitted and delivered.
 * Kept deliberately calm: one tick, a clear heading, what happens next.
 */
export function ThankYou({
  eyebrow,
  title,
  lead,
  reference,
  details,
  nextSteps,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  reference?: string;
  details?: { label: string; value: string }[];
  nextSteps: string[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-sea-900 pt-10 pb-20 text-white sm:pt-14 sm:pb-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl">
          <div className="card p-8 text-pebble-800 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon className="h-6 w-6" />
              </div>
              {reference && (
                <p className="rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold tracking-wide text-sea-900 tabular-nums">
                  Ref {reference}
                </p>
              )}
            </div>
            <p className="eyebrow mt-6">{eyebrow}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl">{title}</h1>
            <p className="mt-4 text-lg leading-relaxed">{lead}</p>

            {details && details.length > 0 && (
              <dl className="mt-6 divide-y divide-sea-900/8 rounded-2xl bg-sand-50 px-5 ring-1 ring-sea-900/5">
                {details.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-sm font-medium text-pebble-600">{d.label}</dt>
                    <dd className="text-right font-semibold text-sea-900 tabular-nums">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <h2 className="mt-8 text-xl">What happens next</h2>
            <ol className="mt-3 space-y-2.5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sea-50 text-xs font-semibold text-sea-700">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {children}

            <div className="mt-8 flex flex-wrap gap-3 border-t border-sea-900/8 pt-6">
              <Link href="/menu" className="btn-primary">
                Browse the menu
              </Link>
              <Link href="/" className="btn-secondary">
                Back to home
              </Link>
              <a href={`tel:${business.phoneIntl}`} className="btn-ghost">
                <PhoneIcon className="h-4 w-4" /> {business.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
