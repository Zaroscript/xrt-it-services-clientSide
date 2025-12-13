import { useState, useEffect, useCallback } from "react";
import { getPlans, getFeaturedPlans, Plan } from "@/lib/api/plans";

interface UsePlansPollingResult {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
}

export const usePlansPolling = (
  intervalMs: number = 5000
): UsePlansPollingResult => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setIsLoading(true);

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

      // Sort by displayOrder
      const sortedPlans = plansWithFeatured.sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );

      setPlans(sortedPlans);
      setError(null);
    } catch (err) {
      console.error("Error fetching plans:", err);
      // Only set error on initial load to avoid flashing error states during polling
      if (isInitial) {
        setError("Failed to load plans. Please try again later.");
      }
    } finally {
      if (isInitial) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchPlans(true);

    // Polling logic
    const intervalId = setInterval(() => {
      // Only fetch if document is visible to save resources
      if (!document.hidden) {
        fetchPlans(false);
      }
    }, intervalMs);

    // Handle visibility change (refetch immediately when tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPlans(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchPlans, intervalMs]);

  return { plans, isLoading, error };
};
