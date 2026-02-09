import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/css/app/global.css";
import Providers from "@/utils/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";

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
        icon: [{ url: "/favicons/favicon.ico" }], // Array format helps Next.js internal keying
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
                    <Sidebar />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
