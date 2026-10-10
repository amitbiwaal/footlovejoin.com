import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex, { blogIndexPage } from "@/components/blog/BlogIndex";
import BlogPost from "@/components/blog/BlogPost";
import { getPost, getPublishedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

// One route for both /blog/ and /blog/<slug>/.
type Props = { params: { slug?: string[] } };

// Pages are served as static HTML. The admin rebuilds them the moment a post
// changes (revalidateBlog); the hourly refresh is only a safety net.
export const revalidate = 3600;

// A post published after the last deploy is rendered on its first visit.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return [{ slug: [] }, ...posts.map((p) => ({ slug: [p.slug] }))];
}

/** The published post for this URL, or null. Drafts are never public. */
async function postFor({ slug }: Props["params"]) {
  if (slug?.length !== 1) return null;
  const post = await getPost(slug[0]);
  return post?.status === "published" ? post : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.slug?.length) return buildMetadata(blogIndexPage);

  const post = await postFor(params);
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
  });
}

export default async function BlogRoute({ params }: Props) {
  if (!params.slug?.length) return <BlogIndex />;

  const post = await postFor(params);
  if (!post) notFound();

  return <BlogPost post={post} />;
}
