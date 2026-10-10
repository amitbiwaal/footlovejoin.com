import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PostCard, { PostCover, PostMeta } from "./PostCard";
import { ArrowRight } from "@/components/Icons";
import { getPublishedPosts } from "@/lib/posts";
import { breadcrumbLd } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

export const blogIndexPage = {
  title: "Blog: Tips & Guides for Selling Feet Pics",
  description:
    "Practical guides for selling feet pics: photo tips, pricing, staying anonymous, avoiding scams, and growing a steady side income — written for beginners.",
  path: "/blog/",
};

const page = blogIndexPage;
const crumbs = [{ name: "Blog", path: page.path }];

/** The /blog/ listing: newest post featured, the rest as cards. */
export default async function BlogIndex() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;
  const pageUrl = absoluteUrl(page.path);

  const blogLd = {
    "@type": "Blog",
    "@id": `${pageUrl}#blog`,
    url: pageUrl,
    name: `${SITE.name} Blog`,
    description: page.description,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE.url}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${p.slug}/`)}#article`,
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}/`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt || p.publishedAt,
    })),
  };

  return (
    <>
      <Header />
      <main>
        <section className="pt-10 sm:pt-14">
          <div className="container-x">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-6 max-w-3xl">
              <span className="eyebrow">The Foot Love Blog</span>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                Tips &amp; guides for{" "}
                <span className="text-gradient">selling feet pics</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Straight-talking advice on taking better photos, pricing your
                work, staying anonymous, and building a steady side income.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="container-x">
            {!featured ? (
              <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-8 text-center sm:p-12">
                <h2 className="text-2xl font-extrabold tracking-tight">
                  New articles are on the way
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-ink-muted">
                  In the meantime, our complete beginner&apos;s guide covers
                  everything you need to get started.
                </p>
                <Link href="/how-to-sell-feet-pics/" className="btn-primary mt-6">
                  Read the guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Latest post */}
                <article className="group relative grid overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 transition-colors hover:border-coral/30 lg:grid-cols-2">
                  <div className="aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
                    <PostCover
                      post={featured}
                      priority
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <span className="chip self-start border-coral/30 bg-coral/10 text-rose-gold">
                      Latest · {featured.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                      <Link
                        href={`/blog/${featured.slug}/`}
                        className="after:absolute after:inset-0 group-hover:text-coral-soft"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mb-5 mt-3 leading-relaxed text-ink-muted">
                      {featured.excerpt}
                    </p>
                    <PostMeta post={featured} />
                  </div>
                </article>

                {rest.length > 0 && (
                  <>
                    <h2 className="mt-14 text-2xl font-extrabold tracking-tight sm:text-3xl">
                      More articles
                    </h2>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {rest.map((p) => (
                        <PostCard key={p.slug} post={p} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>

        <CtaBanner
          eyebrow="Free to join"
          title="Put what you've learned to work"
          subtitle="Open a free, anonymous seller profile and list your first set today."
          primary="Start selling — it's free"
        />
      </main>
      <Footer />

      <JsonLd graph={[breadcrumbLd(crumbs), blogLd]} />
    </>
  );
}
