import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL, endpoints } from '../app/services/apis';

// ---------- Form Data Interface ----------
interface FormData {
  fullName: string;
  dobAge: string;
  area: string;
  district: string;
  pinCode: string;
  state: string;
  country: string;
  education: string;
  educationOther: string;
  occupation: string;
  occupationOther: string;
  mobile: string;
  email: string;
  maritalStatus: string;
  familyMembers: string;
  volunteer: string;
  volunteerSkills: string;
  additionalInfo: string;
}

// ---------- Store State Interface ----------
interface MemberFormState {
  formData: FormData;
  loading: boolean;
  error: string | null;
  success: string | null;

  // Actions
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  resetForm: () => void;
  setLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  setSuccess: (message: string | null) => void;
  submitForm: () => Promise<void>;
}

// ---------- Initial State ----------
const initialFormState: FormData = {
  fullName: '',
  dobAge: '',
  area: '',
  district: '',
  pinCode: '',
  state: '',
  country: '',
  education: '',
  educationOther: '',
  occupation: '',
  occupationOther: '',
  mobile: '',
  email: '',
  maritalStatus: '',
  familyMembers: '',
  volunteer: '',
  volunteerSkills: '',
  additionalInfo: ''
};

// ---------- API Setup ----------
const apiConnector: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ---------- API Response Type ----------
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ---------- Zustand Store ----------
export const useMemberFormStore = create<MemberFormState>()(
  persist(
    (set, get) => ({
      // State
      formData: initialFormState,
      loading: false,
      error: null,
      success: null,

      // Actions
      updateField: (field, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value
          }
        }));
      },

      resetForm: () => {
        set({
          formData: initialFormState,
          error: null,
          success: null
        });
        toast.success('Form reset successfully');
      },

      setLoading: (status) => {
        set({ loading: status });
      },

      setError: (message) => {
        set({ error: message });
        if (message) toast.error(message);
      },

      setSuccess: (message) => {
        set({ success: message });
        if (message) toast.success(message);
      },

      submitForm: async () => {
        const { formData } = get();
        set({ loading: true, error: null, success: null });

        try {
          // Basic validation
          if (!formData.fullName || !formData.email || !formData.mobile) {
            throw new Error('Please fill in all required fields');
          }

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
          }

          // Mobile validation
          const mobileRegex = /^\d{10}$/;
          if (!mobileRegex.test(formData.mobile)) {
            throw new Error('Please enter a valid 10-digit mobile number');
          }

          // API call
          const response = await apiConnector.post<ApiResponse>(
            endpoints.BECOME_A_MEMBER_API,
            formData
          );

          if (!response.data.success) {
            throw new Error(response.data.message || 'Submission failed');
          }

          set({
            success: 'Form submitted successfully!',
            loading: false,
            formData: initialFormState
          });

          toast.success('Form submitted successfully!');
        } catch (err) {
          let errorMessage = 'Failed to submit form. Please try again.';

          if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || err.message;
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }

          set({
            error: errorMessage,
            loading: false
          });

          toast.error(errorMessage);
        }
      }
    }),
    {
      name: 'member-form-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        formData: state.formData
      })
    }
  )
);
