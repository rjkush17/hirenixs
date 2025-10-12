import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "@/lib/auth/credentialsProvider";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHub({
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
        // TODO: SignIn function for take oauth IDs and check if user register in DB if no then create user and saved in DB
        // TODO: jwt function that take token and check if the anything missing then return it 
        // TODO: just return 
        async redirect(){
            return "/"
        }
    }
});
