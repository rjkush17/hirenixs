// types/next-auth.d.ts
// Augment NextAuth's types so `session.user.onboardingVerified` is recognized.


interface Avatar {
    link: string;
    publicID: string;
}

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // Extend the User type with your custom fields
    interface User {
        name?: string;
        email?: string;
        avatar?: Avatar;
        username?: string;
        role?: string;
        providerName?: string;
        onboardingVerified?: boolean; // <- your custom flag
    }

    // Ensure Session.user uses the augmented User interface
    interface Session extends DefaultSession {
        user: User & {
            id?: string;
            providerID?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        name?: string;
        email?: string;
        avatar?: Avatar;
        username?: string;
        role?: string | null;
        onboardingVerified?: boolean;
        providerName?: string;
        providerID?: string;
    }
}
