import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// Types for User and Client
export type User = {
  _id: string;
  email: string;
  fName: string;
  lName: string;
  phone: string;
  role: 'super-admin' | 'admin' | 'client' | 'subscriber';
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ClientProfile = {
  _id: string;
  user: string; // User ID
  companyName: string;
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
  isActive: boolean;
  services?: string[];
  currentPlan?: string;
  createdAt: string;
  updatedAt: string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: (User & { clientProfile?: ClientProfile }) | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  // Authentication
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    fName: string;
    lName: string;
    phone: string;
    companyName: string;
    oldWebsite?: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  
  // Client Profile
  fetchClientProfile: (userId: string) => Promise<void>;
  updateClientProfile: (profileData: Partial<ClientProfile>) => Promise<void>;
  
  // State Management
  setUser: (user: User | null) => void;
  setClientProfile: (profile: ClientProfile) => void;
  setTokens: (tokens: Tokens | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

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
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Login failed');
            }

            // After successful login, fetch client profile if user is a client
            let clientProfile = null;
            if (data.data.user.role === 'client') {
              try {
                const clientResponse = await fetch(`/api/clients/user/${data.data.user._id}`);
                if (clientResponse.ok) {
                  const clientData = await clientResponse.json();
                  clientProfile = clientData.data;
                }
              } catch (error) {
                console.error('Failed to fetch client profile:', error);
              }
            }

            set({
              user: { ...data.data.user, clientProfile },
              tokens: data.data.tokens,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: any) {
            set({
              error: error.message || 'An error occurred during login',
              isLoading: false,
            });
            throw error;
          }
        },

        register: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            // 1. Register the user
            console.log('Sending registration request with data:', {
              ...userData,
              password: '[REDACTED]', // Don't log the actual password
              role: 'client'
            });

            const registerResponse = await fetch('/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...userData,
                role: 'client', // Ensure role is set to client
              }),
            });

            const registerData = await registerResponse.json();
            console.log('Registration response:', {
              status: registerResponse.status,
              statusText: registerResponse.statusText,
              data: registerData
            });

            if (!registerResponse.ok) {
              const errorMessage = registerData.message || 'Registration failed';
              console.error('Registration failed:', {
                status: registerResponse.status,
                error: errorMessage,
                response: registerData
              });
              throw new Error(errorMessage);
            }

            // 2. Create client profile
            const clientResponse = await fetch('/api/clients', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: userData.email,
                fName: userData.fName,
                lName: userData.lName,
                phone: userData.phone,
                companyName: userData.companyName,
                oldWebsite: userData.oldWebsite,
              }),
            });

            if (!clientResponse.ok) {
              const errorData = await clientResponse.json();
              throw new Error(errorData.message || 'Failed to create client profile');
            }

            set({ isLoading: false });
            return { 
              success: true, 
              message: 'Registration successful. Please wait for admin approval.' 
            };
          } catch (error: any) {
            set({
              error: error.message || 'An error occurred during registration',
              isLoading: false,
            });
            throw error;
          }
        },

        logout: async () => {
          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
              credentials: 'include',
            });
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            set({
              user: null,
              tokens: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        },

        refreshToken: async () => {
          try {
            const response = await fetch('/api/auth/refresh', {
              method: 'POST',
              credentials: 'include',
            });

            if (!response.ok) {
              throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            set({
              tokens: data.data.tokens,
              isAuthenticated: true,
            });
            return true;
          } catch (error) {
            get().logout();
            return false;
          }
        },

        fetchClientProfile: async (userId: string) => {
          try {
            const response = await fetch(`/api/clients/user/${userId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch client profile');
            }
            
            const data = await response.json();
            set(state => ({
              user: state.user ? { ...state.user, clientProfile: data.data } : null
            }));
          } catch (error) {
            console.error('Error fetching client profile:', error);
            throw error;
          }
        },

        updateClientProfile: async (profileData: Partial<ClientProfile>) => {
          try {
            const { user } = get();
            if (!user?.clientProfile?._id) {
              throw new Error('No client profile found');
            }

            const response = await fetch(`/api/clients/${user.clientProfile._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(profileData),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to update profile');
            }

            const updatedProfile = await response.json();
            set(state => ({
              user: state.user ? { 
                ...state.user, 
                clientProfile: { ...state.user.clientProfile, ...updatedProfile.data } 
              } : null
            }));
          } catch (error) {
            console.error('Error updating client profile:', error);
            throw error;
          }
        },

        // State setters
        setUser: (user) => set({ user }),
        setClientProfile: (clientProfile) => 
          set(state => ({ 
            user: state.user ? { ...state.user, clientProfile } : null 
          })),
        setTokens: (tokens) => set({ tokens }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useAuthStore;