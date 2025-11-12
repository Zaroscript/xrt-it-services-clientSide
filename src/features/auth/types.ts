

export interface User {
  id: string;
  email: string;
  name: string;
  fName?: string;
  lName?: string;
  phone?: string;
  businessName?: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessZipCode?: string;
  businessCountry?: string;
  websiteUrl?: string;
  requiresBusinessInfo?: boolean;
  token?: string; // Optional token for authenticated requests
  isApproved?: boolean; // Indicates if the user's account is approved
  role?: string; // User role (e.g., 'admin', 'user')
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fName: string;
  lName: string;
  phone: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessZipCode?: string;
  businessCountry?: string;
  oldWebsite?: string;
  hasExistingWebsite?: boolean;
}

export interface GoogleAuthCredentials {
  idToken: string;
  name: string;
  email: string;
  phoneNumber?: string;
  businessName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Types for async thunk actions
export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZipCode: string;
  businessCountry: string;
  hasExistingWebsite: boolean;
  websiteUrl?: string;
  requiresBusinessInfo?: boolean;
}

// Type for error responses
export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

export interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export interface GoogleCredentialResponse {
  credential?: string;
  select_by?: string;
}

// Type guard for ApiError
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
}
