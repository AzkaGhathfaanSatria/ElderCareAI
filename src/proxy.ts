import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionToken } from "./lib/auth";

const PROTECTED_PREFIXES = ["/dashboard", "/elderly", "/notifications", "/access", "/admin"];
const AUTH_PAGES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  const isAuthPage = AUTH_PAGES.includes(pathname);

  // Belum login tapi coba akses halaman yang butuh login -> lempar ke /login.
  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Sudah login tapi coba buka halaman login/register -> lempar ke area masing-masing.
  if (isAuthPage && session) {
    const destination = session.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // Area Admin (kelola pengguna & perangkat) terpisah dari area monitoring
  // Keluarga/Tenaga Medis — masing-masing tidak boleh saling masuk.
  if (pathname.startsWith("/admin") && session && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/elderly") ||
      pathname.startsWith("/notifications") ||
      pathname.startsWith("/access")) &&
    session &&
    session.role === "admin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Halaman Izin Akses cuma untuk role Keluarga/Caregiver, bukan Tenaga Medis.
  if (pathname.startsWith("/access") && session && session.role !== "keluarga") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/elderly/:path*",
    "/notifications/:path*",
    "/access/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
