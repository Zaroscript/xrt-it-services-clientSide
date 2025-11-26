import React from "react";

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * Component to inject JSON-LD structured data into the page
 * Used for SEO and rich snippets in search results
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Pre-built structured data components for common use cases
 */

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    locality?: string;
    country?: string;
  };
  contactEmail?: string;
  socialLinks?: string[];
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  contactEmail,
  socialLinks = [],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: address.locality,
        addressCountry: address.country,
      },
    }),
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
    ...(contactEmail && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: contactEmail,
      },
    }),
  };

  return <StructuredData data={schema} />;
}

interface LocalBusinessSchemaProps {
  name: string;
  url: string;
  image: string;
  description: string;
  telephone?: string;
  priceRange?: string;
  address?: {
    locality?: string;
    country?: string;
  };
  openingHours?: string;
}

export function LocalBusinessSchema({
  name,
  url,
  image,
  description,
  telephone,
  priceRange = "$$",
  address,
  openingHours = "Mo-Fr 09:00-18:00",
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    image,
    url,
    description,
    priceRange,
    openingHours,
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: address.locality,
        addressCountry: address.country,
      },
    }),
  };

  return <StructuredData data={schema} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={schema} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={schema} />;
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed?: string;
}

export function ServiceSchema({
  name,
  description,
  provider,
  serviceType,
  areaServed = "United States",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    serviceType,
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
  };

  return <StructuredData data={schema} />;
}

interface ItemListSchemaProps {
  items: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
  name?: string;
}

export function ItemListSchema({
  items,
  name = "Services",
}: ItemListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description && { description: item.description }),
    })),
  };

  return <StructuredData data={schema} />;
}
