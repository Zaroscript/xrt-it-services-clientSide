import { Metadata } from "next";
import { generatePageMetadata } from "@/config/seo.config";
import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";
import {
  ContactInfoSection,
  LocationSection,
} from "@/components/ContactInfoSection";

// SEO Metadata for Contact Page
export const metadata: Metadata = generatePageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfoSection />
      <ContactForm />
      <LocationSection />
    </>
  );
}
