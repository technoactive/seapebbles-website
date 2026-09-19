import { openingHoursSummary } from "@/lib/site";

type Variant = "stacked" | "table";

/**
 * Opening hours in two layouts:
 * - "stacked": day on one line, times underneath. Fits narrow columns (footer).
 * - "table": day left, times right, aligned in a two-column grid. For cards.
 * Times never wrap mid-range.
 */
export function OpeningHours({
  variant = "table",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "stacked") {
    return (
      <dl className={`divide-y divide-white/10 ${className}`}>
        {openingHoursSummary.map((row) => (
          <div key={row.days} className="py-2.5 first:pt-0 last:pb-0">
            <dt className="text-sm text-white/70">{row.days}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-white">
              {row.times.map((t, i) => (
                <span key={t} className="whitespace-nowrap tabular-nums">
                  {i > 0 && <span className="mx-1.5 text-white/40" aria-hidden>·</span>}
                  {t}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  // Hairline-divided rows. Day label is quiet, times are the strong element.
  // Phones: day above its times (periods joined with a dot). From `sm` up:
  // day left, one period per line right-aligned.
  return (
    <dl className={`divide-y divide-sea-900/8 ${className}`}>
      {openingHoursSummary.map((row) => {
        const closed = row.times.length === 1 && row.times[0] === "Closed";
        return (
          <div
            key={row.days}
            className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="text-sm leading-6 font-medium text-pebble-600 sm:whitespace-nowrap">
              {row.days}
            </dt>
            <dd
              className={`text-sm leading-6 tabular-nums sm:text-right ${
                closed ? "font-medium text-pebble-400" : "font-semibold text-sea-900"
              }`}
            >
              {row.times.map((t, i) => (
                <span key={t} className="whitespace-nowrap sm:block">
                  {i > 0 && (
                    <span className="mx-1.5 font-normal text-pebble-400 sm:hidden" aria-hidden>
                      ·
                    </span>
                  )}
                  {t}
                </span>
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
