// Single source of truth for site-wide facts used by pages, metadata,
// the sitemap, the RSS feed and llms.txt.
export const SITE = {
  url: "https://footlovejoin.com",
  name: "Foot Love",
  /** The site/brand as shown in the header logo. */
  fullName: "Foot Love Join",
  description:
    "Foot Love is a safe, anonymous online marketplace and app where verified adult creators sell feet pics and videos to thousands of verified buyers.",
  /** Public contact address shown on the Contact and legal pages. */
  email: "contact@footlovejoin.com",
  defaultAuthor: "Foot Love Editorial Team",
  ogImage: "/og-image.jpg",
  /** Shown as "Last updated" on the legal pages. */
  legalUpdated: "2026-10-10",
} as const;

/**
 * Site-wide noindex switch: set SITE_NOINDEX=1 in the environment to keep every
 * page out of search engines. It is read at build time, so redeploy after
 * changing it. (next.config.mjs reads the same variable for the HTTP header.)
 */
export const SITE_NOINDEX = ["1", "true", "yes"].includes(
  (process.env.SITE_NOINDEX ?? "").toLowerCase(),
);

export type NavLink = { label: string; href: string };

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How to Sell Feet Pics", href: "/how-to-sell-feet-pics/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms/" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
  { label: "18+ & 2257 Compliance", href: "/2257-compliance/" },
];

/** Absolute URL for a root-relative path ("/blog/" -> "https://…/blog/"). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** "2026-10-10T09:00:00.000Z" -> "October 10, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : DATE_FORMAT.format(date);
}
