// Turns the HTML saved by the admin editor into what the blog page renders:
// heading anchors + table of contents, safe/SEO-correct links, lazy images.
import { SITE } from "./site";
import { slugify } from "./post-types";
import { AFFILIATE_URL } from "@/components/affiliate";

export type TocItem = { id: string; text: string; level: 2 | 3 };

export type RenderedPost = {
  html: string;
  toc: TocItem[];
  wordCount: number;
  readingMinutes: number;
};

const SITE_HOST = new URL(SITE.url).host;
const AFFILIATE_HOST = new URL(AFFILIATE_URL).host;

const stripTags = (html: string) => html.replace(/<[^>]*>/g, " ");

const decodeEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/** Plain text of an HTML fragment (for excerpts, word counts, schema). */
export function htmlToText(html: string): string {
  return decodeEntities(stripTags(html)).replace(/\s+/g, " ").trim();
}

/** The editor only emits a small schema, but never trust stored markup. */
function sanitize(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)\b[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}

/** Blank lines left in the editor would otherwise render as empty gaps. */
const dropEmptyParagraphs = (html: string) =>
  html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, "");

function addHeadingAnchors(html: string, toc: TocItem[]): string {
  const used = new Set<string>();

  return html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (match, level: string, attrs: string = "", inner: string) => {
      const text = htmlToText(inner);
      if (!text) return match;

      const base = slugify(text) || "section";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);

      toc.push({ id, text, level: Number(level) as 2 | 3 });
      const rest = attrs.replace(/\sid="[^"]*"/, "");
      return `<h${level}${rest} id="${id}">${inner}</h${level}>`;
    },
  );
}

/** External links open in a new tab; affiliate links get rel="sponsored". */
function fixLinks(html: string): string {
  return html.replace(/<a\s([^>]*)>/g, (match, attrs: string) => {
    const href = /href="([^"]*)"/.exec(attrs)?.[1];
    if (!href) return match;

    const rest = attrs.replace(/\s?(rel|target)="[^"]*"/g, "").trim();

    let host = "";
    try {
      if (/^https?:\/\//i.test(href)) host = new URL(href).host;
    } catch {
      return match;
    }

    if (!host || host === SITE_HOST) return `<a ${rest}>`;
    const rel = host === AFFILIATE_HOST ? "sponsored noopener" : "noopener";
    return `<a ${rest} target="_blank" rel="${rel}">`;
  });
}

function lazyImages(html: string): string {
  return html.replace(/<img\s([^>]*?)\s*\/?>/g, (_match, attrs: string) => {
    const rest = attrs.replace(/\s?(loading|decoding)="[^"]*"/g, "").trim();
    return `<img ${rest} loading="lazy" decoding="async">`;
  });
}

export function renderPostHtml(source: string): RenderedPost {
  const toc: TocItem[] = [];
  const html = lazyImages(
    fixLinks(addHeadingAnchors(dropEmptyParagraphs(sanitize(source)), toc)),
  );

  const text = htmlToText(html);
  const wordCount = text ? text.split(" ").length : 0;

  return {
    html,
    toc,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
  };
}
