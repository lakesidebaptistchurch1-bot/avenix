import { NextResponse } from "next/server";
import { z } from "zod";
import type { ResultSetHeader } from "mysql2/promise";
import { dbPool } from "@/lib/db";
import { strongId } from "@/lib/ids";

export const runtime = "nodejs";

/**
 * Contact form submission endpoint.
 *
 * This replaces the legacy `contact.html` form which did not have a real backend action.
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
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { firstName, lastName, email, message } = parsed.data;
  const name = `${firstName} ${lastName}`.trim().slice(0, 120);
  const phone = parsed.data.phone?.trim() || null;
  const publicId = strongId("MSG");

  const pool = dbPool();
  const conn = await pool.getConnection();

  try {
    // Persist the message for follow-up and record-keeping.
    await conn.execute<ResultSetHeader>(
      "INSERT INTO contact_messages (public_id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [publicId, name, email, phone, message],
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not send your message right now. Please try again." },
      { status: 500 },
    );
  } finally {
    conn.release();
  }
}

