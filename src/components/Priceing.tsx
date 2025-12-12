"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { PricingToggle } from "@/components/ui/PricingToggle";
import { PricingCard } from "@/components/ui/PricingCard";
import { PricingSkeleton } from "@/components/ui/PricingSkeleton";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPlans, getFeaturedPlans, requestPlan } from "@/lib/api/plans";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";

interface PlanDisplay {
  _id: string;
  name: string;
  description: string;
  price: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  calculatedMonthlyPrice?: number;
  calculatedYearlyPrice?: number;
  billingCycle: "monthly" | "yearly";
  duration: number;
  features: string[];
  maxRestaurants: number;
  isActive: boolean;
  isFeatured: boolean;
  badge?: {
    text?: string;
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning"
      | "info"
      | "premium"
      | "new"
      | "limited";
  };
  discount?: {
    type: "percentage" | "fixed";
    value: number;
    isActive: boolean;
    code?: string;
    startDate?: string;
    endDate?: string;
  };
  discountedPrice?: number;
  discountedMonthlyPrice?: number;
  discountedYearlyPrice?: number;
  createdAt: string;
  updatedAt: string;
  buttonText?: string;
  taxNote?: string;
  guaranteeText?: string;
}

const Priceing = () => {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanDisplay[]>([]);
  const [isRequesting, setIsRequesting] = useState<Record<string, boolean>>({});
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDisplay | null>(null);
  const [customizationNote, setCustomizationNote] = useState("");

  // Calculate average yearly savings from plans
  const calculateYearlySavings = () => {
    if (plans.length === 0) return undefined;

    const savings = plans
      .map((plan) => {
        const monthlyPrice =
          plan.discountedMonthlyPrice ||
          plan.calculatedMonthlyPrice ||
          plan.monthlyPrice ||
          plan.price;
        const yearlyPrice =
          plan.discountedYearlyPrice ||
          plan.calculatedYearlyPrice ||
          plan.yearlyPrice ||
          monthlyPrice * 12;
        const monthlyTotal = monthlyPrice * 12;

        if (monthlyTotal > yearlyPrice) {
          return Math.round(
            ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100
          );
        }
        return 0;
      })
      .filter((saving) => saving > 0);

    return savings.length > 0
      ? Math.round(savings.reduce((a, b) => a + b, 0) / savings.length)
      : undefined;
  };

  const yearlySavings = calculateYearlySavings();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const [regularPlans, featuredPlans] = await Promise.all([
          getPlans(),
          getFeaturedPlans(),
        ]);

        // Mark featured plans
        const featuredPlanIds = new Set(featuredPlans.map((p) => p._id));
        const plansWithFeatured = regularPlans.map((plan) => ({
          ...plan,
          isFeatured: featuredPlanIds.has(plan._id),
        }));

        setPlans(plansWithFeatured);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans. Please try again later.");
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (plan: PlanDisplay) => {
    // Check authentication using auth store
    const authState = JSON.parse(localStorage.getItem("auth-storage") || "{}");
    const token = authState.state?.tokens?.accessToken;

    if (!token) {
      // Redirect to login if not authenticated
      router.push("/auth/login?redirect=/pricing");
      return;
    }

    // Show customization modal for authenticated users
    setSelectedPlan(plan);
    setShowCustomizationModal(true);
  };

  const handleCustomizationSubmit = async (customize: boolean) => {
    if (!selectedPlan) return;

    try {
      setIsRequesting((prev) => ({ ...prev, [selectedPlan._id]: true }));

      const message = customize ? customizationNote : undefined;
      await requestPlan(selectedPlan._id, message);

      toast.success(
        customize
          ? "Custom plan request submitted successfully!"
          : "Plan request submitted successfully!",
        {
          position: "top-center",
          duration: 2000,
        }
      );

      // Reset modal state
      setShowCustomizationModal(false);
      setSelectedPlan(null);
      setCustomizationNote("");

      // Add a small delay before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Error requesting plan:", error);
      toast.error("Failed to request plan. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsRequesting((prev) => ({ ...prev, [selectedPlan._id]: false }));
    }
  };

  const handleModalClose = () => {
    setShowCustomizationModal(false);
    setSelectedPlan(null);
    setCustomizationNote("");
  };

  if (isLoading) {
    return <PricingSkeleton />;
  }

  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-16 bg-background text-center"
      >
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg inline-block">
          {error}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            when: "beforeChildren",
          },
        },
        exit: { opacity: 0 },
      }}
      className="relative py-16 bg-background"
    >
      <motion.div
        className="page-container"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
      >
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-gray-500"
          >
            Online Ordering Plans
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-primary dark:text-secondary sm:text-4xl"
          >
            Built for Small Businesses Simple, Affordable, and Ready to Grow
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose the plan that fits your journey from your first online
            order to full-scale digital success.
          </motion.p>
        </div>

        <FadeIn className="mb-12 text-center">
          <PricingToggle
            isYearly={isYearly}
            onToggle={() => setIsYearly(!isYearly)}
            yearlySavings={yearlySavings}
          />
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16"
        >
          {plans.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="h-full"
                >
                  <PricingCard
                    title={plan.name}
                    description={plan.description}
                    price={`$${Math.round(
                      isYearly
                        ? plan.discount?.isActive && plan.discount?.value > 0
                          ? plan.discountedYearlyPrice ||
                            plan.calculatedYearlyPrice ||
                            plan.yearlyPrice ||
                            plan.price * 12
                          : plan.calculatedYearlyPrice ||
                            plan.yearlyPrice ||
                            plan.price * 12
                        : plan.discount?.isActive && plan.discount?.value > 0
                        ? plan.discountedMonthlyPrice ||
                          plan.calculatedMonthlyPrice ||
                          plan.monthlyPrice ||
                          plan.price
                        : plan.calculatedMonthlyPrice ||
                          plan.monthlyPrice ||
                          plan.price
                    )}/${isYearly ? "yr" : "mo"}`}
                    originalPrice={
                      plan.discount?.isActive && plan.discount?.value > 0
                        ? `$${Math.round(
                            isYearly
                              ? plan.calculatedYearlyPrice ||
                                  plan.yearlyPrice ||
                                  plan.price * 12
                              : plan.calculatedMonthlyPrice ||
                                  plan.monthlyPrice ||
                                  plan.price
                          )}/${isYearly ? "yr" : "mo"}`
                        : undefined
                    }
                    discount={
                      plan.discount?.isActive && plan.discount?.value > 0
                        ? plan.discount.type === "percentage"
                          ? `${plan.discount.value}%`
                          : `$${Math.round(plan.discount.value)}`
                        : undefined
                    }
                    features={plan.features.map((feature) => ({
                      text: feature,
                      included: true,
                    }))}
                    isPopular={plan.isFeatured}
                    badge={plan.badge}
                    onSelect={() => handlePlanSelect(plan)}
                    isSubmitting={!!isRequesting[plan._id]}
                    buttonText={plan.buttonText || "Get Started"}
                    taxNote={plan.taxNote || "Local taxes may apply"}
                    guaranteeText={
                      plan.guaranteeText || "30 Day Money-Back Guarantee"
                    }
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No plans available at the moment.</p>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Customization Modal */}
      <Modal
        isOpen={showCustomizationModal}
        onClose={handleModalClose}
        title="Customize Your Plan?"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Would you like to customize your{" "}
            <span className="font-semibold">{selectedPlan?.name}</span> plan?
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => handleCustomizationSubmit(false)}
              className="w-full"
              disabled={!!selectedPlan && isRequesting[selectedPlan._id]}
            >
              {selectedPlan && isRequesting[selectedPlan._id] ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Continue with Standard Plan
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#343438] px-2 text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customization-note">
                Tell us what you'd like to customize
              </Label>
              <Textarea
                id="customization-note"
                placeholder="e.g., I need additional features, custom branding, different pricing, etc."
                value={customizationNote}
                onChange={(e) => setCustomizationNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={() => handleCustomizationSubmit(true)}
              variant="outline"
              className="w-full"
              disabled={!!selectedPlan && isRequesting[selectedPlan._id]}
            >
              {selectedPlan && isRequesting[selectedPlan._id] ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Request Custom Plan
            </Button>
          </div>
        </div>
      </Modal>
    </motion.section>
  );
};

export default Priceing;
