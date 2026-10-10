"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { Footprint, Lock } from "../Icons";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not log in.");
      // Full navigation so the new session cookie is sent with the request.
      window.location.assign("/admin/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in.");
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <form onSubmit={submit} className="card w-full max-w-sm p-6 sm:p-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow">
            <Footprint className="h-5 w-5 text-[#2a0f0a]" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            {SITE.name} <span className="text-gradient">Admin</span>
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage the blog posts on {new URL(SITE.url).host}.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              className="field"
              autoComplete="username"
              autoCapitalize="none"
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="field"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-coral/40 bg-coral/10 px-3.5 py-2.5 text-sm font-medium text-coral-soft">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-50">
          <Lock className="h-4 w-4" />
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
