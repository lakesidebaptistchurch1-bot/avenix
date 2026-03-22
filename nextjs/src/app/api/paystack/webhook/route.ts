import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyPaystackWebhookSignature } from "@/lib/paystack";

export const runtime = "nodejs";

/**
 * Paystack webhook endpoint (Supabase version)
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // ✅ Verify Paystack signature
  if (!verifyPaystackWebhookSignature(raw, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: unknown;

  try {
    event = JSON.parse(raw);
  } catch {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  if (!isRecord(event) || typeof event.event !== "string" || !isRecord(event.data)) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  // ✅ Only process successful payments
  if (event.event !== "charge.success") {
    return new NextResponse("ok", { status: 200 });
  }

  const reference =
    typeof event.data.reference === "string" ? event.data.reference.trim() : "";

  if (!reference) {
    return new NextResponse("Missing reference", { status: 400 });
  }

  const paidAmount =
    typeof event.data.amount === "number" ? event.data.amount / 100 : null;

  const currency =
    typeof event.data.currency === "string" ? event.data.currency : "GHS";

  // ✅ Extract donation ID from metadata
  const metadata = isRecord(event.data.metadata) ? event.data.metadata : null;

  const donationIdRaw = metadata?.donation_id;
  const donationId =
    typeof donationIdRaw === "number"
      ? donationIdRaw
      : Number(donationIdRaw);

  let resolvedDonationId: number | null =
    Number.isFinite(donationId) && donationId > 0 ? donationId : null;

  try {
    // ✅ If no donationId, find it from payments table
    if (!resolvedDonationId) {
      const { data } = await supabaseAdmin
        .from("payments")
        .select("donation_id")
        .eq("reference", reference)
        .single();

      resolvedDonationId = data?.donation_id ?? null;
    }

    // ✅ Insert / update payment
    const { error: paymentError } = await supabaseAdmin
      .from("payments")
      .upsert(
        {
          donation_id: resolvedDonationId,
          method: "paystack",
          amount: paidAmount ?? 0,
          currency,
          reference,
          status: "success",
          provider: "paystack",
          provider_response: event,
        },
        { onConflict: "reference" } // 👈 VERY IMPORTANT
      );

    if (paymentError) {
      console.error(paymentError);
      return new NextResponse("ok", { status: 200 });
    }

    // ✅ Update donation status
    if (resolvedDonationId) {
      await supabaseAdmin
        .from("donations")
        .update({ status: "paid" })
        .eq("id", resolvedDonationId);
    }
  } catch (error) {
    console.error(error);

    // Always return 200 to prevent Paystack retry storms
    return new NextResponse("ok", { status: 200 });
  }

  return new NextResponse("ok", { status: 200 });
}