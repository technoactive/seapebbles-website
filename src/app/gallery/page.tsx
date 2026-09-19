import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { GalleryGrid } from "@/components/gallery-grid";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { galleryImages } from "@/lib/gallery";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const description =
  "Photos of Sea Pebbles in Hatch End: the dining room and Billingsgate mural, the takeaway counter, and the food, from battered cod and chips to homemade fritters.";

export const metadata: Metadata = pageMetadata({
  title: "Gallery: The Restaurant and the Food",
  description,
  path: "/gallery",
  image: `${SITE_URL}/images/gallery/fish-and-chips-with-sides.jpg`,
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/gallery",
              name: "Sea Pebbles gallery",
              description,
              type: "CollectionPage",
            }),
            mainEntity: {
              "@type": "ImageGallery",
              name: "Sea Pebbles photos",
              image: galleryImages.map((img) => ({
                "@type": "ImageObject",
                contentUrl: `${SITE_URL}${img.src}`,
                url: `${SITE_URL}${img.src}`,
                caption: img.alt,
                width: img.width,
                height: img.height,
              })),
            },
          },
        )}
      />
      <PageHero
        eyebrow="Gallery"
        title="Have a look around"
        intro="The room, the counter, and what comes out of the kitchen. Photographs taken in the restaurant between September 2025 and January 2026."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <section className="container-site">
        <GalleryGrid images={galleryImages} />
      </section>
      <div className="mt-20">
        <CtaBand />
      </div>
    </>
  );
}
