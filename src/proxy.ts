import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(
    "PROXY JALAN:",
    request.nextUrl.pathname,
    "COOKIE:",
    request.cookies.get("eldercare_token")?.value
  );

  const token = request.cookies.get("eldercare_token")?.value;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/elderly");

  if (isProtectedRoute && !token) {
    console.log("PROXY REDIRECT KE LOGIN");

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/elderly/:path*"],
};