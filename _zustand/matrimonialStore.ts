// store/matrimonialStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

// Matrimonial Profile types
interface MatrimonialProfile {
  user_id: number;
  dateOfBirth: string;
  gender: string;
  contactNumber?: string;
  height: string;
  maritalStatus: string;
  weight: string;
  education: string;
  occupation: string;
  income: string;
  country: string;
  state: string;
  city: string;
  hobbies: string;
  about_me: string;
}

interface MatrimonialMatch {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  education: string;
  occupation: string;
  location: string;
  image?: string;
}

// Matrimonial state interface
interface MatrimonialState {
  // State
  profile: MatrimonialProfile | null;
  matches: MatrimonialMatch[];
  loading: boolean;
  error: string | null;
  success: string | null;

  // State setters
  setLoading: (isLoading: boolean) => void;
  setError: (errorMessage: string | null) => void;
  setSuccess: (successMessage: string | null) => void;
  clearMessages: () => void;

  // Matrimonial actions
  createProfile: (profileData: MatrimonialProfile, navigate?: (path: string) => void) => Promise<void>;
  updateProfile: (profileData: Partial<MatrimonialProfile>, navigate?: (path: string) => void) => Promise<void>;
  deleteProfile: (navigate?: (path: string) => void) => Promise<void>;
  getMatches: (userId: number) => Promise<MatrimonialMatch[]>;
  setProfile: (profile: MatrimonialProfile | null) => void;
  setMatches: (matches: MatrimonialMatch[]) => void;
}

export const useMatrimonialStore = create<MatrimonialState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      matches: [],
      loading: false,
      error: null,
      success: null,

      // State management actions
      setLoading: (isLoading: boolean) => set({ loading: isLoading }),
      
      setError: (errorMessage: string | null) => set({ error: errorMessage }),
      
      setSuccess: (successMessage: string | null) => set({ success: successMessage }),
      
      clearMessages: () => set({ error: null, success: null }),

      setProfile: (profile: MatrimonialProfile | null) => set({ profile }),
      
      setMatches: (matches: MatrimonialMatch[]) => set({ matches }),

      // Create Matrimonial Profile
      createProfile: async (profileData: MatrimonialProfile, navigate?: (path: string) => void) => {
        const toastId = toast.loading("Creating matrimonial profile...");
        
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector<ApiResponse<{ profile: MatrimonialProfile }>>("POST", endpoints.CREATE_PROFILE_API, profileData as unknown as Record<string, unknown>);

          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to create profile");
          }

          const successMessage = "Matrimonial profile created successfully!";
          toast.success(successMessage);
          set({ success: successMessage, profile: response.data.data?.profile || null });

          if (navigate) {
            navigate("/matrimonial/profile");
          }

        } catch (error) {
          console.error("CREATE PROFILE API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Failed to create profile. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Update Matrimonial Profile
      updateProfile: async (profileData: Partial<MatrimonialProfile>, navigate?: (path: string) => void) => {
        const toastId = toast.loading("Updating matrimonial profile...");
        
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector<ApiResponse<{ profileDetails: MatrimonialProfile }>>("PUT", endpoints.UPDATE_PROFILE_API, profileData as unknown as Record<string, unknown>);

          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to update profile");
          }

          const successMessage = "Profile updated successfully!";
          toast.success(successMessage);
          set({ success: successMessage, profile: response.data.data?.profileDetails || null });

          if (navigate) {
            navigate("/matrimonial/profile");
          }

        } catch (error) {
          console.error("UPDATE PROFILE API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Failed to update profile. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Delete Matrimonial Profile
      deleteProfile: async (navigate?: (path: string) => void) => {
        const toastId = toast.loading("Deleting matrimonial profile...");
        
        try {
          set({ loading: true, error: null, success: null });

          const response = await apiConnector<ApiResponse>("DELETE", endpoints.DELETE_PROFILE_API);

          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to delete profile");
          }

          const successMessage = "Profile deletion scheduled successfully!";
          toast.success(successMessage);
          set({ success: successMessage, profile: null });

          if (navigate) {
            navigate("/matrimonial");
          }

        } catch (error) {
          console.error("DELETE PROFILE API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Failed to delete profile. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },

      // Get Matrimonial Matches
      getMatches: async (userId: number): Promise<MatrimonialMatch[]> => {
        try {
          set({ loading: true, error: null });

          const response = await apiConnector<ApiResponse<MatrimonialMatch[]>>("GET", `${endpoints.GET_MATCHES_API}/${userId}`);

          if (!response.data.success) {
            throw new Error(response.data.message || "Failed to fetch matches");
          }

          const matches = response.data.data || [];
          set({ matches });
          return matches;

        } catch (error) {
          console.error("GET MATCHES API ERROR:", error);
          const err = error as ErrorResponse;
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Failed to fetch matches. Please try again.';
          toast.error(errorMessage);
          set({ error: errorMessage });
          return [];
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'matrimonial-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        profile: state.profile,
        matches: state.matches
      }),
    }
  )
);

// Utility hook for matrimonial functionality
export const useMatrimonial = () => {
  const store = useMatrimonialStore();
  
  return {
    ...store,
    // Computed values
    hasProfile: !!store.profile,
    matchCount: store.matches.length,
  };
}; 