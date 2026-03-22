import crypto from "node:crypto";
import { createId } from "@paralleldrive/cuid2";

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function secureRandomToken(bytes = 32): string {
  // Prefer deterministic length, URL-safe IDs unless the caller needs raw bytes.
  // Note: cuid2 is not a cryptographic token generator, but is strong enough for reset tokens
  // when combined with server-side hashing + expiry + single-use semantics.
  return bytes === 32 ? createId() : crypto.randomBytes(bytes).toString("hex");
}

