import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PostCard, { PostCover } from "./PostCard";
import { ArrowRight, ChevronDown, Clock } from "@/components/Icons";
import { AFFILIATE_LINK_PROPS } from "@/components/affiliate";
import { getPublishedPosts } from "@/lib/posts";
import type { Post } from "@/lib/post-types";
import { renderPostHtml } from "@/lib/post-html";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { SITE, absoluteUrl, formatDate } from "@/lib/site";

/** One article: header, cover, table of contents, body, FAQ, related posts. */
export default async function BlogPost({
  post,
  preview = false,
}: {
  post: Post;
  /** Rendered from /admin/preview/ — may be an unpublished draft. */
  preview?: boolean;
}) {
  const { html, toc, wordCount, readingMinutes } = renderPostHtml(post.content);
  const path = `/blog/${post.slug}/`;
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Blog", path: "/blog/" },
    { name: post.title, path },
  ];

  const others = (await getPublishedPosts()).filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const articleLd = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: absoluteUrl(post.coverImage || SITE.ogImage),
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: {
      "@type": post.author === SITE.defaultAuthor ? "Organization" : "Person",
      name: post.author,
      url: `${SITE.url}/about/`,
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: url,
    isPartOf: { "@id": `${SITE.url}/#website` },
    articleSection: post.category,
    keywords: post.tags.length ? post.tags.join(", ") : undefined,
    wordCount,
    inLanguage: "en-US",
  };

  return (
    <>
      <Header />
      <main>
        {preview && (
          <div className="border-b border-coral/30 bg-coral/10 px-5 py-2.5 text-center text-sm font-semibold text-rose-gold">
            {post.status === "published"
              ? "Preview — showing your last saved version."
              : "Draft preview — this post is not published, so visitors can’t see it."}
          </div>
        )}

        <article>
          <header className="pt-10 sm:pt-14">
            <div className="container-x">
              <div className="mx-auto max-w-3xl">
                <Breadcrumbs crumbs={crumbs} />
                <span className="chip mt-6 border-coral/30 bg-coral/10 text-rose-gold">
                  {post.category}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
                  <span>
                    By <span className="font-semibold text-ink-muted">{post.author}</span>
                  </span>
                  {post.publishedAt && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readingMinutes} min read
                  </span>
                </p>
              </div>

              {post.coverImage && (
                <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-white/10">
                  <PostCover post={post} priority className="h-auto w-full" />
                </div>
              )}
            </div>
          </header>

          <div className="container-x pb-12 pt-8 sm:pb-16 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              {toc.length > 2 && (
                <details
                  open
                  className="group mb-10 rounded-3xl border border-white/10 bg-bg-card/60 p-5 sm:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                    In this article
                    <ChevronDown className="h-5 w-5 text-coral transition-transform group-open:rotate-180" />
                  </summary>
                  <nav aria-label="Table of contents">
                    <ol className="mt-4 space-y-2 text-sm">
                      {toc.map((t) => (
                        <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
                          <a
                            href={`#${t.id}`}
                            className="text-ink-muted transition-colors hover:text-coral-soft"
                          >
                            {t.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </details>
              )}

              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* In-article call to action */}
              <aside className="mt-12 rounded-3xl border border-coral/25 bg-coral/10 p-6 sm:p-8">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Ready to start selling feet pics?
                </h2>
                <p className="mt-2 text-ink-muted">
                  Create a free, anonymous seller profile in minutes — no face
                  and no real name required. 18+ only.
                </p>
                <a {...AFFILIATE_LINK_PROPS} className="btn-primary mt-5">
                  Start selling — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </aside>

              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                New to all this? Our{" "}
                <Link
                  href="/how-to-sell-feet-pics/"
                  className="font-semibold text-coral-soft underline decoration-coral/40 underline-offset-4 hover:text-coral"
                >
                  step-by-step guide to selling feet pics
                </Link>{" "}
                covers setup, pricing, safety, and what a realistic first six
                months looks like.
              </p>

              {post.tags.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {post.updatedAt && (
                <p className="mt-6 text-sm text-ink-faint">
                  Last updated:{" "}
                  <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </p>
              )}
            </div>
          </div>
        </article>

        {post.faqs.length > 0 && (
          <section
            id="faq"
            className="border-y border-white/10 bg-bg-soft/60 py-14 sm:py-20"
          >
            <div className="container-x">
              <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
                Frequently asked{" "}
                <span className="text-gradient">questions</span>
              </h2>
              <div className="mt-10">
                <FaqAccordion items={post.faqs} />
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="py-14 sm:py-20">
            <div className="container-x">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Keep reading
                </h2>
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-soft hover:text-coral"
                >
                  All articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBanner
          eyebrow="Your feet, your income"
          title="Start selling feet pics today"
          subtitle="Set up a free, anonymous seller profile in minutes and list your first set."
          primary="Join Foot Love free"
          note="Free to join · 18+ only · Stay anonymous"
        />
      </main>
      <Footer />

      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          articleLd,
          ...(post.faqs.length ? [faqLd(path, post.faqs)] : []),
        ]}
      />
    </>
  );
}
