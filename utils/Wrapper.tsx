"use client";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/store-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getSidebarFromCookie } from "./getSidebarFromCookie";
import { useState } from "react";

type ProvidersProps = {
    children: ReactNode;
    session?: Session;
};

export default function Providers({ children, session }: ProvidersProps) {
    const [open, setOpen] = useState(getSidebarFromCookie);
    return (
        <SidebarProvider open={open} onOpenChange={setOpen}>
            <SessionProvider session={session}>
                <StoreProvider>
                    <ThemeProvider>
                        <Toaster
                            richColors
                            position="top-right"
                            duration={5000}
                            expand={false}
                            visibleToasts={7}
                        />
                        {children}
                    </ThemeProvider>
                </StoreProvider>
            </SessionProvider>
        </SidebarProvider>
    );
}
