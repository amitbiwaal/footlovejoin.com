# FootLove — Website

The #1 feet-selling website & app landing page. Built with **Next.js 14 (App Router)**,
**TypeScript** and **Tailwind CSS**, exported as a **static site** (no database, no server) —
perfect for hosting on Hostinger.

---

## 🚀 Quick start

```bash
npm install       # install dependencies (first time only)
npm run dev       # start local dev server → http://localhost:3000
npm run build     # build the static site → generates the `out/` folder
```

That's it. `npm run build` produces a plain HTML/CSS/JS site inside **`out/`**.

---

## 🌐 Deploy to Hostinger

1. Run `npm run build` — this creates the **`out/`** folder.
2. Open Hostinger → **File Manager** (or FTP).
3. Upload **everything inside `out/`** into your `public_html` folder.
4. Visit your domain — done. ✅

> Alternatively, use Hostinger's **"Node.js web app"** option and push from GitHub /
> your IDE. For a pure landing page the static upload above is the simplest & cheapest.

> ⚠️ **Adult content note:** confirm Hostinger's Terms of Service allow adult content
> before going live. If not, the exact same `out/` files can be hosted on any
> adult-friendly host or VPS — the code doesn't change.

---

## 🎨 Change the colors

All brand colors live in **`tailwind.config.ts`**:

- `colors.coral`, `colors.rose`, `colors.bg`, `colors.ink` — the palette
- `backgroundImage["brand-gradient"]` — the main coral → rose-gold gradient

Change those values and the whole site re-themes. The page background glow is in
**`app/globals.css`** (the `body` `background-image`).

---

## 🖼️ Swap in real photos

The gallery currently uses stylish "locked preview" tiles (no real images needed).
To use real photos:

1. Drop images into a **`public/images/`** folder.
2. In `components/Gallery.tsx`, replace the gradient `<div>` inside `GalleryTile`
   with an `<img src="/images/your-photo.jpg" />`.

---

## 📝 Writing blog posts (local admin)

The blog has its own editor. It runs **only on your computer** — it is not part of
the live site, so there is no public login page to protect.

1. `npm run dev`, then open **http://localhost:3000/admin/**
2. **+ New post** → write, add images, fill in the SEO box → **Publish**
   (or **Save draft** — drafts can be previewed locally but never go live).
3. Stop the dev server (Ctrl+C), run `npm run build`, and upload `out/` as usual.

Where things are stored:

- Posts → `content/blog/<slug>.json` (one file per post)
- Uploaded images → `public/images/blog/` (resized and compressed automatically)

Publishing a post also updates `sitemap.xml`, `feed.xml` (RSS) and `llms.txt`
automatically on the next build.

---

## 📁 Project structure

```
app/
  layout.tsx              # <html> shell, default SEO metadata, Organization schema
  page.tsx                # the landing page (assembles all sections)
  how-to-sell-feet-pics/  # the long-form guide
  blog/[[...slug]]/       # /blog/ and /blog/<slug>/
  about/ contact/ privacy-policy/ terms/ affiliate-disclosure/ 2257-compliance/
  not-found.tsx           # custom 404
  sitemap.ts robots.ts feed.xml/ llms.txt/   # generated at build time
  admin/ api/admin/       # local blog admin (*.admin.tsx — dev only, never exported)
  globals.css             # base styles + design-system classes
components/
  Header.tsx Footer.tsx   # nav (links come from lib/site.ts)
  Hero.tsx … Faq.tsx      # landing-page sections
  guide/                  # sections of the guide page
  blog/                   # blog index, post layout, post card
  admin/                  # editor UI (TipTap)
  PageShell.tsx           # layout for About / Contact / legal pages
  Icons.tsx               # inline SVG icons (no external library)
lib/
  site.ts                 # site URL, contact email, nav + footer links
  seo.ts                  # per-page metadata + JSON-LD helpers
  posts.ts post-html.ts   # blog storage + HTML rendering
content/blog/             # blog posts (JSON)
tailwind.config.ts        # colors, gradient, animations
next.config.mjs           # static export config
```
