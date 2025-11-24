import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/css/global.css";
import Providers from "@/utils/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";

const nunito_sans = Nunito_Sans({
    weight: ["200", "300", "400", "600", "700", "800", "900"],
    variable: "--font-nunito_sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hirenixs",
    description: "Web app for searching Jobs and recuiters",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <link rel="icon" href="/favicons/favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
            />
            <link
                type="image/png"
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <body className={`${nunito_sans.className} antialiased`}>
                <Providers>
                    <Sidebar />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
