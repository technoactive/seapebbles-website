import type { Metadata } from "next";
import { SITE_URL, business } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Override the OG image; defaults to the generated /opengraph-image */
  image?: string;
  noIndex?: boolean;
};

/**
 * Builds consistent per-page metadata: canonical URL, Open Graph, Twitter card.
 * Titles are kept under ~60 characters and descriptions under ~155.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: business.name,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
