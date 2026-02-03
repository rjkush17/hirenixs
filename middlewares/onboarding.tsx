import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

export default function checkOnboarding(
    request: NextRequest,
    session: Session,
): NextResponse | null {
    const { pathname } = request.nextUrl;

    // 🔒 HARD LOCK: user must stay inside onboarding
    if (session && !session.user?.onboardingVerified) {
        if (!pathname.startsWith("/onboarding")) {
            return NextResponse.redirect(
                new URL("/onboarding/profiletype", request.url),
            );
        }

        const role = session.user?.role;

        // Individual user
        if (role === "individual") {
            if (
                pathname.startsWith("/onboarding/organization") ||
                pathname.startsWith("/onboarding/profiletype")
            ) {
                return NextResponse.redirect(
                    new URL("/onboarding/individual/profile", request.url),
                );
            }
        }

        // Organization user
        if (role === "organization") {
            if (
                pathname.startsWith("/onboarding/individual") ||
                pathname.startsWith("/onboarding/profiletype")
            ) {
                return NextResponse.redirect(
                    new URL("/onboarding/organization", request.url),
                );
            }
        }

        // Role not chosen yet
        if (!role) {
            if (
                pathname.startsWith("/onboarding/individual") ||
                pathname.startsWith("/onboarding/organization")
            ) {
                return NextResponse.redirect(
                    new URL("/onboarding/profiletype", request.url),
                );
            }
        }
    }

    return null;
}
