import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoSection, LocationSection } from "@/components/ContactInfoSection";

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