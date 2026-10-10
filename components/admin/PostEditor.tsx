"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slugify, type Post, type PostFaq, type PostStatus } from "@/lib/post-types";
import { formatDate } from "@/lib/site";
import RichTextEditor from "./RichTextEditor";
import SeoPanel from "./SeoPanel";
import { uploadImage } from "./image-upload";

type Props = {
  /** The post to edit; a blank post when creating. */
  initial: Post;
  /** Slug on disk, or undefined for a post that hasn't been saved yet. */
  initialSlug?: string;
  categories: string[];
  onSaved: (post: Post, previousSlug?: string) => void;
  onDeleted: (slug: string) => void;
  onBack: () => void;
};

type Notice = { kind: "ok" | "error"; text: string };

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-rose-gold">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PostEditor({
  initial,
  initialSlug,
  categories,
  onSaved,
  onDeleted,
  onBack,
}: Props) {
  const [post, setPost] = useState<Post>(initial);
  const [savedSlug, setSavedSlug] = useState(initialSlug);
  const [tagsText, setTagsText] = useState(initial.tags.join(", "));
  // A new post's slug follows its title until the slug is edited by hand.
  const [autoSlug, setAutoSlug] = useState(!initialSlug);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLTextAreaElement>(null);

  // Grow the title box to fit its text (and re-fit when the window resizes).
  useEffect(() => {
    const fit = () => {
      const el = titleInput.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [post.title]);

  const patch = useCallback((changes: Partial<Post>) => {
    setPost((p) => ({ ...p, ...changes }));
    setDirty(true);
  }, []);

  const showError = useCallback(
    (text: string) => setNotice({ kind: "error", text }),
    [],
  );

  const save = useCallback(
    async (status: PostStatus) => {
      setSaving(true);
      setNotice(null);
      try {
        const res = await fetch("/api/admin/posts/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post: { ...post, status }, originalSlug: savedSlug }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not save the post.");

        const saved = data.post as Post;
        onSaved(saved, savedSlug);
        setPost(saved);
        setSavedSlug(saved.slug);
        setAutoSlug(false);
        setDirty(false);
        setNotice({
          kind: "ok",
          text:
            saved.status === "published"
              ? "Published. Run “npm run build” and upload the out/ folder to put it live."
              : "Draft saved.",
        });
      } catch (error) {
        showError(error instanceof Error ? error.message : "Could not save the post.");
      } finally {
        setSaving(false);
      }
    },
    [post, savedSlug, onSaved, showError],
  );

  // Ctrl/Cmd+S saves without changing the publish status.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saving) save(post.status);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, saving, post.status]);

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const remove = async () => {
    if (!savedSlug) return onBack();
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    const res = await fetch(`/api/admin/posts/?slug=${encodeURIComponent(savedSlug)}`, {
      method: "DELETE",
    });
    if (res.ok) onDeleted(savedSlug);
    else showError("Could not delete the post.");
  };

  const uploadCover = async (file: File | undefined) => {
    if (!file) return;
    setUploadingCover(true);
    try {
      const image = await uploadImage(file, {
        maxWidth: 1600,
        format: "image/jpeg",
        name: post.slug || post.title || file.name,
      });
      patch({ coverImage: image.url, coverWidth: image.width, coverHeight: image.height });
    } catch (error) {
      showError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploadingCover(false);
      if (coverInput.current) coverInput.current.value = "";
    }
  };

  const setFaq = (index: number, changes: Partial<PostFaq>) =>
    patch({ faqs: post.faqs.map((f, i) => (i === index ? { ...f, ...changes } : f)) });

  const published = post.status === "published";

  return (
    <div>
      {/* Action bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-ghost px-4 py-2"
          onClick={() => {
            if (!dirty || window.confirm("Discard unsaved changes?")) onBack();
          }}
        >
          ← All posts
        </button>

        <span
          className={`chip ${
            published ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : ""
          }`}
        >
          {published ? "Published" : "Draft"}
          {dirty && " · unsaved changes"}
        </span>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {savedSlug && (
            <a
              href={`/blog/${savedSlug}/`}
              target="_blank"
              rel="noopener"
              className="btn-ghost px-4 py-2"
            >
              Preview
            </a>
          )}
          <button
            type="button"
            disabled={saving}
            className="btn-ghost px-4 py-2 disabled:opacity-50"
            onClick={() => save("draft")}
          >
            {published ? "Unpublish" : "Save draft"}
          </button>
          <button
            type="button"
            disabled={saving}
            className="btn-primary px-5 py-2 disabled:opacity-50"
            onClick={() => save("published")}
          >
            {saving ? "Saving…" : published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
            notice.kind === "ok"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : "border-coral/40 bg-coral/10 text-coral-soft"
          }`}
        >
          {notice.text}
        </p>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Main column */}
        <div className="min-w-0 space-y-4">
          {/* A textarea so long titles wrap instead of being cut off. */}
          <textarea
            ref={titleInput}
            rows={1}
            aria-label="Post title"
            value={post.title}
            placeholder="Post title"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onChange={(e) => {
              const title = e.target.value.replace(/\s*\n\s*/g, " ");
              patch(autoSlug ? { title, slug: slugify(title) } : { title });
            }}
            className="block w-full resize-none overflow-hidden bg-transparent text-3xl font-extrabold leading-tight tracking-tight text-ink placeholder:text-ink-faint focus:outline-none sm:text-4xl"
          />

          <RichTextEditor
            value={initial.content}
            onChange={(content) => patch({ content })}
            onError={showError}
          />

          <Panel title="FAQ block (optional)">
            <p className="mb-4 text-sm text-ink-muted">
              Questions shown under the article. They also add FAQ structured
              data for search engines.
            </p>
            <div className="space-y-4">
              {post.faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-bg/50 p-4">
                  <input
                    className="field"
                    aria-label={`Question ${i + 1}`}
                    placeholder="Question"
                    value={f.q}
                    onChange={(e) => setFaq(i, { q: e.target.value })}
                  />
                  <textarea
                    className="field mt-2"
                    rows={3}
                    aria-label={`Answer ${i + 1}`}
                    placeholder="Answer"
                    value={f.a}
                    onChange={(e) => setFaq(i, { a: e.target.value })}
                  />
                  <button
                    type="button"
                    className="mt-2 text-xs font-semibold text-ink-faint hover:text-coral"
                    onClick={() => patch({ faqs: post.faqs.filter((_, j) => j !== i) })}
                  >
                    Remove question
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-ghost mt-4 px-4 py-2"
              onClick={() => patch({ faqs: [...post.faqs, { q: "", a: "" }] })}
            >
              + Add question
            </button>
          </Panel>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Panel title="Post settings">
            <div className="space-y-4">
              <div>
                <label className="field-label" htmlFor="post-slug">
                  URL slug
                </label>
                <input
                  id="post-slug"
                  className="field"
                  value={post.slug}
                  placeholder="my-post-title"
                  onChange={(e) => {
                    setAutoSlug(false);
                    patch({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") });
                  }}
                  onBlur={() => patch({ slug: slugify(post.slug) })}
                />
                <p className="mt-1.5 break-all text-xs text-ink-faint">
                  /blog/{post.slug || "…"}/
                </p>
              </div>

              <div>
                <label className="field-label flex justify-between" htmlFor="post-excerpt">
                  Excerpt
                  <span className="text-ink-faint">{post.excerpt.length}/160</span>
                </label>
                <textarea
                  id="post-excerpt"
                  rows={3}
                  className="field"
                  value={post.excerpt}
                  placeholder="One or two sentences shown on blog cards and in search results."
                  onChange={(e) => patch({ excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="post-category">
                  Category
                </label>
                <input
                  id="post-category"
                  className="field"
                  list="post-categories"
                  value={post.category}
                  onChange={(e) => patch({ category: e.target.value })}
                />
                <datalist id="post-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="field-label" htmlFor="post-tags">
                  Tags (comma separated)
                </label>
                <input
                  id="post-tags"
                  className="field"
                  value={tagsText}
                  placeholder="photo tips, beginners"
                  onChange={(e) => {
                    setTagsText(e.target.value);
                    patch({
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    });
                  }}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="post-author">
                  Author
                </label>
                <input
                  id="post-author"
                  className="field"
                  value={post.author}
                  onChange={(e) => patch({ author: e.target.value })}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="post-date">
                  Publish date
                </label>
                <input
                  id="post-date"
                  type="date"
                  className="field [color-scheme:dark]"
                  value={post.publishedAt.slice(0, 10)}
                  onChange={(e) =>
                    patch({
                      publishedAt: e.target.value
                        ? new Date(`${e.target.value}T12:00:00Z`).toISOString()
                        : "",
                    })
                  }
                />
                <p className="mt-1.5 text-xs text-ink-faint">
                  {post.updatedAt
                    ? `Last saved ${formatDate(post.updatedAt)}`
                    : "Left empty, it is set when you publish."}
                </p>
              </div>
            </div>
          </Panel>

          <Panel title="Cover image">
            {post.coverImage ? (
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover"
                />
                <div>
                  <label className="field-label" htmlFor="cover-alt">
                    Alt text
                  </label>
                  <input
                    id="cover-alt"
                    className="field"
                    value={post.coverAlt}
                    placeholder="Describe the image"
                    onChange={(e) => patch({ coverAlt: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-ghost flex-1 px-4 py-2"
                    disabled={uploadingCover}
                    onClick={() => coverInput.current?.click()}
                  >
                    {uploadingCover ? "Uploading…" : "Replace"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost px-4 py-2"
                    onClick={() =>
                      patch({ coverImage: "", coverAlt: "", coverWidth: null, coverHeight: null })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={uploadingCover}
                onClick={() => coverInput.current?.click()}
                className="grid aspect-[16/9] w-full place-items-center rounded-2xl border border-dashed border-white/20 bg-bg/50 text-sm font-semibold text-ink-muted transition-colors hover:border-coral/40 hover:text-ink"
              >
                {uploadingCover ? "Uploading…" : "+ Upload cover image"}
              </button>
            )}
            <p className="mt-3 text-xs text-ink-faint">
              Landscape, ideally 1200×630 or larger. Also used when the post is
              shared on social media.
            </p>
            <input
              ref={coverInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              aria-label="Upload cover image"
              onChange={(e) => uploadCover(e.target.files?.[0])}
            />
          </Panel>

          <Panel title="Search engines (SEO)">
            <SeoPanel post={post} onChange={patch} />
          </Panel>

          {savedSlug && (
            <button
              type="button"
              className="w-full rounded-full border border-coral/30 px-4 py-2.5 text-sm font-semibold text-coral transition-colors hover:bg-coral/10"
              onClick={remove}
            >
              Delete this post
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
