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

  return (
    <dl className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 ${className}`}>
      {openingHoursSummary.map((row) => (
        <div key={row.days} className="contents">
          <dt className="font-semibold text-sea-900">{row.days}</dt>
          <dd className="text-right tabular-nums">
            {row.times.map((t) => (
              <div key={t} className="whitespace-nowrap">
                {t}
              </div>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
