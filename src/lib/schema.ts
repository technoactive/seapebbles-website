import type { FaqItem } from "@/lib/faq";
import type { MenuDocument } from "@/lib/menu";
import { SITE_URL, business, lunchDeal, openingHours, type DayOfWeek } from "@/lib/site";

/**
 * schema.org JSON-LD builders. Ids are stable so pages can reference the same
 * entities (e.g. the Restaurant node) without duplicating them.
 */

export const ids = {
  restaurant: `${SITE_URL}/#restaurant`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  menu: `${SITE_URL}/menu#menu`,
};

type JsonLd = Record<string, unknown>;

export function openingHoursSpecification(): JsonLd[] {
  const days = Object.keys(openingHours) as DayOfWeek[];
  const specs: JsonLd[] = [];
  for (const day of days) {
    for (const period of openingHours[day]) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${day}`,
        opens: period.opens,
        closes: period.closes,
      });
    }
  }
  return specs;
}

export function restaurantSchema(): JsonLd {
  return {
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": ids.restaurant,
    name: business.name,
    alternateName: business.legalName,
    slogan: business.tagline,
    description: business.description,
    url: SITE_URL,
    telephone: business.phoneIntl,
    email: business.email,
    foundingDate: String(business.foundingYear),
    image: [`${SITE_URL}/images/hero-dining-room-mural.jpg`, `${SITE_URL}/images/hero-restaurant-entrance.jpg`],
    logo: { "@id": ids.logo },
    priceRange: business.priceRange,
    servesCuisine: business.cuisines,
    currenciesAccepted: "GBP",
    paymentAccepted: business.paymentAccepted.join(", "),
    acceptsReservations: `${SITE_URL}/reserve`,
    hasMenu: { "@id": ids.menu },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.googleMapsUrl,
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [
      business.social.facebook,
      business.social.instagram,
      business.tripadvisorUrl,
      business.ordering.uberEats,
      business.ordering.deliveroo,
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/reserve`,
          inLanguage: "en-GB",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        result: { "@type": "FoodEstablishmentReservation", name: "Table reservation" },
      },
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: business.ordering.direct,
          inLanguage: "en-GB",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        deliveryMethod: ["https://schema.org/OnSitePickup", "https://schema.org/ParcelService"],
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: "Delivery", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "High chairs", value: true },
      { "@type": "LocationFeatureSpecification", name: "Licensed bar", value: true },
    ],
    award: business.awards,
    makesOffer: {
      "@type": "Offer",
      name: `Two-course lunch deal`,
      price: lunchDeal.price.toFixed(2),
      priceCurrency: "GBP",
      description: lunchDeal.availability,
      url: `${SITE_URL}/menu/lunch-deal`,
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: SITE_URL,
    name: business.name,
    description: business.description,
    inLanguage: "en-GB",
    publisher: { "@id": ids.restaurant },
  };
}

export function logoSchema(): JsonLd {
  return {
    "@type": "ImageObject",
    "@id": ids.logo,
    url: `${SITE_URL}/images/logo.png`,
    contentUrl: `${SITE_URL}/images/logo.png`,
    width: 538,
    height: 600,
    caption: `${business.name} logo`,
  };
}

export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage" | "ItemPage";
  dateModified?: string;
}): JsonLd {
  const url = `${SITE_URL}${input.path}`;
  return {
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.restaurant },
    inLanguage: "en-GB",
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function menuItemSchema(item: MenuDocument["sections"][number]["items"][number]): JsonLd {
  const node: JsonLd = {
    "@type": "MenuItem",
    name: item.name,
  };
  if (item.description) node.description = item.description;
  if (item.dietary?.includes("vegetarian")) {
    node.suitableForDiet = "https://schema.org/VegetarianDiet";
  }
  if (typeof item.price === "number") {
    node.offers = {
      "@type": "Offer",
      price: item.price.toFixed(2),
      priceCurrency: "GBP",
    };
  } else if (item.prices) {
    node.offers = item.prices.map((p) => ({
      "@type": "Offer",
      name: p.label,
      price: p.price.toFixed(2),
      priceCurrency: "GBP",
    }));
  }
  return node;
}

/** One schema.org Menu node covering every printed menu, exposed on /menu. */
export function menuSchema(menus: MenuDocument[]): JsonLd {
  return {
    "@type": "Menu",
    "@id": ids.menu,
    name: `${business.name} menu`,
    url: `${SITE_URL}/menu`,
    inLanguage: "en-GB",
    hasMenuSection: menus.map((menu) => ({
      "@type": "MenuSection",
      name: menu.title,
      description: menu.intro,
      url: `${SITE_URL}/menu${menu.slug === "main" ? "" : `/${menu.slug}`}`,
      hasMenuSection: menu.sections.map((section) => ({
        "@type": "MenuSection",
        name: section.title,
        ...(section.note ? { description: section.note } : {}),
        hasMenuItem: section.items.map(menuItemSchema),
      })),
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: JsonLd[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
