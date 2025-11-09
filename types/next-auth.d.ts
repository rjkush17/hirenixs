// types/next-auth.d.ts
// Augment NextAuth's types so `session.user.onboardingVerified` is recognized.

import NextAuth from "next-auth";

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
