import { FadeIn } from "@/components/ui/FadeIn";
import { PricingToggle } from "@/components/ui/PricingToggle";
import { PricingCard } from "@/components/ui/PricingCard";
import { plans } from "@/config/constants";
import { useState } from "react";

const Priceing = () => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="page-container mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <PricingToggle
            isYearly={isYearly}
            onToggle={() => setIsYearly(!isYearly)}
          />
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={0.2 * (index + 1)}>
              <PricingCard
                title={plan.title}
                price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                yearlyPrice={isYearly ? plan.yearlyTotal : plan.monthlyTotal}
                originalPrice={
                  isYearly ? plan.yearlyOriginal : plan.monthlyOriginal
                }
                discount={plan.discount}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Priceing;
