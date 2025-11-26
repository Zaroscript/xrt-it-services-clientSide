import api from '@/lib/api';
import type { ApiResponse } from '../auth/auth.service';

export interface Service {
  _id: string;
  service: {
    _id: string;
    name: string;
    description: string;
    basePrice?: number;
  };
  customPrice: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  description: string;
}

export interface BusinessLocation {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface ClientProfile {
  _id: string;
  user: string;
  companyName: string;
  businessLocation?: BusinessLocation;
  oldWebsite?: string;
  taxId?: string;
  notes?: string;
  isActive: boolean;
  services?: Service[];
  currentPlan?: Plan;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateClientData {
  fName?: string;
  lName?: string;
  phone?: string;
  companyName?: string;
  businessLocation?: BusinessLocation;
  oldWebsite?: string;
  taxId?: string;
}

export const clientService = {
  async getClientProfile(): Promise<ClientProfile> {
    const response = await api.get<ApiResponse<ClientProfile>>('/clients/me');
    return response.data.data;
  },

  async updateClientProfile(data: UpdateClientData): Promise<ClientProfile> {
    const response = await api.patch<ApiResponse<ClientProfile>>('/clients/me', data);
    return response.data.data;
  },

  async requestSubscriptionChange(planId: string, reason: string): Promise<{message: string}> {
    const response = await api.post<ApiResponse<any>>('/clients/subscription-change-request', {
      planId,
      reason
    });
    return { message: response.data.message || 'Request submitted successfully' };
  },

  async requestNewService(serviceId: string, notes: string): Promise<{message: string}> {
    const response = await api.post<ApiResponse<any>>('/clients/service-request', {
      serviceId,
      notes
    });
    return { message: response.data.message || 'Request submitted successfully' };
  },

  async getAvailablePlans(): Promise<Plan[]> {
    const response = await api.get<ApiResponse<{ plans: Plan[] }>>('/plans');
    return response.data.data.plans || response.data.data;
  },

  async getAvailableServices(): Promise<any[]> {
    const response = await api.get<ApiResponse<{ services: any[] }>>('/services');
    return response.data.data.services || response.data.data;
  }
};
