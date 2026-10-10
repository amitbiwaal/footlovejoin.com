"use client";

import type { Post } from "@/lib/post-types";
import { SITE } from "@/lib/site";

const TITLE_SUFFIX = ` | ${SITE.name}`;
const SITE_HOST = new URL(SITE.url).host;

type Check = { ok: boolean; label: string };

/** Lightweight on-page SEO checks, recalculated as the post is edited. */
export function seoChecks(post: Post): Check[] {
  const title = (post.seoTitle || post.title) + TITLE_SUFFIX;
  const description = post.seoDescription || post.excerpt;
  const text = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const h2Count = (post.content.match(/<h2[\s>]/g) ?? []).length;
  const images = post.content.match(/<img\s[^>]*>/g) ?? [];
  const imagesWithAlt = images.filter((i) => /alt="[^"]+"/.test(i));
  const internalLink = new RegExp(`href="(/|https?://${SITE_HOST})`).test(post.content);

  return [
    {
      ok: title.length >= 30 && title.length <= 60,
      label: `Title tag is 30–60 characters (now ${title.length}, incl. "${TITLE_SUFFIX.trim()}")`,
    },
    {
      ok: description.length >= 120 && description.length <= 160,
      label: `Meta description is 120–160 characters (now ${description.length})`,
    },
    {
      ok: post.slug.length > 0 && post.slug.length <= 60,
      label: "URL slug is short and descriptive",
    },
    { ok: words >= 600, label: `Article has at least 600 words (now ${words})` },
    { ok: h2Count >= 2, label: `Uses H2 headings to structure the article (now ${h2Count})` },
    {
      ok: Boolean(post.coverImage && post.coverAlt),
      label: "Cover image with alt text",
    },
    {
      ok: images.length === imagesWithAlt.length,
      label: `Every article image has alt text (${imagesWithAlt.length}/${images.length})`,
    },
    { ok: internalLink, label: "Links to at least one other page on this site" },
  ];
}

function Counter({ value, max }: { value: string; max: number }) {
  return (
    <span className={value.length > max ? "text-coral" : "text-ink-faint"}>
      {value.length}/{max}
    </span>
  );
}

export default function SeoPanel({
  post,
  onChange,
}: {
  post: Post;
  onChange: (patch: Partial<Post>) => void;
}) {
  const title = post.seoTitle || post.title || "Post title";
  const description =
    post.seoDescription || post.excerpt || "Your meta description will appear here.";
  const checks = seoChecks(post);
  const passed = checks.filter((c) => c.ok).length;

  return (
    <div className="space-y-4">
      {/* Search result preview */}
      <div className="rounded-2xl border border-white/10 bg-bg/70 p-4">
        <p className="truncate text-xs text-ink-faint">
          {SITE_HOST} › blog › {post.slug || "your-post"}
        </p>
        <p className="mt-1 line-clamp-1 text-base font-medium text-[#8ab4f8]">
          {title}
          {TITLE_SUFFIX}
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>

      <div>
        <label className="field-label flex justify-between" htmlFor="seo-title">
          SEO title <Counter value={post.seoTitle || post.title} max={60 - TITLE_SUFFIX.length} />
        </label>
        <input
          id="seo-title"
          className="field"
          value={post.seoTitle}
          placeholder={post.title || "Defaults to the post title"}
          onChange={(e) => onChange({ seoTitle: e.target.value })}
        />
      </div>

      <div>
        <label className="field-label flex justify-between" htmlFor="seo-description">
          Meta description <Counter value={post.seoDescription || post.excerpt} max={160} />
        </label>
        <textarea
          id="seo-description"
          rows={3}
          className="field"
          value={post.seoDescription}
          placeholder="Defaults to the excerpt"
          onChange={(e) => onChange({ seoDescription: e.target.value })}
        />
      </div>

      <div>
        <p className="field-label">
          SEO checklist · {passed}/{checks.length}
        </p>
        <ul className="space-y-1.5 text-xs leading-relaxed">
          {checks.map((c) => (
            <li key={c.label} className="flex gap-2">
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-black ${
                  c.ok ? "bg-emerald-400/20 text-emerald-300" : "bg-white/10 text-ink-faint"
                }`}
              >
                {c.ok ? "✓" : "·"}
              </span>
              <span className={c.ok ? "text-ink-muted" : "text-ink-faint"}>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
