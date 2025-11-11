// types/next-auth.d.ts
// Augment NextAuth's types so `session.user.onboardingVerified` is recognized.

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";



declare module "next-auth" {
    // Extend the User type with your custom fields
    interface User {
        name?: string;
        email?: string;
        avatar?: Record<string, any>;
        username?: string;
        role?: string;
        providerName?: string;
        onboardingVerified?: boolean; // <- your custom flag
    }

    // Ensure Session.user uses the augmented User interface
    interface Session {
        user: User;
    }
}
declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id?: string;
            name?: string;
            email?: string;
            username?: string;
            role?: string | null;
            onboardingVerified?: boolean;
            providerName?: string;
            providerID?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            id?: string;
            name?: string;
            email?: string;
            username?: string;
            role?: string | null;
            onboardingVerified?: boolean;
            providerName?: string;
            providerID?: string;
        };
    }
}

