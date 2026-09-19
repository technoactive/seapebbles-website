import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Bumped when content changes so crawlers see an honest lastmod.
const CONTENT_UPDATED = new Date("2026-09-19T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
    { path: "/menu/lunch-deal", priority: 0.9, changeFrequency: "monthly" },
    { path: "/menu/desserts", priority: 0.7, changeFrequency: "monthly" },
    { path: "/menu/drinks", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reserve", priority: 0.9, changeFrequency: "yearly" },
    { path: "/order", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
    { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
