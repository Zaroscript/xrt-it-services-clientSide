import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export abstract class BaseApiService {
  protected readonly http: AxiosInstance;
  protected baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.http.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.http.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(this.normalizeError(error as AxiosError<ApiErrorResponse>));
      }
    );
  }

  private normalizeError(error: AxiosError<ApiErrorResponse>) {
    const responseData = error.response?.data || {};
    const normalizedError: any = {
      status: error.response?.status,
      message: responseData.message || error.message,
      data: responseData,
      isAxiosError: true,
      config: error.config,
      code: error.code,
      request: error.request,
      response: error.response,
    };

    // Handle validation errors (400 Bad Request with error details)
    if (error.response?.status === 400 && responseData) {
      // If the error has a 'message' field, use it as the error message
      if (responseData.message) {
        normalizedError.message = responseData.message;
      }
      
      // If there are validation errors, add them to the error object
      if (responseData.errors) {
        normalizedError.validationErrors = responseData.errors;
      } else if (responseData.error) {
        // Some APIs might use 'error' instead of 'errors'
        normalizedError.validationErrors = responseData.error;
      } else if (typeof responseData === 'object') {
        // If the entire response is an object with error details, use it
        normalizedError.validationErrors = responseData;
      }
    }

    return normalizedError;
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.get<T>(url, config);
    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.http.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.http.put<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.delete<T>(url, config);
    return response.data;
  }
}
