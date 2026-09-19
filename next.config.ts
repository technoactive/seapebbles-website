import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Inline scripts/styles are needed by React hydration and next/font; the
    // remaining directives are locked down. Google Maps is the only framed origin.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // React needs eval() for dev-mode debugging only; never shipped to production.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://maps.gstatic.com https://*.googleapis.com https://*.ggpht.com",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: true,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/menus/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Old WordPress URLs that may still be indexed or linked.
    return [
      { source: "/faq", destination: "/faqs", permanent: true },
      { source: "/menus/Sea%20Pebbles%20Main%20Menu%202026.pdf", destination: "/menus/sea-pebbles-main-menu-2026.pdf", permanent: true },
      { source: "/menus/Sea%20Pebbles%20Lunch%20Deal%20%26%20Desserts%202026.pdf", destination: "/menus/sea-pebbles-lunch-deal-and-desserts-2026.pdf", permanent: true },
      { source: "/menus/Sea%20Pebbles%20All%20Menus%202026.pdf", destination: "/menu", permanent: true },
      { source: "/menus/Privacy%20Policy.pdf", destination: "/privacy-policy", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
