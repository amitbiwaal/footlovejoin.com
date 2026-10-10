// Blog image uploads. On Vercel they go to the Blob store; without a Blob
// token (plain `npm run dev`) they are written to `public/images/blog/`.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/admin";
import { slugify } from "@/lib/post-types";

export const dynamic = "force-dynamic";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};
// Vercel rejects request bodies over 4.5 MB before they reach this function.
const MAX_BYTES = 4 * 1024 * 1024;
const LOCAL_DIR = path.join(process.cwd(), "public", "images", "blog");

const fail = (error: string, status = 400) => Response.json({ error }, { status });

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Expected a file upload.");
  }

  const file = form.get("file");
  if (!(file instanceof File)) return fail("No file received.");

  const ext = EXTENSIONS[file.type];
  if (!ext) return fail("Use a JPG, PNG, WebP, GIF or AVIF image.");
  if (file.size > MAX_BYTES) return fail("Image is larger than 4 MB.", 413);

  const bytes = Buffer.from(await file.arrayBuffer());
  const name = String(form.get("name") || file.name).replace(/\.[^.]+$/, "");
  // Content hash keeps names unique and makes re-uploads idempotent.
  const hash = crypto.createHash("sha1").update(bytes).digest("hex").slice(0, 8);
  const filename = `${slugify(name).slice(0, 60) || "image"}-${hash}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`blog/${filename}`, bytes, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      allowOverwrite: true, // same name means same bytes
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return Response.json({ url: blob.url });
  }

  if (process.env.VERCEL) {
    // The deployed filesystem is read-only; without Blob there is nowhere to save.
    return fail("Image storage is not connected (BLOB_READ_WRITE_TOKEN is missing).", 500);
  }

  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOCAL_DIR, filename), bytes);
  return Response.json({ url: `/images/blog/${filename}` });
}
