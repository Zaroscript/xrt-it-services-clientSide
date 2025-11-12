import { LoginCredentials, RegisterData, AuthResponse, User } from "@/features/auth/types";
import { BaseApiService } from "@/services/api/BaseApiService";

export class AuthService extends BaseApiService {
  private static instance: AuthService;
  private static readonly AUTH_ENDPOINT = "/auth";
  private user: User | null = null;

  private constructor(baseURL: string) {
    super(baseURL);
    this.loadUserFromStorage();
  }

  public static getInstance(baseURL: string = process.env.NEXT_PUBLIC_API_URL || ""): AuthService {
    if (!AuthService.instance && baseURL) {
      AuthService.instance = new AuthService(baseURL);
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        if (userData?.token) {
          this.user = userData;
          this.setAuthToken(userData.token);
        }
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      this.clearUserFromStorage();
    }
  }

  private clearUserFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('user');
    this.user = null;
    this.clearAuthToken();
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    const response = await this.http.post<AuthResponse>(
      `${AuthService.AUTH_ENDPOINT}/login`,
      credentials
    );
    
    if (!response.data.user || !response.data.token) {
      throw new Error('Invalid response from server');
    }
    
    this.user = { ...response.data.user, token: response.data.token };
    this.setAuthToken(response.data.token);
    this.saveUserToStorage(this.user);
    
    return response.data;
  }

  public async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Ensure we don't double the /api/v1 part in the URL
      const endpoint = AuthService.AUTH_ENDPOINT.startsWith('/') 
        ? AuthService.AUTH_ENDPOINT.substring(1) 
        : AuthService.AUTH_ENDPOINT;
      
      const url = `${endpoint}/register`;
      console.log('Sending registration request to:', `${this.baseURL}${url}`);
      console.log('Registration payload:', JSON.stringify(userData, null, 2));
      
      const response = await this.http.post<AuthResponse>(
        url,  // Use the cleaned URL without leading slash
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );
      
      console.log('Registration response:', response);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      this.user = { ...response.data.user, token: response.data.token };
      this.setAuthToken(response.data.token);
      this.saveUserToStorage(this.user);
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
          headers: error.config?.headers,
        }
      });
      
      // If we have a response with data, use that as the error message
      if (error.response?.data) {
        throw new Error(
          typeof error.response.data === 'object' 
            ? JSON.stringify(error.response.data) 
            : error.response.data
        );
      }
      
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.http.post(`${AuthService.AUTH_ENDPOINT}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearUserFromStorage();
    }
  }

  public getCurrentUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.user?.token;
  }

  private saveUserToStorage(user: User): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

  private setAuthToken(token: string): void {
    if (this.http) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  private clearAuthToken(): void {
    if (this.http) {
      delete this.http.defaults.headers.common['Authorization'];
    }
  }
}

export const authService = AuthService.getInstance();
