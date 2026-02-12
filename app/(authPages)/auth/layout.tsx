import { Nunito_Sans } from "next/font/google";
import "@/css/app/global.css";
import Providers from "@/utils/Wrapper";
import AuthNavbar from "@/components/authNavbar/authNavbar";

const nunito_sans = Nunito_Sans({
    weight: ["200", "300", "400", "600", "700", "800", "900"],
    variable: "--font-nunito_sans",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${nunito_sans.className} antialiased`}>
                <Providers>
                    <main className="w-full">
                        <AuthNavbar />
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
