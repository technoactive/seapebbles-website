/**
 * Single source of truth for business facts. Everything that appears in
 * structured data, the footer, llms.txt and the contact page reads from here,
 * so a change to the phone number or hours only has to be made once.
 */

const PRODUCTION_URL = "https://seapebbles.co.uk";

/**
 * Canonical origin for absolute URLs (metadata, sitemap, JSON-LD, llms.txt).
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL, when set to a non-empty, valid absolute URL
 * 2. Vercel's production domain for the project (previews canonicalise to it)
 * 3. The hard-coded production domain
 *
 * Hosting dashboards sometimes define a variable with an empty value, and
 * `new URL("")` throws at build time, so blanks are treated as unset.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    PRODUCTION_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      return new URL(value).origin;
    } catch {
      // Malformed value; fall through to the next candidate.
    }
  }
  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

export const business = {
  name: "Sea Pebbles",
  legalName: "Sea Pebbles Hatch End",
  tagline: "The Plaice to Eat",
  strapline: "Fried fish at its best",
  foundingYear: 1990,
  description:
    "Family-run fish and chip restaurant and takeaway in Hatch End, Pinner. Serving fresh cod, haddock, plaice and more since 1990, fried in batter or matzo meal, or grilled. Dine in, collect or get it delivered.",
  phone: "020 8428 0203",
  phoneIntl: "+442084280203",
  email: "info@seapebbles.co.uk",
  address: {
    street: "348-352 Uxbridge Road",
    locality: "Hatch End",
    town: "Pinner",
    region: "Middlesex",
    postcode: "HA5 4HR",
    country: "GB",
  },
  geo: {
    // OpenStreetMap: Sea Pebbles, 352 Uxbridge Road, Hatch End
    latitude: 51.6077153,
    longitude: -0.3750488,
  },
  priceRange: "££",
  cuisines: ["Fish and Chips", "Seafood", "British", "Greek"],
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Contactless"],
  googleMapsUrl: "https://maps.google.com/?q=Sea+Pebbles+348-352+Uxbridge+Road+Hatch+End+HA5+4HR",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Sea%20Pebbles%20Hatch%20End&t=m&z=17&output=embed&iwloc=near",
  googleReviewUrl: "https://g.page/r/Cda9UT0x_j8LEAE/review",
  tripadvisorUrl:
    "https://www.tripadvisor.co.uk/Restaurant_Review-g7380842-d2368403-Reviews-Sea_Pebbles-Pinner_Greater_London_England.html",
  social: {
    facebook: "https://www.facebook.com/seapebbleshatchend",
    instagram: "https://www.instagram.com/seapebblesofficial/",
    instagramHandle: "@seapebblesofficial",
  },
  ordering: {
    direct: "https://orderdirectly.biz/menu/661",
    uberEats: "https://www.ubereats.com/store/sea-pebbles-hatch-end/s0XX2R8LTQ-VE4zHLGAz1g",
    deliveroo: "https://deliveroo.co.uk/menu/london/pinner/sea-pebbles?day=today&postcode=HA54HR&time=ASAP",
    iosApp: "https://apps.apple.com/gb/app/sea-pebbles-hatch-end/id1517633414",
  },
  menusPdf: {
    main: "/menus/sea-pebbles-main-menu-2026.pdf",
    lunchAndDesserts: "/menus/sea-pebbles-lunch-deal-and-desserts-2026.pdf",
  },
  awards: [
    "Fish & Chip Shop of the Year 2005, Area Winner, London & South East England, Greater London & Middlesex",
    "Fish & Chip Shop of the Year, London Regional Finalist",
    "Harrow Observer Fish & Chip Shop of the Year",
    "Recommended by the Evening Standard's ES Magazine",
    "Food Hygiene Rating 5 (Very Good)",
  ],
} as const;

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningPeriod = { opens: string; closes: string };

/** Opening hours per day. Empty array = closed. Times are 24h "HH:MM" in Europe/London. */
export const openingHours: Record<DayOfWeek, OpeningPeriod[]> = {
  Monday: [],
  Tuesday: [
    { opens: "11:30", closes: "14:30" },
    { opens: "17:00", closes: "22:00" },
  ],
  Wednesday: [
    { opens: "11:30", closes: "14:30" },
    { opens: "17:00", closes: "22:00" },
  ],
  Thursday: [
    { opens: "11:30", closes: "14:30" },
    { opens: "17:00", closes: "22:00" },
  ],
  Friday: [{ opens: "11:30", closes: "22:00" }],
  Saturday: [{ opens: "11:30", closes: "22:00" }],
  Sunday: [],
};

/** Human-friendly grouped summary, used on the homepage and footer. */
export const openingHoursSummary = [
  { days: "Tuesday to Thursday", times: ["11:30am – 2:30pm", "5:00pm – 10:00pm"] },
  { days: "Friday and Saturday", times: ["11:30am – 10:00pm"] },
  { days: "Sunday and Monday", times: ["Closed"] },
];

export const lunchDeal = {
  price: 19.95,
  courses: 2,
  availability: "Tuesday to Thursday 11:30am – 2:30pm, Friday 11:30am – 3:00pm. Not available on bank holidays.",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export function formatAddress(separator = ", ") {
  const a = business.address;
  return [a.street, a.locality, a.town, a.region, a.postcode].join(separator);
}
