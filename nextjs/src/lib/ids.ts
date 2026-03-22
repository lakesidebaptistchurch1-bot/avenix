import { createId } from "@paralleldrive/cuid2";

/**
 * Strong, collision-resistant IDs for external references (e.g. Paystack ref).
 *
 * Why:
 * - Avoid predictable `Date.now()` references.
 * - Safe to use in URLs and logs.
 */
export function strongId(prefix?: string): string {
  const id = createId();
  return prefix ? `${prefix}_${id}` : id;
}

