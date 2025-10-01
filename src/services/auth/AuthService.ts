import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  GoogleAuthCredentials,
} from "@/features/auth/types";
import { BaseApiService } from "../api/BaseApiService";

declare global {
  interface Window {
    google: any;
  }
}

class AuthService extends BaseApiService {
  private static instance: AuthService;
  private static readonly AUTH_ENDPOINT = "/auth";

  private constructor(baseURL: string) {
    super(baseURL);
  }

  public static getInstance(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || ""
  ): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(baseURL);
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(
      `${AuthService.AUTH_ENDPOINT}/login`,
      credentials
    );
    this.setAuthToken(response.token);
    return response;
  }

  public async register(userData: RegisterData): Promise<AuthResponse> {
    // The registration endpoint will now receive the additional fields (phoneNumber, businessName)
    // from the RegisterData interface
    const response = await this.post<AuthResponse>(
      `${AuthService.AUTH_ENDPOINT}/register`,
      userData
    );
    this.setAuthToken(response.token);
    return response;
  }

  public async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getAuthToken();
      if (!token) return null;

      return await this.get<User>(`${AuthService.AUTH_ENDPOINT}/me`);
    } catch (error) {
      this.clearAuthToken();
      return null;
    }
  }

  // Initialize Google Auth
  public initializeGoogleAuth(
    clientId: string,
    onSuccess: (response: AuthResponse) => void,
    onFailure: (error: unknown) => void
  ) {
    if (typeof window === 'undefined') return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: GoogleCredentialResponse) => {
        try {
          const res = await this.http.post<AuthResponse>(
            `${AuthService.AUTH_ENDPOINT}/google`,
            { credential: response.credential }
          );
          if (res.data.token) {
            this.setAuthToken(res.data.token);
          }
          onSuccess(res.data);
        } catch (error) {
          onFailure(error);
        }
      },
    });
  }

  // Render Google Sign-In button
  public renderGoogleButton(buttonId: string) {
    if (typeof window === 'undefined') return;
    
    window.google.accounts.id.renderButton(
      document.getElementById(buttonId),
      { 
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      }
    );
  }

  // Alternative: Google Auth with redirect
  public async loginWithGoogle(credentials: GoogleAuthCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(
      `${AuthService.AUTH_ENDPOINT}/google`,
      credentials
    );
    if (response.token) {
      this.setAuthToken(response.token);
    }
    return response;
  }

  public async logout(): Promise<void> {
    try {
      await this.post(`${AuthService.AUTH_ENDPOINT}/logout`);
    } finally {
      this.clearAuthToken();
    }
  }

  private setAuthToken(token: string): void {
    localStorage.setItem("token", token);
    this.updateAxiosInstance();
  }

  private getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  private clearAuthToken(): void {
    localStorage.removeItem("token");
    this.updateAxiosInstance();
  }

  private updateAxiosInstance(): void {
    const token = this.getAuthToken();
    if (token) {
      this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.http.defaults.headers.common["Authorization"];
    }
  }
}

export const authService = AuthService.getInstance();
