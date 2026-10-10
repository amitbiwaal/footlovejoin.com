import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  adminConfigured,
  createSessionToken,
} from "@/lib/auth";
import {
  clearAttempts,
  clientIp,
  credentialsMatch,
  recordFailedAttempt,
  tooManyAttempts,
} from "@/lib/admin";

export const dynamic = "force-dynamic";

const fail = (status: number, error: string) => Response.json({ error }, { status });

/** Log in: `{ username, password }` -> session cookie. */
export async function POST(request: Request) {
  if (!adminConfigured()) {
    return fail(
      503,
      "Admin login is not set up. Add ADMIN_USERNAME, ADMIN_PASSWORD and SESSION_SECRET to the environment variables.",
    );
  }

  const ip = clientIp(request);
  if (await tooManyAttempts(ip)) {
    return fail(429, "Too many failed attempts. Try again in 15 minutes.");
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!credentialsMatch(username, password)) {
    await recordFailedAttempt(ip);
    return fail(401, "Wrong username or password.");
  }

  await clearAttempts(ip);
  cookies().set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return Response.json({ ok: true });
}

/** Log out. */
export function DELETE() {
  cookies().delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
