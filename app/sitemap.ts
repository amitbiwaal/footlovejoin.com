import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// [path, last meaningful content change, changeFrequency, priority]
const STATIC_PAGES: [string, string, "daily" | "weekly" | "monthly" | "yearly", number][] = [
  ["/", "2026-10-10", "daily", 1],
  ["/how-to-sell-feet-pics/", "2026-08-06", "weekly", 0.9],
  ["/about/", SITE.legalUpdated, "monthly", 0.5],
  ["/contact/", SITE.legalUpdated, "yearly", 0.4],
  ["/privacy-policy/", SITE.legalUpdated, "yearly", 0.3],
  ["/terms/", SITE.legalUpdated, "yearly", 0.3],
  ["/affiliate-disclosure/", SITE.legalUpdated, "yearly", 0.3],
  ["/2257-compliance/", SITE.legalUpdated, "yearly", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  const postDate = (p: (typeof posts)[number]) => p.updatedAt || p.publishedAt;
  const newestPost = posts.map(postDate).sort().pop();

  return [
    ...STATIC_PAGES.map(([path, lastModified, changeFrequency, priority]) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    {
      url: absoluteUrl("/blog/"),
      lastModified: newestPost || SITE.legalUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}/`),
      lastModified: postDate(p),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
