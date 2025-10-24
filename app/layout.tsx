import type { Metadata } from "next";
import { Nunito_Sans} from "next/font/google";
import "@/css/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/store-provider";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";

const nunito_sans = Nunito_Sans({
      weight: '500',
    variable: "--font-nunito_sans",
    subsets:['latin']
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
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body
        className={`${nunito_sans.className} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider>
            <Toaster richColors position="top-right" duration={5000} />
            <div>
              <Sidebar />
              <main className="">{children}</main>
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
