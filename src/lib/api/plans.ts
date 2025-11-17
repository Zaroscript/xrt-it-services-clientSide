import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  calculatedMonthlyPrice?: number;
  calculatedYearlyPrice?: number;
  billingCycle: 'monthly' | 'yearly';
  duration: number;
  features: string[];
  maxRestaurants: number;
  isActive: boolean;
  isFeatured: boolean;
  discount?: {
    type: 'percentage' | 'fixed';
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
    const response = await axios.get(`${API_URL}/plans`, {
      params: { active: true }
    });
    return response.data.data.plans;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const getFeaturedPlans = async (): Promise<Plan[]> => {
  try {
    const response = await axios.get(`${API_URL}/plans/featured`);
    return response.data.data.plans;
  } catch (error) {
    console.error('Error fetching featured plans:', error);
    throw error;
  }
};

export const requestPlan = async (planId: string, message?: string) => {
  try {
    // Get token from auth store
    const authState = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    const token = authState.state?.tokens?.accessToken;
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post(
      `${API_URL}/plans/request/${planId}`,
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error requesting plan:', error);
    throw error;
  }
};
