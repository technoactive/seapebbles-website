import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";
import { lunchDealMenu } from "@/lib/menu";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, business, lunchDeal } from "@/lib/site";

const description = `Two-course lunch for £${lunchDeal.price.toFixed(2)} at Sea Pebbles, Hatch End. Cod, haddock or plaice fried or grilled, with a starter or dessert. Tuesday to Thursday until 2:30pm, Friday until 3pm.`;

export const metadata: Metadata = pageMetadata({
  title: `Lunch Deal: 2 Courses for £${lunchDeal.price.toFixed(2)} in Hatch End`,
  description,
  path: "/menu/lunch-deal",
});

export default function LunchDealPage() {
  return (
    <MenuPage
      menu={lunchDealMenu}
      path="/menu/lunch-deal"
      description={description}
      pdf={business.menusPdf.lunchAndDesserts}
      extraSchema={[
        {
          "@type": "Offer",
          "@id": `${SITE_URL}/menu/lunch-deal#offer`,
          name: "Two-course lunch deal",
          description: lunchDeal.availability,
          price: lunchDeal.price.toFixed(2),
          priceCurrency: "GBP",
          url: `${SITE_URL}/menu/lunch-deal`,
          availability: "https://schema.org/InStock",
          offeredBy: { "@id": `${SITE_URL}/#restaurant` },
          eligibleRegion: { "@type": "Place", name: "Sea Pebbles, Hatch End" },
        },
      ]}
    />
  );
}
