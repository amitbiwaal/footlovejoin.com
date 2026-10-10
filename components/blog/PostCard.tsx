import Link from "next/link";
import type { Post } from "@/lib/post-types";
import { formatDate } from "@/lib/site";
import { renderPostHtml } from "@/lib/post-html";
import { Footprint, Clock } from "../Icons";

/** Cover image, or a brand-gradient placeholder when a post has none. */
export function PostCover({
  post,
  priority = false,
  className = "",
}: {
  post: Post;
  /** True for the above-the-fold image (the LCP candidate). */
  priority?: boolean;
  className?: string;
}) {
  if (!post.coverImage) {
    return (
      <div
        aria-hidden="true"
        className={`grid place-items-center bg-gradient-to-br from-[#FF6B5A] via-[#E8A87C] to-[#241F30] ${className}`}
      >
        <Footprint className="h-14 w-14 text-white/70" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.coverImage}
      alt={post.coverAlt || post.title}
      width={post.coverWidth ?? undefined}
      height={post.coverHeight ?? undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}

export function PostMeta({ post }: { post: Post }) {
  const { readingMinutes } = renderPostHtml(post.content);

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
      {post.publishedAt && (
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      )}
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {readingMinutes} min read
      </span>
    </p>
  );
}

export default function PostCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 transition-colors hover:border-coral/30">
      <div className="aspect-[16/9] overflow-hidden">
        <PostCover
          post={post}
          priority={priority}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="chip self-start border-coral/30 bg-coral/10 text-rose-gold">
          {post.category}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug sm:text-xl">
          {/* Stretched link: the whole card is clickable */}
          <Link
            href={`/blog/${post.slug}/`}
            className="after:absolute after:inset-0 group-hover:text-coral-soft"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mb-4 mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>
        <PostMeta post={post} />
      </div>
    </article>
  );
}
