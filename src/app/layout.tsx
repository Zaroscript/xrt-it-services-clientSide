// Global CSS
import "./globals.css";

// Packages
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { Providers } from "@/providers";

// Loading
import Loading from "./loading";

// Fonts
import { Roboto, Inter } from "next/font/google";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";



// Fonts variables
const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "XRT-Tech",
  description: "XRT-Tech Official Website",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={`${robotoFont.variable} ${interFont.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<Loading />}>
            <Providers session={null}>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 overflow-x-hidden">{children}</main>
                <Footer />
                <ChatWidget />
              </div>
            </Providers>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
