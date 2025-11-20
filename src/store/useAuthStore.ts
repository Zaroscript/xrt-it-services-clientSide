// src/store/useAuthStore.ts
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { authService } from "@/services/auth/auth.service";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/services/auth/auth.service";

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
  clientProfile: ClientProfile | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  fetchClientProfile: () => Promise<void>;
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
      (set) => ({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        clientProfile: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });

          try {
            // Clear any existing auth data first
            localStorage.removeItem('accessToken');
            
            // Make the login request
            const { user, accessToken, clientProfile } = await authService.login({
              email: email.trim(),
              password,
            } as LoginCredentials);

            // Update the state with the new auth data
            set({
              user,
              tokens: { accessToken },
              clientProfile: clientProfile ?? null,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Store the token in localStorage for persistence
            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', accessToken);
            }
          } catch (error: any) {
            console.error('Login error in store:', error);
            
            // Clear any partial auth data
            localStorage.removeItem('accessToken');
            
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Login failed. Please try again.";

            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              isLoading: false,
              error: message,
              clientProfile: null,
            });

            throw new Error(message);
          }
        },

        register: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            const res = await authService.register(userData);
            set({ isLoading: false });
            return {
              success: true,
              message:
                res.message ||
                "Registration successful. Please check your email for verification.",
            };
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "Registration failed";
            set({ error: errorMessage, isLoading: false });
            return { success: false, message: errorMessage };
          }
        },

        logout: async () => {
          try {
            // Call the API first (which will handle the token removal)
            await authService.logout();
          } catch (error) {
            console.error('Error during logout:', error);
            // Even if there's an error, we want to clear the local state
          } finally {
            // Clear local state regardless of API call success
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              clientProfile: null,
              error: null,
              isLoading: false,
            });
          }
        },

        fetchClientProfile: async () => {
          try {
            const { clientProfile } = await authService.getMe();
            if (clientProfile) {
              set({ clientProfile });
            }
          } catch (error) {
            console.error("Failed to fetch client profile:", error);
          }
        },

        fetchAllUserData: async () => {
          try {
            const { user, clientProfile } = await authService.getMe();
            set({
              user,
              clientProfile: clientProfile ?? null,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            // If it's an auth error, clear the auth state
            if (error?.name === 'AuthError') {
              set({
                user: null,
                tokens: null,
                isAuthenticated: false,
                clientProfile: null,
                isLoading: false,
                error: error.message,
              });
              return;
            }
            // For other errors, just log them
            console.error("Failed to fetch all user data:", error);
            set({ 
              isLoading: false,
              error: error?.message || 'Failed to fetch user data'
            });
          }
        },

        updateClientProfile: async (profileData: Partial<ClientProfile>) => {
          try {
            const updatedProfile = await authService.updateProfile(profileData);
            set({ clientProfile: updatedProfile });
          } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
          }
        },

        setError: (error: string | null) => set({ error }),

        setTokens: (tokens: Tokens | null) =>
          set((state) => ({
            tokens,
            isAuthenticated: !!tokens && !!state.user,
          })),

        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: "auth-storage",
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