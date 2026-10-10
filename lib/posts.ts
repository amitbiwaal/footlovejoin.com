// File-based blog store: one JSON file per post in `content/blog/`.
// Read at build time by the blog pages, written by the local admin API.
import fs from "node:fs";
import path from "node:path";
import { SITE } from "./site";
import { isValidSlug, normalizePost, type Post } from "./post-types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const fileFor = (slug: string) => path.join(POSTS_DIR, `${slug}.json`);

function readPostFile(file: string): Post | null {
  try {
    const post = normalizePost(JSON.parse(fs.readFileSync(file, "utf8")));
    // The filename is the source of truth for the URL.
    post.slug = path.basename(file, ".json");
    return isValidSlug(post.slug) ? post : null;
  } catch {
    return null;
  }
}

/** Every post, drafts included, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readPostFile(path.join(POSTS_DIR, f)))
    .filter((p): p is Post => p !== null)
    .sort((a, b) =>
      (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt),
    );
}

/** What the live site shows. */
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((p) => p.status === "published");
}

export function getPost(slug: string): Post | null {
  if (!isValidSlug(slug)) return null;
  const file = fileFor(slug);
  return fs.existsSync(file) ? readPostFile(file) : null;
}

export class PostError extends Error {}

/**
 * Creates or updates a post. `originalSlug` is the slug the post was loaded
 * with, so a changed slug renames the file instead of leaving a copy behind.
 */
export function savePost(input: unknown, originalSlug?: string): Post {
  const post = normalizePost(input);

  if (!post.title) throw new PostError("Add a title before saving.");
  if (!isValidSlug(post.slug)) {
    throw new PostError(
      "The URL slug can only use lowercase letters, numbers and hyphens.",
    );
  }

  const renamed = Boolean(originalSlug) && originalSlug !== post.slug;
  if ((!originalSlug || renamed) && fs.existsSync(fileFor(post.slug))) {
    throw new PostError(`Another post already uses the slug "${post.slug}".`);
  }

  const now = new Date().toISOString();
  post.updatedAt = now;
  post.author ||= SITE.defaultAuthor;
  if (post.status === "published" && !post.publishedAt) post.publishedAt = now;

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(fileFor(post.slug), `${JSON.stringify(post, null, 2)}\n`, "utf8");

  if (renamed && isValidSlug(originalSlug)) {
    fs.rmSync(fileFor(originalSlug), { force: true });
  }

  return post;
}

export function deletePost(slug: string): boolean {
  if (!isValidSlug(slug) || !fs.existsSync(fileFor(slug))) return false;
  fs.rmSync(fileFor(slug));
  return true;
}
