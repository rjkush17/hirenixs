import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/css/app/global.css";
import Providers from "@/utils/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "@/components/Footer/Footer";

const nunito_sans = Nunito_Sans({
    weight: ["200", "300", "400", "600", "700", "800", "900"],
    variable: "--font-nunito_sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "hirenixs",
    description:
        "Personal portfolio showcasing modern web development projects, skills in MERN stack, Next.js, TypeScript, Rust, and Linux-based workflows. Focused on clean UI, performance, and scalable frontend architecture.",
    keywords: [
        "web developer portfolio",
        "frontend developer",
        "Next.js developer",
        "React developer",
        "MERN stack",
        "JavaScript",
        "TypeScript",
        "Rust programming",
        "Linux developer",
        "Arch Linux",
        "UI development",
        "performance optimized websites",
        "static site generation",
        "SSG Next.js",
    ],
    icons: {
        icon: [{ url: "/favicons/favicon.ico" }],
        apple: [{ url: "/favicons/apple-touch-icon.png" }],
    },

    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${nunito_sans.className} antialiased`}>
                <Providers>
                    <div className="flex min-h-screen w-full">
                        <Sidebar />

                        <div className="flex flex-1 flex-col">
                            <main className="flex-1 w-full">
                                <SidebarTrigger />
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
