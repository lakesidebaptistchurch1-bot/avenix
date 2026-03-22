import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { strongId } from "@/lib/ids";

export const runtime = "nodejs";

/**
 * Contact form submission endpoint (Supabase version)
 */

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);

  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, message } = parsed.data;

  const name = `${firstName} ${lastName}`.trim().slice(0, 120);
  const phone = parsed.data.phone?.trim() || null;
  const publicId = strongId("MSG");

  try {
    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([
        {
          public_id: publicId,
          name,
          email,
          phone,
          message,
        },
      ]);

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          ok: false,
          error: "We could not send your message right now. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: "We could not send your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}