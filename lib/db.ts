// Turso (libSQL) connection. On Vercel the Turso integration provides
// TURSO_DATABASE_URL / TURSO_AUTH_TOKEN; without them (plain `npm run dev`)
// a local SQLite file is used, so development never touches live data.
import fs from "node:fs";
import { createClient, type Client } from "@libsql/client";

const LOCAL_DB = ".data/local.db";

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS posts (
     slug         TEXT PRIMARY KEY,
     title        TEXT NOT NULL,
     status       TEXT NOT NULL DEFAULT 'draft',
     published_at TEXT NOT NULL DEFAULT '',
     updated_at   TEXT NOT NULL DEFAULT '',
     data         TEXT NOT NULL
   )`,
  `CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status, published_at)`,
  `CREATE TABLE IF NOT EXISTS login_attempts (
     ip TEXT NOT NULL,
     at INTEGER NOT NULL
   )`,
  `CREATE INDEX IF NOT EXISTS login_attempts_ip_idx ON login_attempts (ip, at)`,
];

let client: Client | undefined;
let ready: Promise<void> | undefined;

function connect(): Client {
  const remote = process.env.TURSO_DATABASE_URL;
  if (!remote) {
    fs.mkdirSync(".data", { recursive: true });
    return createClient({ url: `file:${LOCAL_DB}` });
  }

  return createClient({
    // Plain HTTPS instead of a WebSocket: serverless functions get frozen
    // between requests, which leaves long-lived sockets dead.
    url: remote.replace(/^libsql:/, "https:"),
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

/** The shared client, with the tables created on first use. */
export async function db(): Promise<Client> {
  client ??= connect();
  ready ??= client
    .batch(SCHEMA, "write")
    .then(() => undefined)
    .catch((error) => {
      ready = undefined; // retry on the next call instead of failing forever
      throw error;
    });
  await ready;
  return client;
}
