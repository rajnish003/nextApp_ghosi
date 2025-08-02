// store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../app/services/apiconnector';
import { endpoints } from '../app/services/apis';

// Error response type
interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// API Response types
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

// Enhanced User type
type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  isVerified?: boolean;
};

// Registration form data
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// Login credentials
interface LoginCredentials {
  email: string;
  password: string;
}



// Auth state interface
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  isAuthenticated: boolean;

  // State setters
  setLoading: (isLoading: boolean) => void;
  setError: (errorMessage: string | null) => void;
  setSuccess: (successMessage: string | null) => void;
  clearMessages: () => void;

  // Auth actions
  sendOtp: (email: string, navigate: (path: string) => void) => Promise<void>;
  verifyOtp: (email: string, otp: string, navigate?: (path: string) => void) => Promise<void>;
  register: (userData: RegisterFormData, navigate?: (path: string) => void) => Promise<void>;
  login: (credentials: LoginCredentials, navigate?: (path: string) => void) => Promise<void>;
  logout: (navigate?: (path: string) => void) => void;
  refreshToken: () => Promise<void>;
  checkAuthStatus: () => void;


}

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

      // State management actions
      setLoading: (isLoading: boolean) => set({ loading: isLoading }),
      
      setError: (errorMessage: string | null) => set({ error: errorMessage }),
      
      setSuccess: (successMessage: string | null) => set({ success: successMessage }),
      
      clearMessages: () => set({ error: null, success: null }),

      // Send OTP
      sendOtp: async (email: string, navigate: (path: string) => void) => {
        const toastId = toast.loading("Sending OTP...");
        
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector<ApiResponse<OtpResponse>>("POST", endpoints.SENDOTP_API, {
            email,
            checkUserPresent: true,
          });

          console.log("SENDOTP API RESPONSE:", response);

          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to send OTP");
          }

          const successMessage = "OTP sent successfully! Please check your email.";
          toast.success(successMessage);
          set({ success: successMessage });
          navigate("/verify-email");

        } catch (error) {
          console.error("SENDOTP API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Failed to send OTP. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Verify OTP
      verifyOtp: async (email: string, otp: string, navigate?: (path: string) => void) => {
        const toastId = toast.loading("Verifying OTP...");
        
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector<ApiResponse<OtpResponse>>("POST", endpoints.VERIFYOTP_API, {
            email,
            otp,
          });

          if (!response.data.success) {
            throw new Error(response.data.message || "OTP verification failed");
          }

          const successMessage = "OTP verified successfully!";
          toast.success(successMessage);
          set({ success: successMessage });
          
          if (navigate) {
            navigate("/complete-registration");
          }

        } catch (error) {
          console.error("VERIFYOTP API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'OTP verification failed. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Register user - CORRECTED
      register: async (userData: RegisterFormData, navigate?: (path: string) => void) => {
        const toastId = toast.loading("Creating account...");
        
        try {
          set({ loading: true, error: null, success: null });

          // Optional: Add validation
          if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            throw new Error("All fields are required");
          }

          if (userData.confirmPassword && userData.password !== userData.confirmPassword) {
            throw new Error("Passwords do not match");
          }

          // Transform form data to match API expectations
          const apiData = {
            name: `${userData.firstName} ${userData.lastName}`.trim(),
            email: userData.email,
            password: userData.password,
          };

          const response = await apiConnector<ApiResponse<AuthResponse>>("POST", endpoints.SIGNUP_API, apiData);

          if (!response.data.success) {
            throw new Error(response.data.message || "Registration failed");
          }

          const { user, token } = response.data.data!;
          const successMessage = "Registration successful! Welcome aboard!";
          
          toast.success(successMessage);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            success: successMessage 
          });

          if (navigate) {
            navigate("/dashboard");
          }

        } catch (error) {
          console.error("REGISTER API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Registration failed. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Login user
      login: async (credentials: LoginCredentials, navigate?: (path: string) => void) => {
        const toastId = toast.loading("Signing in...");
        
        try {
          set({ loading: true, error: null, success: null });

          // Validate credentials
          if (!credentials.email || !credentials.password) {
            throw new Error("Email and password are required");
          }

          // Ensure credentials object structure
          const loginData = {
            email: credentials.email.trim(),
            password: credentials.password,
          };

          const response = await apiConnector<ApiResponse<AuthResponse>>("POST", endpoints.LOGIN_API, loginData);

          if (!response.data.success) {
            throw new Error(response.data.message || "Login failed");
          }

          const { user, token } = response.data.data!;
          const successMessage = `Welcome back, ${user.name}!`;
          
          toast.success(successMessage);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            success: successMessage 
          });

          if (navigate) {
            navigate("/dashboard");
          }

        } catch (error) {
          console.error("LOGIN API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Login failed. Please check your credentials.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Logout user
      logout: (navigate?: (path: string) => void) => {
        try {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            error: null, 
            success: "Logged out successfully!" 
          });
          
          toast.success("Logged out successfully!");
          
          if (navigate) {
            navigate("/login");
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          const currentToken = get().token;
          if (!currentToken) return;

          const response = await apiConnector<ApiResponse<{ token: string }>>("POST", endpoints.REFRESH_TOKEN_API, {
            token: currentToken
          });

          if (response.data.success && response.data.data) {
            set({ token: response.data.data.token });
          } else {
            // Token refresh failed, logout user
            get().logout();
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          get().logout();
        }
      },

      // Check authentication status
      checkAuthStatus: () => {
        const { token, user } = get();
        
        if (token && user) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },


    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Utility hook for auth status
export const useAuth = () => {
  const store = useAuthStore();
  
  // Check auth status on first load
  useEffect(() => {
    store.checkAuthStatus();
  }, [store]);

  return {
    ...store,
    // Computed values
    isLoggedIn: store.isAuthenticated && !!store.user,
    userName: store.user?.name || '',
    userEmail: store.user?.email || '',
  };
};