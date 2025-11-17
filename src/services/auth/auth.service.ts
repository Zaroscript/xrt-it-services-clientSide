import { api } from '@/lib/api';
import { User, ClientProfile, Tokens } from '@/store/useAuthStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fName: string;
  lName: string;
  phone: string;
  companyName: string;
  oldWebsite?: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
  clientProfile?: ClientProfile;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post('/auth/login', credentials);
  },

  async register(userData: RegisterData): Promise<{ message: string }> {
    return api.post('/auth/register', userData);
  },

  async logout(): Promise<void> {
    try {
      return await api.post('/auth/logout');
    } catch (error: any) {
      // If logout fails with 401 (token expired), that's actually fine
      // The user is already logged out from the server perspective
      if (error.response?.status === 401) {
        return; // Silently succeed - the user is already logged out
      }
      // For other errors, still throw them so they can be logged
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return api.post('/auth/refresh', { refreshToken });
  },

  async getMe(): Promise<{ user: User; clientProfile?: ClientProfile }> {
    return api.get('/auth/me');
  },

  async updateProfile(profileData: Partial<ClientProfile>): Promise<ClientProfile> {
    return api.put('/profile', profileData);
  },
};