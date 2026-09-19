import { StarIcon } from "@/components/icons";
import { business } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-heading" className="container-site">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">What people say</p>
          <h2 id="reviews-heading" className="mt-2 text-3xl sm:text-4xl">
            Regulars, first-timers and the odd chef&rsquo;s fan club
          </h2>
        </div>
        <div className="flex gap-3 text-sm">
          <a
            href={business.googleReviewUrl}
            target="_blank"
            rel="noopener"
            className="btn-secondary"
          >
            Leave a Google review
          </a>
        </div>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.author + t.date} className="card flex flex-col p-6">
            <div className="flex gap-0.5 text-batter-500" aria-label="Five star review">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-pebble-800">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className="mt-4 text-xs text-pebble-600">
              <span className="font-semibold text-sea-900">{t.author}</span> · {t.source} review,{" "}
              <time dateTime={t.date}>
                {new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
                  new Date(`${t.date}T12:00:00Z`),
                )}
              </time>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
