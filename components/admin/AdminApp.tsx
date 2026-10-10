"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyPost, type Post } from "@/lib/post-types";
import { SITE, formatDate } from "@/lib/site";
import { Footprint } from "../Icons";
import PostEditor from "./PostEditor";

const NEW = "new";

// The open post lives in the URL (/admin/?post=my-slug) so reloads keep it.
const readParam = () => new URLSearchParams(window.location.search).get("post");

function writeParam(value: string | null, replace = false) {
  const url = value ? `/admin/?post=${encodeURIComponent(value)}` : "/admin/";
  window.history[replace ? "replaceState" : "pushState"](null, "", url);
}

function PostList({
  posts,
  onOpen,
}: {
  posts: Post[];
  onOpen: (slug: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Blog posts</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {posts.filter((p) => p.status === "published").length} published ·{" "}
            {posts.filter((p) => p.status === "draft").length} drafts
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={() => onOpen(NEW)}>
          + New post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <p className="text-lg font-bold">No posts yet</p>
          <p className="mt-2 text-sm text-ink-muted">
            Write your first article — it only goes live once you publish it
            and rebuild the site.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onOpen(p.slug)}
                className="card flex w-full flex-wrap items-center gap-x-4 gap-y-2 p-4 text-left transition-colors hover:border-coral/30 sm:p-5"
              >
                <span className="min-w-0 flex-1 basis-64">
                  <span className="block truncate font-bold">{p.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-faint">
                    /blog/{p.slug}/ · {p.category}
                  </span>
                </span>
                <span className="text-xs text-ink-faint">
                  {formatDate(p.publishedAt || p.updatedAt)}
                </span>
                <span
                  className={`chip ${
                    p.status === "published"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : ""
                  }`}
                >
                  {p.status === "published" ? "Published" : "Draft"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="card mt-10 p-5 text-sm leading-relaxed text-ink-muted sm:p-6">
        <h2 className="font-bold text-ink">How publishing works</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          <li>Write here and press <strong className="text-ink">Publish</strong> — the post is saved in <code className="text-rose-gold">content/blog/</code>.</li>
          <li>Stop the dev server and run <code className="text-rose-gold">npm run build</code>.</li>
          <li>Upload everything inside the <code className="text-rose-gold">out/</code> folder to your hosting.</li>
        </ol>
        <p className="mt-3 text-ink-faint">
          This admin only exists on your computer (npm run dev). It is not part
          of the live website.
        </p>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  // Bumped on navigation only, so saving (or renaming) a post keeps the same
  // editor instance instead of remounting it.
  const [session, setSession] = useState(0);

  useEffect(() => {
    setOpen(readParam());
    const onPop = () => {
      setOpen(readParam());
      setSession((n) => n + 1);
    };
    window.addEventListener("popstate", onPop);

    fetch("/api/admin/posts/")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not load posts.");
        setPosts(data.posts as Post[]);
      })
      .catch((e: Error) => setError(e.message));

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = useCallback((slug: string | null) => {
    writeParam(slug);
    setOpen(slug);
    setSession((n) => n + 1);
    window.scrollTo(0, 0);
  }, []);

  const handleSaved = useCallback((saved: Post, previousSlug?: string) => {
    setPosts((list) => [
      saved,
      ...(list ?? []).filter((p) => p.slug !== saved.slug && p.slug !== previousSlug),
    ]);
    writeParam(saved.slug, true);
    setOpen(saved.slug);
  }, []);

  const handleDeleted = useCallback(
    (slug: string) => {
      setPosts((list) => (list ?? []).filter((p) => p.slug !== slug));
      go(null);
    },
    [go],
  );

  const isNew = open === NEW;
  const editing = open && !isNew ? posts?.find((p) => p.slug === open) : undefined;
  const categories = Array.from(new Set(["Guides", ...(posts ?? []).map((p) => p.category)]));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/90 backdrop-blur-xl">
        <div className="container-x flex h-14 items-center justify-between gap-4">
          <button type="button" onClick={() => go(null)} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient">
              <Footprint className="h-4 w-4 text-[#2a0f0a]" />
            </span>
            <span className="font-extrabold tracking-tight">
              {SITE.name} <span className="text-gradient">Admin</span>
            </span>
          </button>
          <nav className="flex items-center gap-4 text-sm font-medium text-ink-muted">
            <a href="/blog/" target="_blank" rel="noopener" className="hover:text-ink">
              View blog
            </a>
            <a href="/" target="_blank" rel="noopener" className="hover:text-ink">
              View site
            </a>
          </nav>
        </div>
      </header>

      <main className="container-x py-8 sm:py-10">
        {error ? (
          <p className="card border-coral/40 p-6 text-coral-soft">{error}</p>
        ) : posts === null ? (
          <p className="text-ink-muted">Loading…</p>
        ) : isNew || editing ? (
          <PostEditor
            key={session}
            initial={editing ?? emptyPost(SITE.defaultAuthor)}
            initialSlug={editing?.slug}
            categories={categories}
            onSaved={handleSaved}
            onDeleted={handleDeleted}
            onBack={() => go(null)}
          />
        ) : (
          <PostList posts={posts} onOpen={go} />
        )}
      </main>
    </div>
  );
}
