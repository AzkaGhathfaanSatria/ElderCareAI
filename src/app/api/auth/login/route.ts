import { NextResponse } from "next/server";

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  signSessionToken,
} from "../../../../lib/auth-edge";
import { verifyPassword } from "../../../../lib/auth-password";
import { findUserByEmail } from "../../../../lib/userStore";
import { LoginSchema } from "../../../../schemas/authSchema";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  const result = LoginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Data login tidak valid." },
      { status: 400 },
    );
  }

  const { email, password } = result.data;

  const user = await findUserByEmail(email);

  // Pesan error sengaja digeneralisasi (tidak bilang "email tidak ditemukan" vs
  // "password salah" secara spesifik) supaya tidak membantu penyerang menebak
  // email mana saja yang terdaftar di sistem.
  if (!user) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  const token = await signSessionToken({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
