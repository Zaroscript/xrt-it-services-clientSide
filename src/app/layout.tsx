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
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

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
    "XRT Tech",
    "restaurant technology solutions",
    "small business IT support",
    "website development services",
    "online ordering platform",
    "restaurant POS systems",
    "digital menu boards",
    "cloud hosting services",
    "website maintenance",
    "e-commerce development",
    "mobile app development",
    "IT consulting services",
    "business technology solutions",
    "restaurant management software",
    "web hosting for businesses",
    "custom website design",
    "WordPress development",
    "WooCommerce integration",
    "digital transformation services",
    "IT infrastructure setup",
    "network configuration",
    "cybersecurity services",
    "data backup solutions",
    "email hosting services",
    "restaurant online ordering",
    "commission-free ordering system",
    "restaurant website design",
    "small business website",
    "IT support for restaurants",
    "digital menu display",
    "restaurant technology",
    "business website hosting",
    "custom online ordering",
    "restaurant management system",
    "affordable IT services",
    "local business website",
    "restaurant web design",
    "online food ordering",
    "restaurant POS integration",
    "website design company",
    "IT services provider",
    "restaurant digital solutions",
    "small business tech support",
    "web development agency",
    "restaurant software solutions",
    "business technology consulting",
    "website maintenance services",
    "cloud services for restaurants",
    "restaurant automation",
    "digital signage solutions",
    "restaurant marketing tools",
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
    icon: [
      { url: "/assets/images/favicon.ico", sizes: "any" },
      { url: "/assets/images/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/assets/images/favicon.ico",
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
        
        {/* Favicon for all devices */}
        <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
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
              <PWAInstallPrompt />
            </div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
