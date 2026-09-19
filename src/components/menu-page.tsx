import Link from "next/link";
import type { Route } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { MenuDocumentView, MenuTabs } from "@/components/menu-view";
import { PageHero } from "@/components/page-hero";
import { allergenNotice, type MenuDocument } from "@/lib/menu";
import { graph, webPageSchema } from "@/lib/schema";
import { business } from "@/lib/site";

export function MenuPage({
  menu,
  path,
  description,
  pdf,
  extraSchema,
}: {
  menu: MenuDocument;
  path: Route;
  description: string;
  pdf: string;
  extraSchema?: Record<string, unknown>[];
}) {
  const crumbs =
    menu.slug === "main"
      ? [{ name: "Menu", path: "/menu" as Route }]
      : [
          { name: "Menu", path: "/menu" as Route },
          { name: menu.title, path },
        ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: `${menu.title} | ${business.name}`, description }),
          ...(extraSchema ?? []),
        )}
      />
      <PageHero
        eyebrow={menu.title}
        title={menu.heading}
        intro={menu.intro}
        crumbs={crumbs}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/reserve" className="btn-light">
            Book a table
          </Link>
          <a href={pdf} className="btn-outline-light" download>
            Download PDF menu
          </a>
        </div>
      </PageHero>

      <div className="container-site -mt-6 mb-10">
        <MenuTabs active={menu.slug} />
      </div>

      <div className="container-site pb-16">
        <MenuDocumentView menu={menu} />

        <aside className="mt-14 rounded-2xl border border-batter-400/40 bg-batter-400/10 p-6 text-sm text-pebble-800">
          <h2 className="font-sans text-base font-semibold text-sea-900">Allergen information</h2>
          <p className="mt-2 leading-relaxed">{allergenNotice}</p>
        </aside>
      </div>

      <CtaBand />
    </>
  );
}
