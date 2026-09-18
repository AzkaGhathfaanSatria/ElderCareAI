import { NextResponse } from "next/server";

import { hashPassword } from "../../../../lib/auth";
import { createUser, findUserByEmail } from "../../../../lib/userStore";
import { RegisterSchema } from "../../../../schemas/registerSchema";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  const result = RegisterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Data registrasi tidak valid." },
      { status: 400 },
    );
  }

  const { name, email, password, role } = result.data;

  const existing = await findUserByEmail(email);

  if (existing) {
    return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({ name, email, passwordHash, role });

  return NextResponse.json(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    { status: 201 },
  );
}
