import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth/session";
import { setCheckoutDonationId } from "@/lib/checkout";

const bodySchema = z.object({
  amount: z.number().positive(),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().email().max(180),
  note: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, requiresLogin: true });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { amount, firstName, lastName, email, note } = parsed.data;
  const name = `${firstName} ${lastName}`.trim();

  try {
    const { data: newDonation, error: insertError } = await supabaseAdmin
      .from("donations")
      .insert({
        user_id: user.id,
        name,
        email,
        note: note || null,
        amount,
        currency: "GHS",
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError) throw insertError;

    await setCheckoutDonationId(newDonation.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[DONATION_INITIATE] Error:", {
      message: err.message,
      code: err.code,
      details: err.details,
      hint: err.hint,
      fullError: JSON.stringify(err, null, 2),
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to start donation",
        debug: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}