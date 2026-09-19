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
      <dl className={`space-y-4 ${className}`}>
        {openingHoursSummary.map((row) => (
          <div key={row.days}>
            <dt className="text-sm font-semibold text-white">{row.days}</dt>
            <dd className="mt-0.5 text-sm text-white/75">
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

  // Phones: day above its times. From `sm` up: day left, times right-aligned.
  return (
    <dl
      className={`grid grid-cols-1 gap-y-3.5 sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:gap-y-3 ${className}`}
    >
      {openingHoursSummary.map((row) => (
        <div key={row.days} className="sm:contents">
          <dt className="font-semibold text-sea-900 sm:whitespace-nowrap">{row.days}</dt>
          <dd className="mt-0.5 tabular-nums sm:mt-0 sm:text-right">
            {row.times.map((t, i) => (
              <span key={t} className="whitespace-nowrap sm:block">
                {i > 0 && (
                  <span className="mx-1.5 text-pebble-400 sm:hidden" aria-hidden>
                    ·
                  </span>
                )}
                {t}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
