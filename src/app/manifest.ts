import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} Hatch End`,
    short_name: business.name,
    description: business.description,
    start_url: "/",
    display: "minimal-ui",
    background_color: "#fcfaf5",
    theme_color: "#0b2540",
    lang: "en-GB",
    categories: ["food", "restaurant"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Menu", url: "/menu" },
      { name: "Book a table", url: "/reserve" },
      { name: "Order online", url: "/order" },
    ],
  };
}
