import { faqs } from "@/lib/faq";
import { formatPrice, menus } from "@/lib/menu";
import { SITE_URL, business, formatAddress, lunchDeal, openingHoursSummary } from "@/lib/site";

/**
 * Plain-text summaries for AI assistants, following the llms.txt convention
 * (https://llmstxt.org). Generated from the same data the pages use, so it
 * never drifts from what visitors see.
 */

const hoursBlock = openingHoursSummary
  .map((row) => `- ${row.days}: ${row.times.join(", ")}`)
  .join("\n");

export function llmsIndex() {
  return `# ${business.name}

> ${business.description}

${business.name} is a family-run fish and chip restaurant and takeaway at ${formatAddress()}, United Kingdom. Established ${business.foundingYear}. Phone ${business.phone}. Email ${business.email}.

## Opening hours (Europe/London)

${hoursBlock}

Bank holiday hours may differ.

## Key facts

- Cuisine: ${business.cuisines.join(", ")}
- Price range: ${business.priceRange}. Fish main courses from £20.95; two-course lunch deal £${lunchDeal.price.toFixed(2)}
- Fish can be fried in batter, fried in egg and matzo meal, or grilled
- Vegetarian section, kids menu (juice and ice cream included), licensed bar
- Dine in, takeaway collection, delivery via Uber Eats and Deliveroo, direct online ordering and iPhone app
- Reservations: ${SITE_URL}/reserve or ${business.phone}
- Food Hygiene Rating 5

## Pages

- [Home](${SITE_URL}/): overview, hours, location
- [Menu and prices](${SITE_URL}/menu): full restaurant and takeaway menu
- [Lunch deal](${SITE_URL}/menu/lunch-deal): two courses for £${lunchDeal.price.toFixed(2)}, Tue to Fri lunchtimes
- [Desserts and hot drinks](${SITE_URL}/menu/desserts)
- [Drinks](${SITE_URL}/menu/drinks): wine, beer, spirits, soft drinks
- [Order online](${SITE_URL}/order): collection and delivery options
- [Book a table](${SITE_URL}/reserve)
- [About](${SITE_URL}/about): history and awards
- [FAQs](${SITE_URL}/faqs)
- [Contact and directions](${SITE_URL}/contact)
- [Gallery](${SITE_URL}/gallery)

## Optional

- [Full text version](${SITE_URL}/llms-full.txt): complete menu with prices and all FAQ answers
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Main menu PDF](${SITE_URL}${business.menusPdf.main})
- [Lunch deal and desserts PDF](${SITE_URL}${business.menusPdf.lunchAndDesserts})
`;
}

export function llmsFull() {
  const menuText = menus
    .map((menu) => {
      const sections = menu.sections
        .map((section) => {
          const items = section.items
            .map((item) => {
              let price = "";
              if (typeof item.price === "number") price = ` — ${formatPrice(item.price)}`;
              else if (item.prices) price = ` — ${item.prices.map((p) => `${p.label} ${formatPrice(p.price)}`).join(", ")}`;
              const tags = item.dietary?.includes("vegetarian") ? " (V)" : "";
              const desc = item.description ? `: ${item.description}` : "";
              return `- ${item.name}${tags}${price}${desc}`;
            })
            .join("\n");
          return `### ${section.title}\n${section.note ? `${section.note}\n` : ""}${items}`;
        })
        .join("\n\n");
      const notes = menu.footnotes ? `\n\n${menu.footnotes.map((n) => `_${n}_`).join("\n")}` : "";
      return `## ${menu.heading}\n\n${menu.intro}\n\n${sections}${notes}`;
    })
    .join("\n\n");

  const faqText = faqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n");

  return `${llmsIndex()}
---

# Full menu (prices in GBP, include VAT; July 2026 edition)

${menuText}

## Allergen information

Battered products and chips contain fish and gluten (wheat). Grilled fish contains fish and gluten (wheat) unless asked not to coat in flour. Matzo meal products contain fish, gluten (wheat) and egg. Mayonnaise and tartare sauce contain egg. All desserts contain milk; cheesecakes contain gluten (wheat) and milk. Customers should tell staff about allergies before ordering.

---

# Frequently asked questions

${faqText}

---

# Awards

${business.awards.map((a) => `- ${a}`).join("\n")}

# Links

- Website: ${SITE_URL}
- Google Maps: ${business.googleMapsUrl}
- Instagram: ${business.social.instagram}
- Facebook: ${business.social.facebook}
- Tripadvisor: ${business.tripadvisorUrl}
- Order direct: ${business.ordering.direct}
- Uber Eats: ${business.ordering.uberEats}
- Deliveroo: ${business.ordering.deliveroo}
- iPhone app: ${business.ordering.iosApp}
`;
}
