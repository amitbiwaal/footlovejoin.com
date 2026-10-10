import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex, { blogIndexPage } from "@/components/blog/BlogIndex";
import BlogPost from "@/components/blog/BlogPost";
import { getAllPosts, getPost, getPublishedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

// One route for both /blog/ and /blog/<slug>/. Static export refuses a dynamic
// route with zero params, so a separate [slug] route would break the build
// whenever no post is published; here the index is always one of the params.
type Props = { params: { slug?: string[] } };

const isDev = process.env.NODE_ENV === "development";

// Drafts are previewable in `npm run dev`, but never exported to the live site.
const visiblePosts = () => (isDev ? getAllPosts() : getPublishedPosts());

const postFor = ({ slug }: Props["params"]) =>
  slug?.length === 1 ? getPost(slug[0]) : null;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: [] }, ...visiblePosts().map((p) => ({ slug: [p.slug] }))];
}

export function generateMetadata({ params }: Props): Metadata {
  if (!params.slug?.length) return buildMetadata(blogIndexPage);

  const post = postFor(params);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}/`,
    type: "article",
    image: post.coverImage || undefined,
    imageAlt: post.coverAlt || post.title,
    keywords: post.tags,
    publishedTime: post.publishedAt || undefined,
    modifiedTime: post.updatedAt || post.publishedAt || undefined,
    authors: [post.author],
    noindex: post.status !== "published",
  });
}

export default function BlogRoute({ params }: Props) {
  if (!params.slug?.length) return <BlogIndex />;

  const post = postFor(params);
  if (!post || (!isDev && post.status !== "published")) notFound();

  return <BlogPost post={post} />;
}
