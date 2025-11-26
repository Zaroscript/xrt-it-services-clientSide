import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xrt-tech.com";
  const currentDate = new Date();

  // Static pages with their priorities and update frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic service pages
  const serviceIds = [
    "online-ordering-systems",
    "web-development",
    "hosting-services",
    "digital-signage",
    "it-support",
    "custom-software",
  ];

  const servicePages = serviceIds.map((serviceId) => ({
    url: `${baseUrl}/services/${serviceId}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages];
}
