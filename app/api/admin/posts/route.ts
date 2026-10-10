import { requireAdmin, revalidateBlog } from "@/lib/admin";
import { PostError, deletePost, getAllPosts, savePost } from "@/lib/posts";

export const dynamic = "force-dynamic";

/** All posts, drafts included. */
export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  return Response.json({ posts: await getAllPosts() });
}

/** Create or update: `{ post, originalSlug? }`. */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let body: { post?: unknown; originalSlug?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const post = await savePost(
      body.post,
      typeof body.originalSlug === "string" ? body.originalSlug : undefined,
    );
    revalidateBlog();
    return Response.json({ post });
  } catch (error) {
    if (error instanceof PostError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

/** Delete: `?slug=my-post`. */
export async function DELETE(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!(await deletePost(slug))) {
    return Response.json({ error: "Post not found." }, { status: 404 });
  }

  revalidateBlog();
  return Response.json({ ok: true });
}
