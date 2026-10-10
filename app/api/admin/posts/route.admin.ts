// Dev-only (see `pageExtensions` in next.config.mjs): the blog admin's post API.
import { adminGuard } from "@/lib/admin-guard";
import { PostError, deletePost, getAllPosts, savePost } from "@/lib/posts";

export const dynamic = "force-dynamic";

/** All posts, drafts included. */
export function GET(request: Request) {
  const denied = adminGuard(request);
  if (denied) return denied;

  return Response.json({ posts: getAllPosts() });
}

/** Create or update: `{ post, originalSlug? }`. */
export async function POST(request: Request) {
  const denied = adminGuard(request);
  if (denied) return denied;

  let body: { post?: unknown; originalSlug?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const post = savePost(
      body.post,
      typeof body.originalSlug === "string" ? body.originalSlug : undefined,
    );
    return Response.json({ post });
  } catch (error) {
    if (error instanceof PostError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

/** Delete: `?slug=my-post`. */
export function DELETE(request: Request) {
  const denied = adminGuard(request);
  if (denied) return denied;

  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  return deletePost(slug)
    ? Response.json({ ok: true })
    : Response.json({ error: "Post not found." }, { status: 404 });
}
