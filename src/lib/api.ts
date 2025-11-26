// src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/custom-toast';
import { getToken, setToken, clearAuthData } from './auth';

// Extend the AxiosRequestConfig type to include our custom property
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Important for cookies
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip adding token for public auth routes (login/register)
    // We DO want to add token for /auth/me and other protected auth routes
    const isPublicAuthRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
    
    if (!isPublicAuthRoute && !config.skipAuthRefresh) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    // If the response contains a new access token, store it
    const newToken = response.data?.data?.accessToken;
    if (newToken) {
      setToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If this is a login/register request or already a retry, just reject
      // Allow retry for /auth/me
      const isPublicAuthRoute = originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register');
      
      if (isPublicAuthRoute || originalRequest._retry) {
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/refresh-token`,
          {},
          { 
            withCredentials: true,
            // Don't use the interceptor for the refresh token request
            skipAuthRefresh: true
          }
        );
        
        const { accessToken } = refreshResponse.data.data;
        if (accessToken) {
          // Use our auth utility to store the token
          setToken(accessToken);
          
          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        
        // Clear all auth data on refresh failure
        clearAuthData();
        
        // Only redirect if we're not already on the login page and we're in a browser context
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          const loginUrl = new URL('/auth/login', window.location.origin);
          loginUrl.searchParams.set('session_expired', 'true');
          window.location.href = loginUrl.toString();
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // For other errors, just pass them through
    return Promise.reject(error);
  }
);

export default api;