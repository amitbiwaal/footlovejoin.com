# FootLove — Website

Landing page, guide, blog and blog admin for footlovejoin.com. Built with
**Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**, hosted on **Vercel**.

- Blog posts are stored in a **Turso** (SQLite) database.
- Blog images are stored in **Vercel Blob**.
- Pages are served as static HTML and rebuilt automatically when a post changes.

---

## 🚀 Deploying

The Vercel project `footlovejoin` is connected to this GitHub repository:
**every push to `main` deploys to production.** There is nothing to upload by hand.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Set by | Purpose |
| --- | --- | --- |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Turso integration | Blog database |
| `BLOB_READ_WRITE_TOKEN` | Blob store | Blog image uploads |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | you | Admin login |
| `SESSION_SECRET` | you | Signs the admin session cookie |
| `SITE_NOINDEX` | you | `1` = keep the whole site out of search engines (noindex) |

Changing `ADMIN_PASSWORD` (then redeploying) signs everyone out.

**Search visibility:** while `SITE_NOINDEX=1` is set, every page carries a
`noindex` tag and header, so the site will not appear in Google. To make the site
searchable, delete that variable (or set it to `0`) and redeploy.

---

## 📝 Writing blog posts

1. Open **`/admin/`** on the live site and sign in.
2. **+ New post** → write, add images, fill in the SEO box.
3. **Publish** — the post is live within a few seconds. **Save draft** keeps it
   private; **Preview** shows a draft exactly as visitors would see it.

No deploy is needed for content. The blog page updates immediately; `sitemap.xml`,
`feed.xml` (RSS) and `llms.txt` pick up changes within about a minute.

---

## 💻 Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

Create a `.env.local` with `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `SESSION_SECRET` to
use the admin locally. Without the `TURSO_*` and `BLOB_*` variables, local development
uses a throwaway SQLite file (`.data/local.db`) and saves uploads to
`public/images/blog/`, so it can never change the live site's content.
(`vercel env pull` would point local development at the live database instead.)

---

## 🎨 Change the colors

All brand colors live in **`tailwind.config.ts`**:

- `colors.coral`, `colors.rose`, `colors.bg`, `colors.ink` — the palette
- `backgroundImage["brand-gradient"]` — the main coral → rose-gold gradient

Change those values and the whole site re-themes. The page background glow is in
**`app/globals.css`** (the `body` `background-image`).

---

## 📁 Project structure

```
app/
  layout.tsx              # <html> shell, default SEO metadata, Organization schema
  page.tsx                # the landing page (assembles all sections)
  how-to-sell-feet-pics/  # the long-form guide
  blog/[[...slug]]/       # /blog/ and /blog/<slug>/
  about/ contact/ privacy-policy/ terms/ affiliate-disclosure/ 2257-compliance/
  admin/                  # blog admin, login, draft preview
  api/admin/              # login, posts and image-upload endpoints
  not-found.tsx           # custom 404
  sitemap.ts robots.ts feed.xml/ llms.txt/
  globals.css             # base styles + design-system classes
components/
  Header.tsx Footer.tsx   # nav (links come from lib/site.ts)
  Hero.tsx … Faq.tsx      # landing-page sections
  guide/                  # sections of the guide page
  blog/                   # blog index, post layout, post card
  admin/                  # editor UI (TipTap), login form
  PageShell.tsx           # layout for About / Contact / legal pages
  Icons.tsx               # inline SVG icons (no external library)
lib/
  site.ts                 # site URL, contact email, nav + footer links
  seo.ts                  # per-page metadata + JSON-LD helpers
  db.ts posts.ts          # Turso connection + blog storage
  auth.ts admin.ts        # admin sessions, login throttling
  post-html.ts            # turns editor HTML into the rendered article
middleware.ts             # keeps /admin and /api/admin behind the login
tailwind.config.ts        # colors, gradient, animations
next.config.mjs           # trailing slashes, noindex headers
```
