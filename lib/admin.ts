// Server-side helpers for the admin API routes (Node runtime).
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, isValidSession } from "./auth";
import { db } from "./db";

const deny = (status: number, error: string) => Response.json({ error }, { status });

/**
 * Gate for every admin API handler. Middleware already blocks signed-out
 * requests; this repeats the check next to the code that writes data, and
 * rejects requests triggered by other websites.
 * Returns an error Response to send back, or null when the request is allowed.
 */
export async function requireAdmin(request: Request): Promise<Response | null> {
  const origin = request.headers.get("origin");
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === request.headers.get("host");
    } catch {}
    if (!sameSite) return deny(403, "Cross-site request blocked.");
  }

  const session = cookies().get(SESSION_COOKIE)?.value;
  if (!(await isValidSession(session))) return deny(401, "Please log in again.");

  return null;
}

const digest = (value: string) => createHash("sha256").update(value).digest();

/** Constant-time check of the submitted login against the env credentials. */
export function credentialsMatch(username: string, password: string): boolean {
  const userOk = timingSafeEqual(digest(username), digest(process.env.ADMIN_USERNAME ?? ""));
  const passOk = timingSafeEqual(digest(password), digest(process.env.ADMIN_PASSWORD ?? ""));
  return userOk && passOk;
}

// ---- login throttling: 8 failed attempts per IP per 15 minutes ----

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

export async function tooManyAttempts(ip: string): Promise<boolean> {
  const client = await db();
  const { rows } = await client.execute({
    sql: "SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND at > ?",
    args: [ip, Date.now() - WINDOW_MS],
  });
  return Number(rows[0]?.n ?? 0) >= MAX_FAILURES;
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  const client = await db();
  await client.batch(
    [
      { sql: "INSERT INTO login_attempts (ip, at) VALUES (?, ?)", args: [ip, Date.now()] },
      { sql: "DELETE FROM login_attempts WHERE at < ?", args: [Date.now() - WINDOW_MS] },
    ],
    "write",
  );
}

export async function clearAttempts(ip: string): Promise<void> {
  const client = await db();
  await client.execute({ sql: "DELETE FROM login_attempts WHERE ip = ?", args: [ip] });
}

/**
 * Rebuilds the blog index and every post page right after a change.
 * sitemap.xml, feed.xml and llms.txt refresh on their own one-minute timer.
 */
export function revalidateBlog(): void {
  revalidatePath("/blog/[[...slug]]", "page");
}
