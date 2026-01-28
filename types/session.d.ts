import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        expires: string;
        user: {
            username: string;
            providerName: string;
            onboardingVerified: boolean;
            role: "individual" | "organization" | null;
            avatar?: {
                link?: string;
                publicID?: string;
            };
        } & DefaultSession["user"];
    }
}
