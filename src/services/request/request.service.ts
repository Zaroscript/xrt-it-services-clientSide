import api from '@/lib/api';
import type { ApiResponse } from '../auth/auth.service';

export interface Request {
  _id: string;
  client: {
    _id: string;
    companyName: string;
  };
  user: {
    _id: string;
    email: string;
    fName: string;
    lName: string;
  };
  type: 'service' | 'plan_change';
  requestedItem: any;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  notes?: string;
  adminNotes?: string;
  processedBy?: {
    _id: string;
    fName: string;
    lName: string;
    email: string;
  };
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const requestService = {
  async createServiceRequest(serviceId: string, notes?: string): Promise<Request> {
    const response = await api.post<ApiResponse<Request>>('/requests', {
      type: 'service',
      requestedItemId: serviceId,
      notes
    });
    return response.data.data;
  },

  async createPlanChangeRequest(planId: string, notes?: string): Promise<Request> {
    const response = await api.post<ApiResponse<Request>>('/requests', {
      type: 'plan_change',
      requestedItemId: planId,
      notes
    });
    return response.data.data;
  },

  async getMyRequests(): Promise<Request[]> {
    const response = await api.get<ApiResponse<Request[]>>('/requests/my-requests');
    return response.data.data;
  },

  async cancelRequest(requestId: string): Promise<Request> {
    const response = await api.patch<ApiResponse<Request>>(`/requests/${requestId}/cancel`);
    return response.data.data;
  }
};
