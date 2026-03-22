import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyPassword } from "@/lib/auth/password";
import { setSession } from "@/lib/auth/session";

const bodySchema = z.object({
  email: z.string().trim().email().max(180),
  password: z.string().min(1).max(64),
});

type UserRow = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
};

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  try {
    const { data: rows, error } = await supabaseAdmin
      .from("users")
      .select("id, name, email, password_hash")
      .eq("email", email)
      .limit(1);

    if (error) throw error;
    const user = rows?.[0];
    if (!user) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    await setSession({ id: Number(user.id), name: String(user.name), email: String(user.email) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Login failed. Please try again." }, { status: 500 });
  }
}