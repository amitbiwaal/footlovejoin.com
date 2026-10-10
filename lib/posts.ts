// Blog store: one row per post in the Turso `posts` table. The full post is
// kept as JSON in `data`; slug/status/dates are also columns for querying.
import { cache } from "react";
import type { Row } from "@libsql/client";
import { db } from "./db";
import { SITE } from "./site";
import { isValidSlug, normalizePost, type Post } from "./post-types";

const NEWEST_FIRST = "ORDER BY COALESCE(NULLIF(published_at, ''), updated_at) DESC";

function toPost(row: Row): Post {
  const post = normalizePost(JSON.parse(String(row.data)));
  // The primary key is the source of truth for the URL.
  post.slug = String(row.slug);
  return post;
}

/** Every post, drafts included, newest first. */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const client = await db();
  const { rows } = await client.execute(`SELECT slug, data FROM posts ${NEWEST_FIRST}`);
  return rows.map(toPost);
});

/** What the public site shows. */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const client = await db();
  const { rows } = await client.execute(
    `SELECT slug, data FROM posts WHERE status = 'published' ${NEWEST_FIRST}`,
  );
  return rows.map(toPost);
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!isValidSlug(slug)) return null;
  const client = await db();
  const { rows } = await client.execute({
    sql: "SELECT slug, data FROM posts WHERE slug = ?",
    args: [slug],
  });
  return rows[0] ? toPost(rows[0]) : null;
});

export class PostError extends Error {}

/**
 * Creates or updates a post. `originalSlug` is the slug the post was loaded
 * with, so a changed slug renames the row instead of leaving a copy behind.
 */
export async function savePost(input: unknown, originalSlug?: string): Promise<Post> {
  const post = normalizePost(input);

  if (!post.title) throw new PostError("Add a title before saving.");
  if (!isValidSlug(post.slug)) {
    throw new PostError(
      "The URL slug can only use lowercase letters, numbers and hyphens.",
    );
  }

  const client = await db();
  const renamed = Boolean(originalSlug) && originalSlug !== post.slug;

  if (!originalSlug || renamed) {
    const taken = await client.execute({
      sql: "SELECT 1 FROM posts WHERE slug = ?",
      args: [post.slug],
    });
    if (taken.rows.length) {
      throw new PostError(`Another post already uses the slug "${post.slug}".`);
    }
  }

  const now = new Date().toISOString();
  post.updatedAt = now;
  post.author ||= SITE.defaultAuthor;
  if (post.status === "published" && !post.publishedAt) post.publishedAt = now;

  const upsert = {
    sql: `INSERT INTO posts (slug, title, status, published_at, updated_at, data)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT (slug) DO UPDATE SET
            title = excluded.title,
            status = excluded.status,
            published_at = excluded.published_at,
            updated_at = excluded.updated_at,
            data = excluded.data`,
    args: [
      post.slug,
      post.title,
      post.status,
      post.publishedAt,
      post.updatedAt,
      JSON.stringify(post),
    ],
  };

  await client.batch(
    renamed && isValidSlug(originalSlug)
      ? [{ sql: "DELETE FROM posts WHERE slug = ?", args: [originalSlug] }, upsert]
      : [upsert],
    "write",
  );

  return post;
}

export async function deletePost(slug: string): Promise<boolean> {
  if (!isValidSlug(slug)) return false;
  const client = await db();
  const result = await client.execute({
    sql: "DELETE FROM posts WHERE slug = ?",
    args: [slug],
  });
  return result.rowsAffected > 0;
}
