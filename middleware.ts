import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  // ---------- Public Routes ---------
  const { pathname } = request.nextUrl;
  const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/resetpassword"];
  const isPublic = publicPaths.includes(pathname);

  // -------- Middleware#1: Protect Proivde Routes --------
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // -------- Middleware#2: Protect Problic Routes for Loggied User -------
  if (token && isPublic) {
    console.log("middleware runs");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --------Middleware#3: redirect User onboarding if they didn't --------
  // TODO: miidleware for redirecting to onboardinf if user didn't do it

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/profile", "/testing", "/auth/:path*", "/"],
};
