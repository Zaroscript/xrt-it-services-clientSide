import api from '@/lib/api';
import { setToken, clearAuthData, getToken, getAccessToken } from '@/lib/auth';
import type { User, ClientProfile, Tokens } from '@/store/useAuthStore';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data: T;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  clientProfile?: ClientProfile;
}

interface MeResponse {
  user: User;
  clientProfile?: ClientProfile;
  accessToken?: string;
}

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
  accessToken: string;
  clientProfile?: ClientProfile | null;
}

const mapUser = (raw: any): User => ({
  id: raw.id ?? raw._id ?? '',
  email: raw.email,
  fName: raw.fName,
  lName: raw.lName,
  phone: raw.phone,
  companyName: raw.companyName,
  oldWebsite: raw.oldWebsite,
  role: raw.role,
  isApproved: raw.isApproved,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});

const mapClientProfile = (raw: any | null | undefined): ClientProfile | null => {
  if (!raw) return null;
  return {
    _id: raw._id,
    user: raw.user,
    companyName: raw.companyName,
    businessLocation: raw.businessLocation,
    oldWebsite: raw.oldWebsite,
    taxId: raw.taxId,
    notes: raw.notes,
    isActive: raw.isActive,
    services: raw.services,
    currentPlan: raw.currentPlan,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Clear any existing tokens first
      if (typeof document !== 'undefined') {
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }

      // Make the login request with credentials
      const response = await api.post<ApiResponse<LoginResponse>>(
        '/auth/login', 
        credentials,
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      
      const { accessToken, refreshToken, user, clientProfile } = response.data.data;
      
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      
      // Store both tokens
      setToken(accessToken, refreshToken);
      
      // Set the token in an HTTP-only cookie for server-side auth
      if (typeof document !== 'undefined') {
        document.cookie = `auth_token=${accessToken}; path=/; max-age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
      }
      
      // Update the default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      return {
        user: mapUser(user),
        accessToken,
        clientProfile: clientProfile ? mapClientProfile(clientProfile) : null,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      // Clear any partial auth data on error
      if (typeof document !== 'undefined') {
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      throw error;
    }
  },

  async register(userData: RegisterData): Promise<{ message: string }> {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>('/auth/register', userData);
      return response.data.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  },

  async logout(): Promise<void> {
    try {
      // First make the API call with the current token
      // Don't throw on 401/403 errors for logout
      await api.post('/auth/logout', {}, {
        validateStatus: (status) => status < 500
      });
    } catch (error) {
      console.error('Logout API error:', error);
      // Even if the API call fails, we want to proceed with clearing local state
    } finally {
      // Always remove the tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async getMe(): Promise<AuthResponse> {
    try {
      const token = getToken();
      if (!token) {
        const error = new Error('No authentication token found');
        error.name = 'AuthError';
        throw error;
      }

      const response = await api.get<ApiResponse<MeResponse>>('/auth/me');
      
      if (!response.data?.data?.user) {
        const error = new Error('Invalid response from server');
        error.name = 'AuthError';
        throw error;
      }

      return {
        user: mapUser(response.data.data.user),
        accessToken: token,
        clientProfile: mapClientProfile(response.data.data.clientProfile),
      };
    } catch (error: any) {
      // Clear token on auth errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearAuthData();
        const authError = new Error(
          error.response.status === 401 
            ? 'Your session has expired. Please log in again.'
            : 'You do not have permission to access this resource.'
        );
        authError.name = 'AuthError';
        throw authError;
      }
      // Re-throw AuthError
      if (error.name === 'AuthError') {
        throw error;
      }
      throw error;
    }
  },

  async updateProfile(profileData: Partial<ClientProfile>): Promise<ClientProfile | null> {
    const res = await api.patch<ApiResponse<ClientProfile>>(
      '/client/profile',
      profileData,
    );
    const profile = mapClientProfile(res.data.data);
    if (!profile) throw new Error('Failed to update profile');
    return profile;
  },

  async updatePassword(data: { currentPassword: string; newPassword: string }): Promise<{ accessToken?: string; message: string }> {
    try {
      const response = await api.patch<ApiResponse<{ accessToken?: string; message?: string }>>(
        '/auth/update-password',
        data
      );
      
      // Update token if returned
      if (response.data.data.accessToken) {
        const responseData = response.data.data as any; // Type assertion to access refreshToken
        setToken(responseData.accessToken, responseData.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${responseData.accessToken}`;
      }
      
      return {
        accessToken: response.data.data.accessToken,
        message: response.data.message || 'Password updated successfully',
      };
    } catch (error: any) {
      console.error('Password update error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update password. Please try again.');
    }
  },
};