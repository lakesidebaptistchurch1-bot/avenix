// app/api/payments/charge-momo/route.ts
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

const PAYSTACK_SECRET = env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const { donationId, phone, provider, email, amount } = await req.json();

    // Validate donationId, amount, etc. (reuse your logic)

    const res = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        currency: "GHS",
        mobile_money: { phone, provider }, // "mtn" | "vod" | "atl"
        reference: `don_${donationId}_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    // data.data.status is usually "pay_offline" for MoMo
    // Show user: data.data.display_text (e.g. "Approve payment on your phone")

    // Save pending charge reference to DB
    // Wait for webhook or poll /transaction/verify/:reference

    return NextResponse.json({
      ok: true,
      message: "Payment initiated – check your phone",
      display_text: data.data.display_text,
      reference: data.data.reference,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}