// The blog admin API can write files, so it only answers the local dev server:
// never in a production build, never for another machine on the network, and
// never for a request triggered by some other website open in the browser.
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

const deny = (status: number, error: string) =>
  Response.json({ error }, { status });

/** Returns an error Response to send back, or null when the request is allowed. */
export function adminGuard(request: Request): Response | null {
  if (process.env.NODE_ENV !== "development") return deny(404, "Not found");

  const host = request.headers.get("host") ?? "";
  if (!LOCAL_HOSTS.has(host.replace(/:\d+$/, ""))) {
    return deny(403, "The admin only works on http://localhost.");
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return deny(403, "Cross-site request blocked.");
    } catch {
      return deny(403, "Cross-site request blocked.");
    }
  }

  return null;
}
