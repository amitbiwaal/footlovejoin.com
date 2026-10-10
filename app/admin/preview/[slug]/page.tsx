// Signed-in preview of any post, drafts included, exactly as it will look live.
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/BlogPost";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return <BlogPost post={post} preview />;
}
