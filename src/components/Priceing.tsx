'use client';

import { FadeIn } from "@/components/ui/FadeIn";
import { PricingToggle } from "@/components/ui/PricingToggle";
import { PricingCard } from "@/components/ui/PricingCard";
import { PricingSkeleton } from "@/components/ui/PricingSkeleton";
import { getPlans, getFeaturedPlans, requestPlan } from "@/lib/api/plans";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader } from "@/components/ui/Loader";

interface PlanDisplay {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discount?: {
    amount: number;
    isActive: boolean;
    code?: string;
    startDate?: string;
    endDate?: string;
  };
  features: string[];
  isFeatured: boolean;
  billingCycle: 'monthly' | 'yearly';
  maxRestaurants: number;
  isActive: boolean;
}

const Priceing = () => {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanDisplay[]>([]);
  const [isRequesting, setIsRequesting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const [regularPlans, featuredPlans] = await Promise.all([
          getPlans(),
          getFeaturedPlans()
        ]);

        // Mark featured plans
        const featuredPlanIds = new Set(featuredPlans.map(p => p._id));
        const plansWithFeatured = regularPlans.map(plan => ({
          ...plan,
          isFeatured: featuredPlanIds.has(plan._id)
        }));

        setPlans(plansWithFeatured);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans. Please try again later.');
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [isYearly]);

  const handlePlanSelect = async (planId: string) => {
    try {
      setIsRequesting(prev => ({ ...prev, [planId]: true }));
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/auth/login?redirect=/pricing');
        return;
      }

      // Add a small delay for better UX
      await Promise.all([
        requestPlan(planId),
        new Promise(resolve => setTimeout(resolve, 800)) // Minimum loading time for better UX
      ]);
      
      toast.success('Plan request submitted successfully!', {
        position: 'top-center',
        duration: 2000,
      });
      
      // Add a small delay before redirecting
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error requesting plan:', error);
      toast.error('Failed to request plan. Please try again.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setIsRequesting(prev => ({ ...prev, [planId]: false }));
    }
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
        className="relative py-16 bg-background"
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
            when: "beforeChildren"
          } 
        },
        exit: { opacity: 0 }
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
            transition: { duration: 0.6 }
          }
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
            Built for Small Businesses — Simple, Affordable, and Ready to Grow
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose the plan that fits your journey — from your first online
            order to full-scale digital success.
          </motion.p>
        </div>

        <FadeIn className="mb-12 text-center">
          <PricingToggle
            isYearly={isYearly}
            onToggle={() => setIsYearly(!isYearly)}
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
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                  className="h-full"
                >
                  <PricingCard
                    title={plan.name}
                    description={plan.description}
                    price={`$${plan.discountedPrice || plan.price}${isYearly ? '/yr' : '/mo'}`}
                    originalPrice={plan.discount?.isActive ? `$${plan.price}${isYearly ? '/yr' : '/mo'}` : undefined}
                    discount={plan.discount?.isActive ? `${plan.discount.amount}%` : undefined}
                    features={plan.features.map(feature => ({ text: feature, included: true }))}
                    isPopular={plan.isFeatured}
                    onSelect={() => handlePlanSelect(plan._id)}
                    isSubmitting={!!isRequesting[plan._id]}
                    buttonText="Get Started"
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
    </motion.section>
  );
};

export default Priceing;
