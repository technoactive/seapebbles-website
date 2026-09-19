import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";
import { mainMenu, menus } from "@/lib/menu";
import { menuSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Sea Pebbles full menu with prices: cod, haddock, plaice, skate and sea bass fried or grilled, starters, salads, vegetarian mains, kids meals and sides. Hatch End, Pinner.";

export const metadata: Metadata = pageMetadata({
  title: "Menu & Prices, Fish and Chips Restaurant Hatch End",
  description,
  path: "/menu",
});

export default function MainMenuPage() {
  return (
    <MenuPage
      menu={mainMenu}
      path="/menu"
      description={description}
      pdf={business.menusPdf.main}
      extraSchema={[menuSchema(menus)]}
    />
  );
}
