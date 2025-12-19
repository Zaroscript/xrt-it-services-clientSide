import { Metadata } from "next";

// Base URL for the website
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xrt-tech.com";
export const SITE_NAME = "XRT Tech";
export const COMPANY_NAME = "XRT Tech";

// Default SEO configuration
export const DEFAULT_SEO = {
  title: "XRT Tech - IT Services, Web Design & Online Ordering Systems",
  description:
    "XRT Tech delivers online ordering systems, website design, hosting, IT services, and digital signage solutions for restaurants and small businesses.",
  keywords: [
    "IT services for small businesses",
    "online ordering system for restaurants",
    "affordable website design",
    "digital signage for restaurants",
    "managed tech solutions",
    "web design & hosting",
  ],
};

// OpenGraph default configuration
export const OPENGRAPH_DEFAULT = {
  type: "website" as const,
  locale: "en_US",
  url: SITE_URL,
  siteName: SITE_NAME,
  images: [
    {
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} - Technology Solutions for Small Businesses`,
    },
  ],
};

// Twitter Card default configuration
export const TWITTER_DEFAULT = {
  card: "summary_large_image" as const,
  site: "@XRTTech",
  creator: "@XRTTech",
};

// Page-specific metadata configurations
export const PAGE_METADATA = {
  home: {
    title:
      "XRT Tech | Online Ordering, Web Design & IT Services for Small Business",
    description:
      "XRT Tech delivers online ordering systems, website design, hosting, IT services, and digital signage solutions for restaurants and small businesses. Fast & affordable.",
    keywords: [
      "IT services for small businesses",
      "online ordering system for restaurants",
      "affordable website design",
      "digital signage for restaurants",
      "managed tech solutions",
      "web design & hosting",
      "online ordering with no commission",
      "business website & ordering system",
      "digital menu tv setup",
      "fast hosting and website development",
      "one-stop tech agency for small business",
    ],
    openGraph: {
      title: "XRT Tech | Technology Solutions for Small Businesses",
      description:
        "Complete IT services, web design, online ordering systems, and digital signage for restaurants and small businesses.",
    },
  },
  services: {
    title: "XRT Tech | Small Business Tech Services & Digital Solutions ",
    description:
      "Explore XRT Tech services: online ordering, website development, hosting, digital signage, IT support and SaaS tools for restaurants and small businesses.",
    keywords: [
      "small business tech services",
      "IT services and web development",
      "custom software development",
      "online ordering system setup",
      "digital marketing & SEO services",
      "restaurant tech solutions",
      "web design for local businesses",
      "multi-screen menu system",
      "API integration services",
      "cloud dashboard for business",
    ],
    openGraph: {
      title: "XRT Tech | Our Digital Services",
      description:
        "Comprehensive IT and digital services tailored for small businesses and restaurants.",
    },
  },
  onlineOrdering: {
    title: "XRT Tech | No-Commission Restaurant Online Ordering System",
    description:
      "Get a custom online ordering system for your restaurant with no commissions. WooCommerce-powered, Stripe-ready, WhatsApp notifications, and multi-branch support.",
    keywords: [
      "restaurant online ordering system",
      "no commission online ordering",
      "WooCommerce food ordering",
      "custom restaurant ordering system",
      "online ordering website development",
      "pizza restaurant online ordering",
      "multi-branch restaurant ordering",
      "WhatsApp order notification system",
      "online ordering with Stripe",
      "online ordering for small restaurants",
    ],
    openGraph: {
      title: "Restaurant Online Ordering System - No Commission Fees",
      description:
        "Custom online ordering for restaurants with zero commission fees and powerful features.",
    },
  },
  websiteDesign: {
    title: "XRT Tech | WordPress Website Design for Small Businesses",
    description:
      "Affordable, responsive, SEO-friendly website design for restaurants and small businesses. WooCommerce integration, fast hosting, custom UI, and multilingual support.",
    keywords: [
      "small business website design",
      "WordPress website development",
      "WooCommerce web design",
      "SEO-ready website design",
      "affordable web development",
      "website design for restaurants",
      "custom WordPress themes",
      "bilingual website development",
      "responsive website design",
      "professional website redesign",
    ],
    openGraph: {
      title: "XRT Tech | Professional Website Design Services",
      description:
        "Custom WordPress websites designed for small businesses and restaurants.",
    },
  },
  hosting: {
    title: "XRT Tech | Fast, Secure Website Hosting for Small Businesses",
    description:
      "Reliable hosting with SSL, daily backups, email setup, and WordPress optimization. Perfect for local businesses and restaurants.",
    keywords: [
      "business website hosting",
      "fast WordPress hosting",
      "secure website hosting",
      "cloud hosting for small business",
      "domain and SSL setup service",
      "managed hosting service",
      "cPanel hosting for small business",
      "hosting with daily backups",
      "budget-friendly business hosting",
    ],
    openGraph: {
      title: "Business Website Hosting - Fast & Secure",
      description:
        "Reliable, optimized hosting solutions for small businesses.",
    },
  },
  digitalSignage: {
    title: "Digital Menu Boards & Restaurant TV Screens | XRT Tech",
    description:
      "Affordable digital menu boards for restaurants and cafes. Use Fire Stick or Android TV to display menus with remote management.",
    keywords: [
      "digital menu board system",
      "restaurant digital signage",
      "TV menu for restaurants",
      "cloud menu board",
      "digital screens for food businesses",
      "Fire Stick digital menu system",
      "multi-screen menu TV setup",
      "remote digital menu management",
      "digital menu for pizza shops",
      "digital signage for cafes",
    ],
    openGraph: {
      title: "Digital Menu Board Solutions for Restaurants",
      description:
        "Modern digital signage systems for restaurants and cafes with remote management.",
    },
  },
  about: {
    title: "About XRT Tech | Restaurant & Small Business Tech Solutions",
    description:
      "XRT Tech helps restaurants and small businesses grow with online ordering, websites, hosting, digital signage, and IT services.",
    keywords: [
      "small business tech company",
      "restaurant technology solutions",
      "IT services provider USA",
      "web design & online ordering company",
      "XRT Tech services",
      "tech partner for small businesses",
      "restaurant digital transformation",
      "all-in-one tech agency",
      "custom SaaS for restaurants",
      "business technology consulting",
    ],
    openGraph: {
      title: "About XRT Tech - Your Technology Partner",
      description:
        "Learn about our mission to provide affordable, high-quality tech solutions for small businesses.",
    },
  },
  contact: {
    title: "Contact XRT Tech | Get a Quote for Online Ordering & Web Design",
    description:
      "Contact XRT Tech for online ordering systems, web design, hosting, and digital signage setup. Speak with our tech specialists today.",
    keywords: [
      "contact XRT Tech",
      "tech support for small business",
      "get online ordering system",
      "request website design",
      "request digital signage setup",
      "contact IT services company",
      "talk to online ordering expert",
      "get a quote for web design",
      "talk to restaurant tech specialist",
    ],
    openGraph: {
      title: "Contact XRT Tech - Get Started Today",
      description:
        "Reach out to discuss your technology needs and get a custom quote.",
    },
  },
  pricing: {
    title: "Affordable Pricing Plans for Small Businesses | XRT Tech",
    description:
      "Transparent pricing for online ordering systems, website design, hosting, and IT services. No hidden fees. Plans designed for small businesses and restaurants.",
    keywords: [
      "affordable IT services pricing",
      "online ordering system cost",
      "website design pricing",
      "small business hosting plans",
      "transparent pricing tech services",
    ],
    openGraph: {
      title: "Simple, Transparent Pricing - XRT Tech",
      description: "Affordable plans for all your business technology needs.",
    },
  },
};

// Utility function to generate metadata
export function generatePageMetadata(
  page: keyof typeof PAGE_METADATA
): Metadata {
  const config = PAGE_METADATA[page];

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      ...OPENGRAPH_DEFAULT,
      title: config.openGraph.title,
      description: config.openGraph.description,
      url: `${SITE_URL}${page === "home" ? "" : `/${page}`}`,
    },
    twitter: {
      ...TWITTER_DEFAULT,
      title: config.openGraph.title,
      description: config.openGraph.description,
    },
    alternates: {
      canonical: `${SITE_URL}${page === "home" ? "" : `/${page}`}`,
    },
  };
}

// Structured Data Templates
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_SEO.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "United States",
    addressCountry: "US",
  },
  sameAs: [
    // Add social media links here
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "info@xrt-tech.com",
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY_NAME,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+1-XXX-XXX-XXXX", // Update with actual phone
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "United States",
    addressCountry: "US",
  },
  description: DEFAULT_SEO.description,
  openingHours: "Mo-Fr 09:00-18:00",
};
