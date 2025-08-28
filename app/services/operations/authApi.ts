// utils/authApi.ts
import axios, { AxiosError } from "axios";

const API_BASE_URL =
  process.env.PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // needed if you're using cookies for auth
});

// Attach token to headers automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // adjust if using cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- Types ----------------
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

interface ApiMessage {
  message: string;
}

// ---------------- API ----------------
class AuthApi {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);

      // Save token in localStorage
      localStorage.setItem("authToken", response.data.token);

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Login failed");
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", data);

      localStorage.setItem("authToken", response.data.token);

      return response.data;
    } catch (error) {
      throw this.handleError(error, "Registration failed");
    }
  }

  async logout(): Promise<ApiMessage> {
    try {
      const response = await api.post<ApiMessage>("/auth/logout");
      localStorage.removeItem("authToken");
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Logout failed");
    }
  }

  async getCurrentUser(): Promise<AuthResponse["user"]> {
    try {
      const response = await api.get<AuthResponse>("/auth/me");
      return response.data.user;
    } catch (error) {
      throw this.handleError(error, "Failed to get user data");
    }
  }

  async resetPasswordRequest(email: string): Promise<ApiMessage> {
    try {
      const response = await api.post<ApiMessage>(
        "/auth/reset-password-request",
        { email }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Password reset request failed");
    }
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiMessage> {
    try {
      const response = await api.post<ApiMessage>("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Password reset failed");
    }
  }

  // ---------------- Helpers ----------------
  private handleError(error: unknown, fallbackMessage: string): Error {
    const err = error as AxiosError<{ message: string }>;
    return new Error(err.response?.data?.message || fallbackMessage);
  }
}

// Export singleton
export const authApi = new AuthApi();
