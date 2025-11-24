import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "@/lib/auth/credentialsProvider";
import OTPProvider from "@/lib/auth/otpProvider";
import connectDB from "./database/Database";
import { IUser, User } from "@/models/user";
import createUsername from "@/utils/generateUsername";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),

        CredentialsProvider,
        OTPProvider,
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                await connectDB();

                const { email, name } = user;
                if (!account) return false;
                const { provider, providerAccountId } = account;

                const isUserExist = await User.findOne({ email: email });
                if (isUserExist) {
                    return true;
                }

                if (!name || !email || !provider || !providerAccountId) {
                    console.error("Missing required user or account info");
                    return false;
                }

                const username = createUsername(name);

                const userModel: Partial<IUser> = {
                    email,
                    name,
                    username: username,
                    role: null,
                    onboardingVerified: false,
                    providerName: provider,
                    providerID: providerAccountId,
                };

                const userCreated = await User.create(userModel);
                if (!userCreated) return false;

                return true;
            } catch (error) {
                console.log("error while singIn function ", error);
                return false;
            }
        },

        async jwt({ token, user, trigger }) {
            // ------------------------------
            // 1️⃣ If user just signed in
            // ------------------------------
            if (user && user.email) {
                const userDetails = await User.findOne({ email: user.email });

                if (!userDetails) return token;

                // Fill token with all fields
                token.name = userDetails.name;
                token.avatar = userDetails.avatar;
                token.username = userDetails.username;
                token.role = userDetails.role;
                token.onboardingVerified = userDetails.onboardingVerified;
                token.providerName = userDetails.providerName;

                return token;
            }

            // ------------------------------
            // 2️⃣ If update() is called → refresh FULL TOKEN
            // ------------------------------
            if (trigger === "update") {
                // 🔥 Get fresh user from DB using token.email
                const userDetails = await User.findOne({ email: token.email });

                if (!userDetails) return token;

                // 🔥 Replace entire token with DB data
                token.name = userDetails.name;
                token.avatar = userDetails.avatar;
                token.username = userDetails.username;
                token.role = userDetails.role;
                token.onboardingVerified = userDetails.onboardingVerified;
                token.providerName = userDetails.providerName;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            session.user.name = token.name;
            session.user.avatar = token.avatar;
            session.user.username = token.username;
            session.user.role = token.role;
            session.user.onboardingVerified = token.onboardingVerified;
            session.user.providerName = token.providerName;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
});
