// Browser-side image prep for the admin: downscale + re-encode before upload so
// a 5 MB phone photo doesn't end up on the live site at full size.

export type UploadedImage = { url: string; width: number; height: number };

type Options = {
  /** Images wider than this are scaled down. */
  maxWidth: number;
  /** JPEG for cover images (works in every social preview), WebP in articles. */
  format: "image/jpeg" | "image/webp";
  /** Used for the file name, e.g. the post title. */
  name?: string;
};

const QUALITY = 0.82;

async function encode(file: File, { maxWidth, format }: Options) {
  const bitmap = await createImageBitmap(file);

  // Animated GIFs would lose their animation on a canvas — upload as-is.
  if (file.type === "image/gif") {
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return { blob: file as Blob, ...size };
  }

  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the image in this browser.");

  if (format === "image/jpeg") {
    // JPEG has no transparency; use the site background instead of black.
    ctx.fillStyle = "#0E0D12";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, format, QUALITY),
  );
  if (!blob) throw new Error("Could not process the image in this browser.");

  return { blob, width, height };
}

export async function uploadImage(file: File, options: Options): Promise<UploadedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("That file is not an image.");
  }

  const { blob, width, height } = await encode(file, options);

  const form = new FormData();
  form.append("file", blob, file.name);
  form.append("name", options.name || file.name);

  const res = await fetch("/api/admin/upload/", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");

  return { url: data.url as string, width, height };
}
