import crypto from "node:crypto";
import { env } from "@/lib/env";

type PaystackVerifyOk = {
  ok: true;
  paidAmount: number;
  currency: string;
  raw: unknown;
};

type PaystackVerifyErr = {
  ok: false;
  message: string;
  raw?: unknown;
};

/**
 * Verify a Paystack transaction by reference.
 *
 * Legacy equivalent: `verify_paystack()` in `lbc_project/backend/process_payment.php`
 */
export async function verifyPaystack(reference: string): Promise<PaystackVerifyOk | PaystackVerifyErr> {
  if (!env.PAYSTACK_SECRET_KEY) {
    return { ok: false, message: "Paystack secret key is not configured." };
  }

  const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      Accept: "application/json",
    },
  });

  const rawText = await res.text().catch(() => "");
  let payload: unknown = rawText;
  try {
    payload = rawText ? (JSON.parse(rawText) as unknown) : null;
  } catch {
    // Keep raw text for debugging if Paystack returns non-JSON.
  }

  if (!res.ok) {
    return { ok: false, message: `Paystack verification failed: HTTP ${res.status}`, raw: payload };
  }

  const p = payload as {
    status?: boolean;
    message?: string;
    data?: { status?: string; amount?: number; currency?: string };
  } | null;

  const data = p?.data;
  if (!p?.status || !data) {
    return { ok: false, message: "Paystack response invalid.", raw: payload };
  }

  if (data.status !== "success") {
    return { ok: false, message: "Paystack payment not successful.", raw: payload };
  }

  const paidAmount = typeof data.amount === "number" ? data.amount / 100 : NaN;
  const currency = typeof data.currency === "string" ? data.currency : "GHS";

  if (!Number.isFinite(paidAmount) || paidAmount <= 0) {
    return { ok: false, message: "Paystack response missing amount.", raw: payload };
  }

  return { ok: true, paidAmount, currency, raw: payload };
}

/**
 * Validate Paystack webhook signature.
 *
 * Legacy equivalent: signature check in `lbc_project/backend/paystack_webhook.php`
 */
export function verifyPaystackWebhookSignature(rawBody: string, signature: string): boolean {
  if (!env.PAYSTACK_SECRET_KEY || !signature) return false;
  const computed = crypto.createHmac("sha512", env.PAYSTACK_SECRET_KEY).update(rawBody).digest("hex");
  try {
    // Paystack sends a hex-encoded HMAC signature.
    return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

