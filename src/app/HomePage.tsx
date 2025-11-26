"use client";

import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components
const CompanySection = dynamic(
  () => import("@/components/CompanySection").then((mod) => mod.CompanySection),
  {
    loading: () => <div className="h-32" />,
  }
);

const ServicesShowcase = dynamic(
  () =>
    import("@/components/ServicesShowcase").then((mod) => mod.ServicesShowcase),
  {
    loading: () => <div className="h-96" />,
  }
);

const Success = dynamic(() => import("@/components/Success"), {
  loading: () => <div className="h-96" />,
});

const Priceing = dynamic(() => import("@/components/Priceing"), {
  loading: () => <div className="h-96" />,
});

const Studies = dynamic(() => import("@/components/Studies"), {
  loading: () => <div className="h-96" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96" />,
});

const Partners = dynamic(() => import("@/components/Partners"), {
  loading: () => <div className="h-64" />,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="h-96" />,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanySection />
      <ServicesShowcase />
      <Success />
      <Studies />
      <Priceing />
      <Testimonials />
      <Partners />
      <ContactSection />
    </>
  );
}
