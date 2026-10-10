const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

// SITE_NOINDEX=1 keeps the whole site out of search engines (see lib/site.ts).
const SITE_NOINDEX = ["1", "true", "yes"].includes(
  (process.env.SITE_NOINDEX ?? "").toLowerCase(),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images are plain <img> tags (blog images are resized in the browser
  // before upload), so the image optimizer is not used.
  images: {
    unoptimized: true,
  },

  // Cleaner URLs: /faq/ instead of /faq.html
  trailingSlash: true,

  async headers() {
    return [
      // With SITE_NOINDEX every response is noindex. Otherwise only the
      // *.vercel.app copy is, so it never competes with the real domain.
      SITE_NOINDEX
        ? { source: "/:path*", headers: NOINDEX }
        : {
            source: "/:path*",
            has: [{ type: "host", value: ".*\\.vercel\\.app" }],
            headers: NOINDEX,
          },
      // The admin is private, and must not be embeddable in another page.
      {
        source: "/admin/:path*",
        headers: [...NOINDEX, { key: "X-Frame-Options", value: "DENY" }],
      },
      { source: "/api/:path*", headers: NOINDEX },
    ];
  },
};

export default nextConfig;
