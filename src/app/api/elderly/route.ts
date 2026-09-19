import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionToken } from "../../../lib/auth-edge";
import { getElderCareData, updateElderlyName } from "../../../lib/elderlyStore";
import { ElderlyRegistrationSchema } from "../../../schemas/elderlyRegistrationSchema";

/**
 * BFF (Backend for Frontend) untuk data monitoring lansia.
 * Sebelumnya front-end fetch langsung ke file statis /public/data/elderly.json
 * (siapa saja bisa akses tanpa login). Sekarang data hanya bisa diakses lewat
 * endpoint ini, yang memverifikasi sesi login dulu sebelum mengembalikan data.
 */

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Belum login." }, { status: 401 });
  }

  const data = await getElderCareData();
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Belum login." }, { status: 401 });
  }

  const body: unknown = await request.json();
  const result = ElderlyRegistrationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Data registrasi tidak valid.", issues: result.error.issues },
      { status: 400 },
    );
  }

  const updated = await updateElderlyName(result.data.name);

  return NextResponse.json({
    elderly: updated.elderly,
    registration: result.data,
  });
}
