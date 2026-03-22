import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth/password";
import { setSession } from "@/lib/auth/session";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  password: z.string().min(8).max(64),
  confirmPassword: z.string().min(8).max(64),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }
  const { name, email, password, confirmPassword } = parsed.data;
  if (password !== confirmPassword) {
    return NextResponse.json({ ok: false, error: "Passwords do not match." }, { status: 400 });
  }

  try {
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (checkError) throw checkError;

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "Email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("users")
      .insert({ name, email, password_hash: passwordHash })
      .select("id")
      .single();

    if (insertError) throw insertError;

    await setSession({ id: Number(newUser.id), name, email });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[REGISTER] Supabase error:", {
      message: err.message,
      code: err.code,
      details: err.details,
      hint: err.hint,
      fullError: JSON.stringify(err, null, 2),
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Registration failed",
        // In development show more info – remove in production
        debug: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}