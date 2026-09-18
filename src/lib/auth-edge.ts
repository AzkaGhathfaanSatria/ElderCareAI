import { jwtVerify, SignJWT } from "jose";

import type { UserRole } from "../types/auth";

/**
 * File ini AMAN dipakai dari middleware (Edge Runtime) karena hanya
 * bergantung pada `jose`, yang memang dirancang untuk Edge.
 * JANGAN import bcrypt/bcryptjs di sini — pindahkan ke auth-password.ts.
 */

const SESSION_COOKIE_NAME = "eldercare_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 hari

/**
 * PENTING: di production, set env var AUTH_SECRET (misalnya lewat .env.local)
 * dengan string acak yang panjang. Fallback di bawah ini HANYA untuk
 * kebutuhan development/demo lokal supaya proyek tetap bisa langsung
 * dijalankan tanpa setup tambahan.
 */
const secretValue = process.env.AUTH_SECRET ?? "dev-only-secret-jangan-dipakai-di-production";
const secretKey = new TextEncoder().encode(secretValue);

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (
      typeof payload.userId === "string" &&
      typeof payload.name === "string" &&
      typeof payload.email === "string" &&
      (payload.role === "keluarga" || payload.role === "tenaga_medis" || payload.role === "admin")
    ) {
      return {
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
