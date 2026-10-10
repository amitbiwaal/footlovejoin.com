// Blog post shape shared by the file store (lib/posts.ts), the public blog
// pages and the admin editor. No Node APIs here — safe to import client-side.

export type PostStatus = "draft" | "published";

export type PostFaq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  /** Short summary shown on blog cards; also the meta description fallback. */
  excerpt: string;
  /** Article body as HTML (written by the admin editor). */
  content: string;
  coverImage: string;
  coverAlt: string;
  coverWidth: number | null;
  coverHeight: number | null;
  category: string;
  tags: string[];
  author: string;
  status: PostStatus;
  /** ISO timestamps. */
  publishedAt: string;
  updatedAt: string;
  /** Optional overrides for the <title> and meta description. */
  seoTitle: string;
  seoDescription: string;
  /** Optional Q&A block rendered under the article (+ FAQPage schema). */
  faqs: PostFaq[];
};

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && slug.length <= 80 && SLUG_RE.test(slug);
}

/** "How to Sell Feet Pics!" -> "how-to-sell-feet-pics". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

export function emptyPost(author = ""): Post {
  return {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    coverAlt: "",
    coverWidth: null,
    coverHeight: null,
    category: "Guides",
    tags: [],
    author,
    status: "draft",
    publishedAt: "",
    updatedAt: "",
    seoTitle: "",
    seoDescription: "",
    faqs: [],
  };
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const dim = (v: unknown) =>
  typeof v === "number" && Number.isFinite(v) && v > 0 ? Math.round(v) : null;
const iso = (v: unknown) => {
  const d = new Date(str(v));
  return str(v) && !Number.isNaN(d.getTime()) ? d.toISOString() : "";
};

/** Coerces untrusted JSON (a file on disk or an API body) into a Post. */
export function normalizePost(raw: unknown): Post {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  return {
    slug: str(r.slug),
    title: str(r.title),
    excerpt: str(r.excerpt),
    content: typeof r.content === "string" ? r.content : "",
    coverImage: str(r.coverImage),
    coverAlt: str(r.coverAlt),
    coverWidth: dim(r.coverWidth),
    coverHeight: dim(r.coverHeight),
    category: str(r.category) || "Guides",
    tags: Array.isArray(r.tags) ? r.tags.map(str).filter(Boolean) : [],
    author: str(r.author),
    status: r.status === "published" ? "published" : "draft",
    publishedAt: iso(r.publishedAt),
    updatedAt: iso(r.updatedAt),
    seoTitle: str(r.seoTitle),
    seoDescription: str(r.seoDescription),
    faqs: Array.isArray(r.faqs)
      ? r.faqs
          .map((f) => {
            const o = (f && typeof f === "object" ? f : {}) as Record<string, unknown>;
            return { q: str(o.q), a: str(o.a) };
          })
          .filter((f) => f.q && f.a)
      : [],
  };
}
