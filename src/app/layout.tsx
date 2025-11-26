// Global CSS
import "./globals.css";

// Packages
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Loading
import Loading from "./loading";

// Fonts
import { Roboto, Inter } from "next/font/google";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/custom-toast";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Lazy load ChatWidget (not needed for initial render)
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

// Fonts variables
const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://xrt-tech.com"
  ),
  title: {
    default: "XRT Tech - IT Services, Web Design & Online Ordering Systems",
    template: "%s | XRT Tech",
  },
  description:
    "XRT Tech delivers online ordering systems, website design, hosting, IT services, and digital signage solutions for restaurants and small businesses. Fast & affordable.",
  keywords: [
    "IT services for small businesses",
    "online ordering system for restaurants",
    "affordable website design",
    "digital signage for restaurants",
    "managed tech solutions",
    "web design & hosting",
  ],
  authors: [{ name: "XRT Tech" }],
  creator: "XRT Tech",
  publisher: "XRT Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://xrt-tech.com",
    siteName: "XRT Tech",
    title: "XRT Tech - Technology Solutions for Small Businesses",
    description:
      "Complete IT services, web design, online ordering systems, and digital signage for restaurants and small businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "XRT Tech - Technology Solutions for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XRT Tech - Technology Solutions for Small Businesses",
    description:
      "Complete IT services, web design, online ordering systems, and digital signage for restaurants and small businesses.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"} />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"} crossOrigin="anonymous" />
      </head>
      <body
        className={`${robotoFont.variable} ${interFont.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<Loading />}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 overflow-x-hidden">
                <AuthProvider>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </AuthProvider>
              </main>
              <Footer />
              <ChatWidget />
              <Toaster />
            </div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
