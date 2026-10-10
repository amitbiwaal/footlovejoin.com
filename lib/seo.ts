import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";

type PageMeta = {
  /** Page title — the root layout appends " | Foot Love". */
  title: string;
  description: string;
  /** Root-relative path with trailing slash, e.g. "/blog/". */
  path: string;
  type?: "website" | "article";
  /** Root-relative or absolute image; falls back to the site OG image. */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
};

/**
 * Full metadata for one page. Next merges metadata shallowly, so a page that
 * sets `openGraph` or `alternates` replaces the layout's — every page gets the
 * complete set (self-canonical, OG, Twitter, RSS discovery) from here.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  imageAlt,
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  noindex,
}: PageMeta): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const images = [
    {
      url: image || SITE.ogImage,
      // Only the default OG image has known dimensions.
      ...(image ? {} : { width: 1200, height: 630 }),
      alt: imageAlt || title,
    },
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export type Crumb = { name: string; path: string };

/** schema.org BreadcrumbList node; "Home" is prepended automatically. */
export function breadcrumbLd(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  const last = all[all.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(last.path)}#breadcrumb`,
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** schema.org WebPage-family node for simple content pages. */
export function webPageLd(
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  { title, description, path }: Pick<PageMeta, "title" | "description" | "path">,
) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE.url}/#website` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

export function faqLd(path: string, faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
