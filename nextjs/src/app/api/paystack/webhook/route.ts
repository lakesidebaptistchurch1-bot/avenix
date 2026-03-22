import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { dbPool } from "@/lib/db";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";

export const runtime = "nodejs";

/**
 * Paystack webhook endpoint.
 *
 * Legacy equivalent: `lbc_project/backend/paystack_webhook.php`
 *
 * Configure this URL in Paystack dashboard (events: charge.success).
 */
type PaymentRow = RowDataPacket & { donation_id: number | null };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  if (!verifyPaystackWebhookSignature(raw, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(raw) as unknown;
  } catch {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  if (!isRecord(event) || typeof event.event !== "string" || !isRecord(event.data)) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  // We only care about successful charges for donation settlement.
  if (event.event !== "charge.success") {
    return new NextResponse("ok", { status: 200 });
  }

  const reference = typeof event.data.reference === "string" ? event.data.reference.trim() : "";
  if (!reference) {
    return new NextResponse("Missing reference", { status: 400 });
  }

  const paidAmount = typeof event.data.amount === "number" ? event.data.amount / 100 : null;
  const currency = typeof event.data.currency === "string" ? event.data.currency : "GHS";

  // If we sent donationId in metadata, use it; otherwise try to find it from our payments table.
  const metadata = isRecord(event.data.metadata) ? event.data.metadata : null;
  const donationIdFromMetaRaw = metadata?.donation_id;
  const donationIdFromMeta =
    typeof donationIdFromMetaRaw === "number" ? donationIdFromMetaRaw : Number(donationIdFromMetaRaw);
  const donationId = Number.isFinite(donationIdFromMeta) && donationIdFromMeta > 0 ? donationIdFromMeta : null;

  const pool = dbPool();
  const conn = await pool.getConnection();

  try {
    let resolvedDonationId: number | null = donationId;

    if (!resolvedDonationId) {
      const [rows] = await conn.execute<PaymentRow[]>(
        "SELECT donation_id FROM payments WHERE reference = ? LIMIT 1",
        [reference],
      );
      resolvedDonationId = rows[0]?.donation_id ?? null;
    }

    // Upsert payment as successful.
    await conn.execute(
      "INSERT INTO payments (donation_id, method, amount, currency, reference, status, provider, provider_response, created_at) VALUES (?, 'paystack', ?, ?, ?, 'success', 'paystack', ?, NOW()) ON DUPLICATE KEY UPDATE status='success', provider_response=VALUES(provider_response), amount=VALUES(amount), currency=VALUES(currency), donation_id=IFNULL(donation_id, VALUES(donation_id))",
      [resolvedDonationId, paidAmount ?? 0, currency, reference, JSON.stringify(event)],
    );

    if (resolvedDonationId) {
      await conn.execute("UPDATE donations SET status='paid' WHERE id = ?", [resolvedDonationId]);
    }
  } catch {
    // Always return 200 to prevent Paystack retry storms; failures can be reconciled via manual verify.
    return new NextResponse("ok", { status: 200 });
  } finally {
    conn.release();
  }

  return new NextResponse("ok", { status: 200 });
}

