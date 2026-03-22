import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth/password";
import { hashToken } from "@/lib/security";

const bodySchema = z.object({
  token: z.string().trim().min(10).max(200),
  password: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

type ResetRow = {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: string;
};

function isExpired(expiresAt: string): boolean {
  const d = new Date(expiresAt);
  return Number.isNaN(d.getTime()) || d.getTime() < Date.now();
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { token, password, confirmPassword } = parsed.data;
  if (password !== confirmPassword) {
    return NextResponse.json({ ok: false, error: "Passwords do not match." }, { status: 400 });
  }

  const tokenHash = hashToken(token);

  try {
    const { data: rows } = await supabaseAdmin
      .from("password_resets")
      .select("id, user_id, token_hash, expires_at")
      .eq("token_hash", tokenHash)
      .limit(1);

    const reset = rows?.[0] ?? null;
    if (!reset || isExpired(reset.expires_at)) {
      if (reset?.id) await supabaseAdmin.from("password_resets").delete().eq("id", reset.id);
      return NextResponse.json({ ok: false, error: "Reset link is invalid or expired." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    await supabaseAdmin
      .from("users")
      .update({ password_hash: passwordHash })
      .eq("id", reset.user_id);

    await supabaseAdmin.from("password_resets").delete().eq("id", reset.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Password reset failed. Please try again." }, { status: 500 });
  }
}