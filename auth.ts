import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "@/lib/auth/credentialsProvider";
import connectDB from "./database/Database";
import { IUser, User } from "@/models/user";
import createUsername from "./lib/generateUsername";

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
          throw new Error("Missing required user or account information.");
        }

        const username = createUsername(name);

        const userModel: Partial<IUser> = {
          email,
          name,
          username: username,
          role: null,
          isVerified: true,
          onboardingVerified: false,
          providerName: provider,
          providerID: providerAccountId,
        };

        const userCreated = await User.create(userModel);
        if (!userCreated) return false;

        user = userModel;
        return true;
      } catch (error) {
        console.log("error while singIn function ", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // console.log("jwt callback  token", token);
      // console.log("jwt callback  user", user);
      if (user && user.email) {
        const userDetails: IUser | null = await User.findOne({
          email: user.email,
        });

        if (!userDetails) {
          throw new Error("user not find while create jwt token");
        }

        token.name = userDetails.name;
        token.avatar = userDetails.avatar;
        token.username = userDetails.username;
        token.role = userDetails.role;
        token.isVerified = userDetails.isVerified;
        token.onboardingVerified = userDetails.onboardingVerified;
        token.providerName = userDetails.providerName;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.name = token.name;
      session.user.avatar = token.avatar;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.isVerified = token.isVerified;
      session.user.onboardingVerified = token.onboardingVerified;
      session.user.providerName = token.providerName;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});
