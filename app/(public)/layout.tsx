import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/css/public/global.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
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
            <body className={`${poppins.variable} ${inter.variable}`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
