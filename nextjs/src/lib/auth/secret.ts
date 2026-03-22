import { env } from "@/lib/env";

export function jwtSecretKey(): Uint8Array {
  const raw = env.AUTH_SECRET;
  return new TextEncoder().encode(raw);
}