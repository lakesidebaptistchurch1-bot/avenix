import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";
import { jwtSecretKey } from "@/lib/auth/secret";

/**
 * Short-lived checkout cookie used to carry `donationId` from:
 * donation form → login (if needed) → payment → thank-you.
 *
 * This replaces the old PHP `$_SESSION['donation_id']` flow.
 */
const COOKIE_NAME = "lbc_checkout";

type CheckoutPayload = {
  donationId: number;
};

export async function setCheckoutDonationId(donationId: number): Promise<void> {
  const token = await new SignJWT({ donationId } satisfies CheckoutPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(jwtSecretKey());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2,
  });
}

export async function clearCheckoutDonationId(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCheckoutDonationId(): Promise<number | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwtSecretKey());
    const donationId = (payload as unknown as CheckoutPayload).donationId;
    return typeof donationId === "number" && Number.isFinite(donationId) ? donationId : null;
  } catch {
    return null;
  }
}

