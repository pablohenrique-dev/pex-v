import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/criar-conta"];
const protectedRoutes = ["/dashboard", "/mercadorias", "/configuracoes"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth_token")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (authToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/criar-conta",
    "/dashboard/:path*",
    "/mercadorias/:path*",
    "/configuracoes/:path*",
  ],
};
