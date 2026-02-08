import type { Metadata } from "next";
import { Poppins,  Inter } from "next/font/google";
import "@/css/public/global.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight:["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})
  
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
            <body className={`${poppins.variable} ${inter.variable}`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
