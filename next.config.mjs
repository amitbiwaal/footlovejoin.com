import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const BASE_EXTENSIONS = ["tsx", "ts", "jsx", "js"];

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Static export -> generates an `out/` folder of plain HTML/CSS/JS.
    // Perfect for hosting on Hostinger (upload `out/` to public_html),
    // or Netlify/Cloudflare Pages. No Node server required.
    //
    // `npm run dev` keeps a real server instead, because the local blog admin
    // (/admin/) needs API routes that write posts into `content/blog/`.
    output: isDev ? undefined : "export",

    // Static export can't optimize images on a server, so serve them as-is.
    images: {
      unoptimized: true,
    },

    // Cleaner URLs: /faq/ instead of /faq.html
    trailingSlash: true,

    // Files named `page.admin.tsx` / `route.admin.ts` are routes only in dev,
    // so the blog admin and its write APIs never ship in the `out/` folder.
    pageExtensions: isDev
      ? ["admin.tsx", "admin.ts", ...BASE_EXTENSIONS]
      : BASE_EXTENSIONS,
  };
};

export default nextConfig;
