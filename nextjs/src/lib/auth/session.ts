import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";
import { jwtSecretKey } from "@/lib/auth/secret";

const COOKIE_NAME = "lbc_session";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

type SessionPayload = {
  user: SessionUser;
};

export async function setSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ user } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwtSecretKey());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwtSecretKey());
    const user = (payload as unknown as SessionPayload).user;
    if (!user || typeof user.id !== "number") return null;
    return user;
  } catch {
    return null;
  }
}

