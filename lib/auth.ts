// Admin session tokens. Web Crypto only, so this file also runs in
// middleware (Edge runtime). A token is "<expiry>.<HMAC of expiry>".

export const SESSION_COOKIE = "fl_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

/** True once the three admin env vars are set. */
export function adminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET,
  );
}

function signingKey(): Promise<CryptoKey> {
  // The password is part of the key, so changing it signs everyone out.
  const material = `${process.env.SESSION_SECRET}\n${process.env.ADMIN_PASSWORD}`;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(material),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

const toBase64Url = (bytes: ArrayBuffer) =>
  btoa(String.fromCharCode(...Array.from(new Uint8Array(bytes))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

function fromBase64Url(text: string): Uint8Array {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export async function createSessionToken(): Promise<string> {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(expires),
  );
  return `${expires}.${toBase64Url(signature)}`;
}

export async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token || !adminConfigured()) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature || !(Number(expires) > Date.now())) return false;

  try {
    return await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      fromBase64Url(signature),
      encoder.encode(expires),
    );
  } catch {
    return false;
  }
}
