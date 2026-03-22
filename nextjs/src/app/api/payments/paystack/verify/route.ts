import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth/session";
import { clearCheckoutDonationId, getCheckoutDonationId } from "@/lib/checkout";
import { verifyPaystack } from "@/lib/paystack";

const bodySchema = z.object({ reference: z.string().trim().min(5).max(120) });

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false, error: "Please sign in first." }, { status: 401 });

  const donationId = await getCheckoutDonationId();
  if (!donationId) return NextResponse.json({ ok: false, error: "Donation session missing." }, { status: 400 });

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });

  const reference = parsed.data.reference;

  try {
    const { data: donation } = await supabaseAdmin
      .from("donations")
      .select("id, user_id, name, email, note, amount, currency, status")
      .eq("id", donationId)
      .single();

    if (!donation || donation.status !== "pending") {
      await clearCheckoutDonationId();
      return NextResponse.json({ ok: false, error: "Donation not found or already processed." }, { status: 400 });
    }

    const verify = await verifyPaystack(reference);
    if (!verify.ok) {
      await supabaseAdmin.from("payments").upsert({
        donation_id: donation.id,
        method: "paystack",
        amount: Number(donation.amount),
        currency: donation.currency,
        reference,
        status: "failed",
        provider: "paystack",
        provider_response: verify.raw,
      }, { onConflict: "reference" });

      return NextResponse.json({ ok: false, error: verify.message }, { status: 400 });
    }

    // Success
    await supabaseAdmin.from("payments").upsert({
      donation_id: donation.id,
      method: "paystack",
      amount: verify.paidAmount,
      currency: donation.currency,
      reference,
      status: "success",
      provider: "paystack",
      provider_response: verify.raw,
    }, { onConflict: "reference" });

    await supabaseAdmin
      .from("donations")
      .update({ status: "paid" })
      .eq("id", donation.id);

    await clearCheckoutDonationId();

    return NextResponse.json({ ok: true, redirectUrl: `/thank-you?ref=${encodeURIComponent(reference)}` });
  } catch (err: any) {
    console.error("Verify error:", err);
    return NextResponse.json({ ok: false, error: "Payment verification failed." }, { status: 500 });
  }
}