import { NextResponse } from "next/server";
import { z } from "zod";
import type { ResultSetHeader } from "mysql2/promise";
import { dbPool } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { setCheckoutDonationId } from "@/lib/checkout";

export const runtime = "nodejs";

/**
 * Create a pending donation and start the checkout flow.
 *
 * This replaces:
 * - `lbc_project/backend/initiate_donation.php`
 * - the PHP session variables used to pass donation info to `payment.php`
 */
const bodySchema = z.object({
  amount: z.coerce.number().positive().max(1_000_000),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(180),
  note: z.string().trim().max(255).optional().or(z.literal("")),
});

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v : "";
}

/**
 * Support both:
 * - JSON payloads from the Next.js UI
 * - legacy HTML form posts (`backend/initiate_donation.php` rewrite)
 */
async function readInput(req: Request): Promise<unknown> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    return await req.json().catch(() => null);
  }

  // For legacy `<form method="POST">` submissions.
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const fd = await req.formData().catch(() => null);
    if (!fd) return null;

    return {
      amount: str(fd.get("amount")) || str(fd.get("custom_amount")),
      firstName: str(fd.get("firstName")) || str(fd.get("fname")),
      lastName: str(fd.get("lastName")) || str(fd.get("lname")),
      email: str(fd.get("email")),
      note: str(fd.get("note")) || str(fd.get("donation_note")),
    };
  }

  // Fallback attempt (some clients omit content-type).
  return await req.json().catch(() => null);
}

export async function POST(req: Request) {
  const input = await readInput(req);
  const parsed = bodySchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const user = await getSessionUser();
  const { amount, firstName, lastName, email } = parsed.data;
  const name = `${firstName} ${lastName}`.trim().slice(0, 120);
  const note = parsed.data.note?.trim() || null;

  const pool = dbPool();
  const conn = await pool.getConnection();

  try {
    // Security: never trust the client later for amount; it is stored in DB now.
    const [res] = await conn.execute<ResultSetHeader>(
      "INSERT INTO donations (user_id, name, email, note, amount, currency, status, created_at) VALUES (?, ?, ?, ?, ?, 'GHS', 'pending', NOW())",
      [user?.id ?? null, name, email, note, amount],
    );

    const donationId = Number(res.insertId);
    await setCheckoutDonationId(donationId);

    return NextResponse.json({ ok: true, donationId, requiresLogin: !user });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not start your donation. Please try again." },
      { status: 500 },
    );
  } finally {
    conn.release();
  }
}

