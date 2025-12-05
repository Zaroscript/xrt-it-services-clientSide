import api from '@/lib/api';
import type { ApiResponse } from '@/services/auth/auth.service';

export interface CompanySettings {
  _id?: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
  taxId: string;
  website: string;
  logo: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

export const companySettingsService = {
  async getSettings(): Promise<CompanySettings> {
    try {
      // Use public endpoint for company settings
      const response = await api.get<ApiResponse<{ settings: CompanySettings }>>('/company-settings');
      return response.data.data.settings;
    } catch (error) {
      console.error('Error fetching company settings:', error);
      // Return default settings if fetch fails
      return {
        companyName: 'XRT IT Services',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        email: '',
        phone: '',
        taxId: '',
        website: '',
        logo: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
      };
    }
  },
};

