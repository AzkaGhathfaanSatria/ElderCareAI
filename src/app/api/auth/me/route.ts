import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionToken } from "../../../../lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: "Belum login." }, { status: 401 });
  }

  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ message: "Sesi tidak valid." }, { status: 401 });
  }

  return NextResponse.json({
    id: session.userId,
    name: session.name,
    email: session.email,
    role: session.role,
  });
}
