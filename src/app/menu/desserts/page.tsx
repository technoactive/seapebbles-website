import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";
import { dessertsMenu } from "@/lib/menu";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/site";

const description =
  "Desserts and hot drinks at Sea Pebbles, Hatch End: homemade pineapple and banana fritters, bread and butter pudding, crème caramel, cheesecake and more, all £6.50. Coffee and tea.";

export const metadata: Metadata = pageMetadata({
  title: "Desserts & Hot Drinks Menu",
  description,
  path: "/menu/desserts",
});

export default function DessertsPage() {
  return (
    <MenuPage
      menu={dessertsMenu}
      path="/menu/desserts"
      description={description}
      pdf={business.menusPdf.lunchAndDesserts}
    />
  );
}
