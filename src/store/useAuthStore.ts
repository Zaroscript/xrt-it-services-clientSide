// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { authService } from '@/services/auth/auth.service';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/services/auth/auth.service';

// Type definitions
export interface User {
  id: string;
  email: string;
  fName: string;
  lName: string;
  phone: string;
  companyName: string;
  oldWebsite?: string;
  role: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ClientProfile {
  _id?: string;
  user?: string;
  companyName?: string;
  businessLocation?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  oldWebsite?: string;
  taxId?: string;
  notes?: string;
  isActive?: boolean;
  services?: Array<{
    _id: string;
    name: string;
    description: string;
  }>;
  currentPlan?: {
    _id: string;
    name: string;
    price: number;
    features: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  clientProfile?: ClientProfile | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  fetchClientProfile: (userId: string) => Promise<void>;
  fetchAllUserData: () => Promise<void>;
  updateClientProfile: (profileData: Partial<ClientProfile>) => Promise<void>;
  setError: (error: string | null) => void;
  setTokens: (tokens: Tokens | null) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });
          try {
            const { user, tokens, clientProfile } = await authService.login({ email, password });
            set({
              user,
              tokens,
              isAuthenticated: true,
              isLoading: false,
            });
            if (clientProfile) {
              set({ clientProfile });
            }
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Login failed',
              isLoading: false,
            });
            throw error;
          }
        },

        register: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            await authService.register(userData);
            set({ isLoading: false });
            return { success: true, message: 'Registration successful. Please check your email for verification.' };
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            set({ error: errorMessage, isLoading: false });
            return { success: false, message: errorMessage };
          }
        },

        logout: async () => {
          try {
            await authService.logout();
          } catch (error) {
            // Don't throw error for logout - just clear local state
            // This handles cases where token is expired (401) or server is unavailable
            console.error('Error during logout:', error);
          } finally {
            // Always clear local state regardless of API call success
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              clientProfile: undefined,
            });
          }
        },

        refreshToken: async () => {
          const { tokens } = get();
          if (!tokens?.refreshToken) return false;

          try {
            const { accessToken, refreshToken } = await authService.refreshToken(tokens.refreshToken);
            set({
              tokens: { accessToken, refreshToken },
              isAuthenticated: true,
            });
            return true;
          } catch (error) {
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              clientProfile: undefined,
            });
            return false;
          }
        },

        fetchClientProfile: async (userId: string) => {
          try {
            const { clientProfile } = await authService.getMe();
            if (clientProfile) {
              set({ clientProfile });
            }
          } catch (error) {
            console.error('Failed to fetch client profile:', error);
          }
        },

        fetchAllUserData: async () => {
          try {
            const { user, clientProfile } = await authService.getMe();
            set({ 
              user,
              ...(clientProfile && { clientProfile })
            });
          } catch (error) {
            console.error('Failed to fetch all user data:', error);
          }
        },

        updateClientProfile: async (profileData) => {
          try {
            const updatedProfile = await authService.updateProfile(profileData);
            set({ clientProfile: updatedProfile });
          } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
          }
        },

        setError: (error: string | null) => set({ error }),
        
        setTokens: (tokens: Tokens | null) => set({ tokens }),
        
        setLoading: (isLoading: boolean) => set({ isLoading }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
          clientProfile: state.clientProfile,
        }),
      }
    )
  )
);

export default useAuthStore;