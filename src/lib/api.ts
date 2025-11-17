import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const { tokens } = useAuthStore.getState();
        if (tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;
        
        // If error is 401 and we haven't tried to refresh yet
        // Skip token refresh for logout requests to prevent infinite loop
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/logout')) {
          originalRequest._retry = true;
          
          try {
            const { tokens } = useAuthStore.getState();
            if (tokens?.refreshToken) {
              const { data } = await axios.post(
                `${API_URL}/auth/refresh`,
                { refreshToken: tokens.refreshToken },
                { withCredentials: true }
              );
              
              useAuthStore.getState().setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              });
              
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
              return this.instance(originalRequest);
            }
          } catch (error) {
            // If refresh fails, log the user out
            useAuthStore.getState().logout();
            return Promise.reject(error);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

export const api = new ApiClient();