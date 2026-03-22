// src/lib/security.ts

import crypto from "crypto";

/**
 * Generate a secure random token
 */
export function secureRandomToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Hash a token (for storing in DB safely)
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}