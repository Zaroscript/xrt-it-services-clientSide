import api from "@/lib/api";

export interface Plan {
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
  isDiscountActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get("/plans", {
      params: { active: true },
    });
    return response.data.data.plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const getFeaturedPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get("/plans/featured");
    return response.data.data.plans;
  } catch (error) {
    console.error("Error fetching featured plans:", error);
    throw error;
  }
};

export const requestPlan = async (planId: string, message?: string) => {
  try {
    const response = await api.post(`/plans/request/${planId}`, { message });
    return response.data;
  } catch (error) {
    console.error("Error requesting plan:", error);
    throw error;
  }
};
