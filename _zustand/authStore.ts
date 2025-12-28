import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios, { AxiosInstance } from "axios";
import { endpoints, BASE_URL } from '../app/services/apis';

// Create API connector instance
const apiConnector: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Types
interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface OtpResponse {
  message: string;
}

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  isVerified?: boolean;
};

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  isAuthenticated: boolean;

  setLoading: (isLoading: boolean) => void;
  setError: (errorMessage: string | null) => void;
  setSuccess: (successMessage: string | null) => void;
  clearMessages: () => void;

  sendOtp: (email: string, navigate: (path: string) => void) => Promise<void>;
  verifyOtp: (email: string, otp: string, navigate?: (path: string) => void) => Promise<void>;
  register: (userData: RegisterFormData, navigate?: (path: string) => void) => Promise<void>;
  login: (credentials: LoginCredentials, navigate?: (path: string) => void) => Promise<void>;
  logout: (navigate?: (path: string) => void) => void;
  checkAuthStatus: () => void;
}

// Zustand Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      loading: false,
      error: null,
      success: null,
      isAuthenticated: false,

      // State setters
      setLoading: (isLoading) => set({ loading: isLoading }),
      setError: (errorMessage) => set({ error: errorMessage }),
      setSuccess: (successMessage) => set({ success: successMessage }),
      clearMessages: () => set({ error: null, success: null }),

      // Send OTP
      sendOtp: async (email, navigate) => {
        const toastId = toast.loading("Sending OTP...");
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector.post<ApiResponse<OtpResponse>>(
            endpoints.SENDOTP_API,
            { email, checkUserPresent: true }
          );

          if (!response.data.success) throw new Error(response.data.message);

          localStorage.setItem('email', email);
          const successMessage = "OTP sent successfully! Please check your email.";
          toast.success(successMessage);
          set({ success: successMessage });

          navigate("/matrimonial/register/otp");
        } catch (error) {
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || err.message || 'Failed to send OTP';
          console.error("SENDOTP API ERROR:", error);
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Verify OTP
      verifyOtp: async (email, otp, navigate) => {
        const toastId = toast.loading("Verifying OTP...");
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector.post<ApiResponse<OtpResponse>>(
            endpoints.VERIFYOTP_API,
            { email, otp }
          );

          if (!response.data.success) throw new Error(response.data.message);

          toast.success("OTP verified successfully!");
          if (navigate) navigate("/matrimonial/register/complete-profile");
        } catch (error) {
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || err.message || 'OTP verification failed';
          console.error("VERIFYOTP API ERROR:", error);
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Register user
      register: async (userData, navigate) => {
        const toastId = toast.loading("Creating account...");
        try {
          set({ loading: true, error: null, success: null });

          if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            throw new Error("All fields are required");
          }

          const apiData = {
            name: `${userData.firstName} ${userData.lastName}`.trim(),
            email: userData.email,
            password: userData.password,
          };

          const response = await apiConnector.post<ApiResponse<AuthResponse>>(
            endpoints.SIGNUP_API,
            apiData
          );

          if (!response.data.success) throw new Error(response.data.message);

          const { user, token } = response.data.data!;
          toast.success("Registration successful!");
          set({
            user,
            token,
            isAuthenticated: true,
            success: "Account created successfully!",
          });

          if (navigate) navigate("/dashboard");
        } catch (error) {
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
          console.error("REGISTER API ERROR:", error);
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Login user
      login: async (credentials, navigate) => {
        const toastId = toast.loading("Signing in...");
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector.post<ApiResponse<AuthResponse>>(
            endpoints.LOGIN_API,
            {
              email: credentials.email.trim(),
              password: credentials.password,
            }
          );

          if (!response.data.success) throw new Error(response.data.message);

          const { user, token } = response.data.data!;
          toast.success(`Welcome back, ${user.name}!`);
          set({
            user,
            token,
            isAuthenticated: true,
            success: "Logged in successfully!",
          });

          if (navigate) navigate("/dashboard");
        } catch (error) {
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || err.message || 'Login failed';
          console.error("LOGIN API ERROR:", error);
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Logout user
      logout: (navigate) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          success: "Logged out successfully!",
        });
        toast.success("Logged out successfully!");
        localStorage.removeItem('email'); // optional cleanup
        if (navigate) navigate("/login");
      },

      // Check if user is authenticated (useful on app reload)
      checkAuthStatus: () => {
        const { token, user } = get();
        set({ isAuthenticated: !!(token && user) });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Custom hook for cleaner usage
export const useAuth = () => {
  const store = useAuthStore();

  useEffect(() => {
    store.checkAuthStatus();
  }, [store]);

  return {
    ...store,
    isLoggedIn: store.isAuthenticated && !!store.user,
    userName: store.user?.name || '',
    userEmail: store.user?.email || '',
  };
};