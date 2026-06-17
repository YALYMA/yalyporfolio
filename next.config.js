/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Prevents "Cannot read properties of undefined (reading 'tap')" build errors
  // that can occur with next-pwa + Next.js 14 production builds on Vercel.
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: { cacheName: "google-fonts-cache", expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: { cacheName: "gstatic-fonts-cache", expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-image-assets", expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 } },
    },
    {
      urlPattern: /\/_next\/static.+\.js$/i,
      handler: "CacheFirst",
      options: { cacheName: "next-static-js", expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 } },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // ── Fix: redirect any locale-prefixed paths back to root ──
  // Google Translate sometimes prefixes /fr/ or /en/ causing 404s
  async redirects() {
    return [
      { source: "/fr/:path*", destination: "/:path*", permanent: false },
      { source: "/en/:path*", destination: "/:path*", permanent: false },
    ];
  },

  // ── Fix: allow query params like ?hl=fr without 404 ──
  // Next.js ignores unknown query params by default — this is for clarity
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
