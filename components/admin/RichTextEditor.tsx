"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { AFFILIATE_URL } from "../affiliate";
import { uploadImage } from "./image-upload";
import "./editor.css";

// Keep intrinsic size on <img> so article images don't shift the layout.
const SizedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
    };
  },
});

type Props = {
  value: string;
  onChange: (html: string) => void;
  onError: (message: string) => void;
};

function ToolButton({
  title,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      // Don't steal the text selection from the editor.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`min-w-9 rounded-lg px-2.5 py-1.5 text-sm font-semibold transition-colors disabled:opacity-40 ${
        active
          ? "bg-brand-gradient text-[#1a0d0a]"
          : "text-ink-muted hover:bg-white/10 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-6 w-px bg-white/10" aria-hidden="true" />;

function Toolbar({
  editor,
  onLink,
  onImage,
  uploading,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
  uploading: boolean;
}) {
  const chain = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-0.5">
      <ToolButton
        title="Heading 2 (main section)"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => chain().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolButton>
      <ToolButton
        title="Heading 3 (sub-section)"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => chain().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolButton>
      <ToolButton
        title="Heading 4"
        active={editor.isActive("heading", { level: 4 })}
        onClick={() => chain().toggleHeading({ level: 4 }).run()}
      >
        H4
      </ToolButton>
      <Divider />
      <ToolButton
        title="Bold (Ctrl+B)"
        active={editor.isActive("bold")}
        onClick={() => chain().toggleBold().run()}
      >
        <span className="font-black">B</span>
      </ToolButton>
      <ToolButton
        title="Italic (Ctrl+I)"
        active={editor.isActive("italic")}
        onClick={() => chain().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </ToolButton>
      <ToolButton
        title="Underline (Ctrl+U)"
        active={editor.isActive("underline")}
        onClick={() => chain().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolButton>
      <ToolButton
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => chain().toggleStrike().run()}
      >
        <span className="line-through">S</span>
      </ToolButton>
      <Divider />
      <ToolButton
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => chain().toggleBulletList().run()}
      >
        • List
      </ToolButton>
      <ToolButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => chain().toggleOrderedList().run()}
      >
        1. List
      </ToolButton>
      <ToolButton
        title="Quote / callout"
        active={editor.isActive("blockquote")}
        onClick={() => chain().toggleBlockquote().run()}
      >
        Quote
      </ToolButton>
      <Divider />
      <ToolButton title="Add or edit link" active={editor.isActive("link")} onClick={onLink}>
        Link
      </ToolButton>
      <ToolButton title="Insert image" disabled={uploading} onClick={onImage}>
        {uploading ? "Uploading…" : "Image"}
      </ToolButton>
      <ToolButton title="Divider line" onClick={() => chain().setHorizontalRule().run()}>
        ―
      </ToolButton>
      <Divider />
      <ToolButton
        title="Undo (Ctrl+Z)"
        disabled={!editor.can().undo()}
        onClick={() => chain().undo().run()}
      >
        Undo
      </ToolButton>
      <ToolButton
        title="Redo (Ctrl+Y)"
        disabled={!editor.can().redo()}
        onClick={() => chain().redo().run()}
      >
        Redo
      </ToolButton>
    </div>
  );
}

export default function RichTextEditor({ value, onChange, onError }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState<string | null>(null); // null = link bar closed
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      // The post title is the page's H1, so body headings start at H2.
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      // rel/target are decided at render time (lib/post-html.ts), not stored.
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: null, target: null },
      }),
      SizedImage,
      Placeholder.configure({ placeholder: "Start writing your article…" }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "prose-article", "aria-label": "Article content" },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return <div className="card min-h-[28rem] animate-pulse" />;
  }

  const applyLink = (href: string) => {
    const url = href.trim();
    setLinkUrl(null);

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (editor.state.selection.empty && !editor.isActive("link")) {
      // Nothing selected: insert the link as new text.
      const text = url === AFFILIATE_URL ? "Start selling feet pics" : url;
      editor
        .chain()
        .focus()
        .insertContent({ type: "text", text, marks: [{ type: "link", attrs: { href: url } }] })
        .run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertImage = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const { url, width, height } = await uploadImage(file, {
        maxWidth: 1600,
        format: "image/webp",
      });
      editor
        .chain()
        .focus()
        .insertContent({ type: "image", attrs: { src: url, alt: "", width, height } })
        .run();

      // An image at the very end leaves nowhere to keep typing — add a line.
      const { doc } = editor.state;
      if (doc.lastChild?.type.name === "image") {
        editor
          .chain()
          .insertContentAt(doc.content.size, { type: "paragraph" })
          .focus("end")
          .run();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const imageSelected = editor.isActive("image");

  return (
    // No overflow-hidden here: it would stop the toolbar sticking to the viewport.
    <div className="card">
      <div className="sticky top-14 z-20 rounded-t-3xl border-b border-white/10 bg-bg-card/95 p-2 backdrop-blur-md">
        <Toolbar
          editor={editor}
          uploading={uploading}
          onLink={() =>
            setLinkUrl(linkUrl === null ? editor.getAttributes("link").href ?? "" : null)
          }
          onImage={() => fileInput.current?.click()}
        />

        {linkUrl !== null && (
          <form
            className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/10 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              applyLink(linkUrl);
            }}
          >
            <input
              autoFocus
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://…  or  /how-to-sell-feet-pics/"
              aria-label="Link URL"
              className="field min-w-0 flex-1 basis-56"
            />
            <button type="submit" className="btn-primary px-4 py-2">
              Apply
            </button>
            <button
              type="button"
              className="btn-ghost px-4 py-2"
              title="Use the sign-up (affiliate) link"
              onClick={() => applyLink(AFFILIATE_URL)}
            >
              Sign-up link
            </button>
            {editor.isActive("link") && (
              <button type="button" className="btn-ghost px-4 py-2" onClick={() => applyLink("")}>
                Remove
              </button>
            )}
          </form>
        )}

        {imageSelected && (
          <label className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/10 pt-2 text-sm text-ink-muted">
            <span className="font-semibold">Image alt text</span>
            <input
              type="text"
              value={editor.getAttributes("image").alt ?? ""}
              onChange={(e) =>
                editor.chain().updateAttributes("image", { alt: e.target.value }).run()
              }
              placeholder="Describe the image for search engines and screen readers"
              className="field min-w-0 flex-1 basis-56"
            />
          </label>
        )}
      </div>

      <div className="p-5 sm:p-8">
        <EditorContent editor={editor} />
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        aria-label="Upload article image"
        onChange={(e) => insertImage(e.target.files?.[0])}
      />
    </div>
  );
}
