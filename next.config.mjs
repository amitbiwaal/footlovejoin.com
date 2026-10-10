const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

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
      // The *.vercel.app copy of the site must not compete with the real
      // domain in search results.
      {
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
