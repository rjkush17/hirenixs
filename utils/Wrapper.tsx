"use client";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/store-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
  session?: any; // optional session from NextAuth
};

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ThemeProvider>
          <Toaster richColors position="top-right" duration={5000} />
          {children}
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
