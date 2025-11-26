import dynamic from "next/dynamic";
import Included from "@/components/Included";
import Priceing from "@/components/Priceing";
import { FadeIn } from "@/components/ui/FadeIn";
import { PricingHero } from "@/components/PricingHero";
import { PricingCTA } from "@/components/PricingCTA";
import { generatePageMetadata } from "@/config/seo.config";
import { Metadata } from "next";

// Lazy load heavy components
const ComparisonTable = dynamic(
  () =>
    import("@/components/ui/ComparisonTable").then((mod) => ({
      default: mod.ComparisonTable,
    })),
  { loading: () => <div className="h-96" /> }
);

const FAQ = dynamic(
  () => import("@/components/ui/FAQ").then((mod) => ({ default: mod.FAQ })),
  { loading: () => <div className="h-96" /> }
);

export const metadata: Metadata = generatePageMetadata("pricing");

export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <PricingHero />

      <Priceing />

      {/* Marketing Section */}
      <FadeIn>
        <Included />
      </FadeIn>

      {/* Comparison Table */}
      <FadeIn>
        <ComparisonTable />
      </FadeIn>

      {/* FAQ Section */}
      <FadeIn>
        <FAQ />
      </FadeIn>

      {/* CTA Section */}
      <PricingCTA />
    </div>
  );
}
