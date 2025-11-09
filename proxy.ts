import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const publicPaths = ["/auth"];
  const privatePaths = ["/onboarding", "/dashboard", "/profile"]; // example

  // --- #1 Public Routes: redirect logged-in users away ---
  if (publicPaths.some((prefix) => pathname.startsWith(prefix))) {
    if (session) return NextResponse.redirect(new URL("/", request.url));
  }

  // --- #2 Private Routes: block unauthenticated users ---
  if (privatePaths.some((prefix) => pathname.startsWith(prefix))) {
    if (!session) return NextResponse.redirect(new URL("/auth", request.url));
  }

  // --- #3 Force onboarding if not completed ---
  const role = session?.user.role;
  if (
    session &&
    !session.user.onboardingVerified &&
    !pathname.startsWith("/onboarding")
  ) {
    if (role) {
      return NextResponse.redirect(
        new URL(`/onboarding/${role}/profile`, request.url),
      );
    } else {
      return NextResponse.redirect(new URL("/onboarding"));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
