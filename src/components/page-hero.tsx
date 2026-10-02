import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  compact = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  /**
   * For pages whose main content is a form: tighter on phones and the intro
   * is hidden there, so the form itself is on screen without scrolling.
   * The following section is expected to pull up over the wave with -mt.
   */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`wave-divider bg-sea-900 text-white ${
        compact ? "pt-6 pb-24 sm:pt-10 sm:pb-28" : "pt-8 pb-20 sm:pt-10 sm:pb-24"
      }`}
    >
      <div className="container-site">
        <Breadcrumbs items={crumbs} light />
        <div className={`max-w-3xl ${compact ? "mt-4 sm:mt-6" : "mt-6"}`}>
          {eyebrow && <p className="eyebrow !text-sea-300">{eyebrow}</p>}
          <h1 className={`mt-2 !text-white ${compact ? "text-3xl sm:text-5xl" : "text-4xl sm:text-5xl"}`}>
            {title}
          </h1>
          {intro && (
            <p
              className={`mt-4 text-lg leading-relaxed text-white/80 ${compact ? "hidden sm:block" : ""}`}
            >
              {intro}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
