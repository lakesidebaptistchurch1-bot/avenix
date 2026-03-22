import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { hashToken, secureRandomToken } from "@/lib/security";
import { env } from "@/lib/env";

const bodySchema = z.object({
  email: z.string().trim().email().max(180),
});

type UserRow = { id: number; email: string };

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const email = parsed.data.email;

  try {
    const { data: users } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", email)
      .limit(1);

    const user = users?.[0] ?? null;

    // Always succeed to avoid email enumeration
    if (!user) return NextResponse.json({ ok: true });

    // Clear old tokens
    await supabaseAdmin.from("password_resets").delete().eq("user_id", user.id);

    const token = secureRandomToken(32);
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h

    await supabaseAdmin.from("password_resets").insert({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    });

    const base = env.BASE_URL || "http://localhost:3000";
    const resetUrl = `${base}/reset-password?token=${encodeURIComponent(token)}`;

    return NextResponse.json({
      ok: true,
      ...(env.NODE_ENV === "production" ? {} : { resetUrl }),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not generate reset link. Please try again." }, { status: 500 });
  }
}