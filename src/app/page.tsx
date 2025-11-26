import { Metadata } from "next";
import { generatePageMetadata, SITE_URL, SITE_NAME } from "@/config/seo.config";
import HomePage from "./HomePage";

// SEO Metadata for Home Page
export const metadata: Metadata = generatePageMetadata("home");

export default function Page() {
  return (
    <>
      {/* JSON-LD Structured Data for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: SITE_NAME,
            image: `${SITE_URL}/logo.png`,
            url: SITE_URL,
            telephone: "+1-XXX-XXX-XXXX",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "United States",
              addressCountry: "US",
            },
            description:
              "XRT Tech provides IT services, web development, online ordering systems, hosting, and digital signage solutions for small businesses and restaurants.",
            openingHours: "Mo-Fr 09:00-18:00",
            sameAs: [],
          }),
        }}
      />
      <HomePage />
    </>
  );
}
