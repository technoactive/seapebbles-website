import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="wave-divider bg-sea-900 pt-8 pb-20 text-white sm:pt-10 sm:pb-24">
      <div className="container-site">
        <Breadcrumbs items={crumbs} light />
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow !text-sea-300">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl !text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 text-lg leading-relaxed text-white/80">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
