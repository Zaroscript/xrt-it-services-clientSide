import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useAuthStore from "@/store/useAuthStore";

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export abstract class BaseApiService {
  protected readonly http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.http.interceptors.request.use((config) => {
      const token = useAuthStore.getState().tokens?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private initializeResponseInterceptor() {
    this.http.interceptors.response.use(
      (res) => res,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout(); // clears storage & redirects
        }
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.get<T>(url, config)).data;
  }

  protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.post<T>(url, data, config)).data;
  }

  protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.put<T>(url, data, config)).data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.delete<T>(url, config)).data;
  }
}
