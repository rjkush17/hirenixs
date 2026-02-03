import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import checkOnboarding from "@/middlewares/onboarding";

export async function proxy(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    const publicPaths = ["/auth"];
    const privatePaths = ["/onboarding", "/dashboard", "/profile"];

    // #1 Public routes → redirect logged-in users
    if (publicPaths.some((p) => pathname.startsWith(p))) {
        if (session) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // #2 Private routes → block unauthenticated users
    if (privatePaths.some((p) => pathname.startsWith(p))) {
        if (!session) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    // #3 Check onboarding releated  directions
    if (session) {
        if (
            pathname.startsWith("/onboarding") &&
            session?.user?.onboardingVerified
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        const onboardingResponse = checkOnboarding(request, session);
        if (onboardingResponse) return onboardingResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|api|favicon.ico).*)"],
};
