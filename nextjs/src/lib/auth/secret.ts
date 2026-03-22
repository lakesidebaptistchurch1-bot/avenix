import { env } from "@/lib/env";

/**
 * Shared secret used to sign/verify JWTs (session + short-lived checkout tokens).
 *
 * Notes:
 * - In production you should set `AUTH_SECRET` to a long, random value.
 * - We fall back to DB_PASS to keep local setup minimal, but it is not ideal for real deployments.
 */
export function jwtSecretKey(): Uint8Array {
  const raw = process.env.AUTH_SECRET || env.DB_PASS || "dev-secret-change-me";
  return new TextEncoder().encode(raw);
}

