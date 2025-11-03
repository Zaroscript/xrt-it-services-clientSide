

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phoneNumber: string;
  businessName: string;
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

export interface RegisterPayload extends LoginPayload {
  name: string;
  phoneNumber: string;
  businessName: string;
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
