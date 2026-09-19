import Link from "next/link";
import { LeafIcon } from "@/components/icons";
import { formatPrice, type MenuDocument, type MenuItem, type MenuSection } from "@/lib/menu";

function Price({ item }: { item: MenuItem }) {
  if (typeof item.price === "number") {
    return <span className="tabular-nums font-semibold text-sea-900">{formatPrice(item.price)}</span>;
  }
  if (item.prices) {
    return (
      <span className="flex flex-wrap justify-end gap-x-3 gap-y-0.5 text-sm tabular-nums">
        {item.prices.map((p) => (
          <span key={p.label} className="whitespace-nowrap">
            <span className="text-pebble-600">{p.label}</span>{" "}
            <span className="font-semibold text-sea-900">{formatPrice(p.price)}</span>
          </span>
        ))}
      </span>
    );
  }
  return null;
}

export function MenuSectionView({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
      <div className="flex items-baseline justify-between gap-4 border-b border-sea-900/10 pb-3">
        <h2 id={`${section.id}-heading`} className="text-2xl">
          {section.title}
        </h2>
      </div>
      {section.note && <p className="mt-3 text-sm text-pebble-600">{section.note}</p>}
      <ul className="mt-4 divide-y divide-sea-900/5">
        {section.items.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-6 py-3">
            <div className="min-w-0">
              <h3 className="font-sans text-base font-semibold text-pebble-800">
                {item.name}
                {item.dietary?.includes("vegetarian") && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 align-middle">
                    <LeafIcon className="h-3 w-3" />V
                  </span>
                )}
                {item.popular && (
                  <span className="ml-2 inline-flex rounded-full bg-batter-400/20 px-2 py-0.5 text-[11px] font-semibold text-batter-600 align-middle">
                    Popular
                  </span>
                )}
              </h3>
              {item.description && (
                <p className="mt-0.5 text-sm text-pebble-600">{item.description}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <Price item={item} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MenuDocumentView({ menu }: { menu: MenuDocument }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <nav aria-label={`${menu.title} sections`} className="sticky top-28">
          <p className="eyebrow mb-3">On this menu</p>
          <ul className="space-y-1.5 text-sm">
            {menu.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-pebble-600 hover:text-sea-900">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="space-y-12">
        {menu.sections.map((section) => (
          <MenuSectionView key={section.id} section={section} />
        ))}
        {menu.footnotes && (
          <ul className="space-y-1 text-xs text-pebble-600">
            {menu.footnotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const menuTabs = [
  { slug: "main", href: "/menu", label: "Main menu" },
  { slug: "lunch-deal", href: "/menu/lunch-deal", label: "Lunch deal" },
  { slug: "desserts", href: "/menu/desserts", label: "Desserts & hot drinks" },
  { slug: "drinks", href: "/menu/drinks", label: "Drinks" },
] as const;

export function MenuTabs({ active }: { active: MenuDocument["slug"] }) {
  return (
    <nav aria-label="Menus" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex gap-2">
        {menuTabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <li key={tab.slug} className="shrink-0">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-sea-900 text-white"
                    : "bg-white text-sea-900 ring-1 ring-sea-900/10 hover:bg-sand-100"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
