import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";
import { drinksMenu } from "@/lib/menu";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Drinks list at Sea Pebbles, Hatch End: house wines, Sauvignon Blanc, Pinot Grigio, Chablis, Prosecco, Keo and Stella lager, Magners cider, spirits and soft drinks. Fully licensed.";

export const metadata: Metadata = pageMetadata({
  title: "Drinks Menu: Wine, Beer, Spirits & Soft Drinks",
  description,
  path: "/menu/drinks",
});

export default function DrinksPage() {
  return (
    <MenuPage
      menu={drinksMenu}
      path="/menu/drinks"
      description={description}
      pdf={business.menusPdf.main}
    />
  );
}
