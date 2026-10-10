// Dev-only (see `pageExtensions` in next.config.mjs): saves blog images into
// `public/images/blog/` so they ship with the next static build.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { adminGuard } from "@/lib/admin-guard";
import { slugify } from "@/lib/post-types";

export const dynamic = "force-dynamic";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};
const MAX_BYTES = 8 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "blog");

const fail = (error: string) => Response.json({ error }, { status: 400 });

export async function POST(request: Request) {
  const denied = adminGuard(request);
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
  if (file.size > MAX_BYTES) return fail("Image is larger than 8 MB.");

  const bytes = Buffer.from(await file.arrayBuffer());
  const name = String(form.get("name") || file.name).replace(/\.[^.]+$/, "");
  // Content hash keeps names unique and makes re-uploads idempotent.
  const hash = crypto.createHash("sha1").update(bytes).digest("hex").slice(0, 8);
  const filename = `${slugify(name).slice(0, 60) || "image"}-${hash}.${ext}`;

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), bytes);

  return Response.json({ url: `/images/blog/${filename}` });
}
