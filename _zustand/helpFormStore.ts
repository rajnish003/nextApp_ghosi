import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';
// import { BASE_URL, endpoints } from '../app/services/apis';

// ---------- Form Data Interface ----------
interface FormData {
  name: string;
  email: string;
  subject: string;
  issueType: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";
  attachments: File | null;
  contactMethod: "phone" | "email" | "";
  phone: string;
  preferredTime: string;
}

// ---------- Store State Interface ----------
interface HelpFormState {
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
  name: "",
  email: "",
  subject: "",
  issueType: "",
  description: "",
  urgency: "medium",
  attachments: null,
  contactMethod: "",
  phone: "",
  preferredTime: "",
};

// ---------- API Setup (Kept for future use) ----------
// const apiConnector: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// ---------- API Response Type ----------
// interface ApiResponse<T = unknown> {
//   success: boolean;
//   message: string;
//   data?: T;
// }

// ---------- Zustand Store ----------
export const useHelpFormStore = create<HelpFormState>()(
  persist(
    (set, get) => ({
      // State
      formData: initialFormState,
      loading: false,
      error: null,
      success: null,

      // Actions
      updateField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),

      resetForm: () => {
        set({
          formData: initialFormState,
          error: null,
          success: null,
        });
        toast.success('Form reset successfully');
      },

      setLoading: (status) => set({ loading: status }),

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
          // ================ API CALLING IS COMMENTED OUT ================
          // This section is temporarily disabled for development/testing
          // Uncomment and adjust when you're ready to connect to the backend

          /*
          // Client-side validation examples (uncomment as needed)
          if (!formData.name.trim()) {
            throw new Error('Full name is required');
          }

          if (formData.contactMethod === 'phone' && !formData.phone.trim()) {
            throw new Error('Phone number is required');
          }

          if (formData.contactMethod === 'phone') {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(formData.phone.replace(/\s/g, ''))) {
              throw new Error('Please enter a valid 10-digit phone number');
            }
          }

          // Simulate API call
          // const response = await apiConnector.post<ApiResponse>(
          //   endpoints.HELP_FORM_API,
          //   formData
          // );

          // if (!response.data.success) {
          //   throw new Error(response.data.message || 'Submission failed');
          // }

          // Success (mocked)
          */

          // ------------------- MOCK SUCCESS FOR TESTING -------------------
          // Remove this block when real API is enabled
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

          set({
            success: 'Form submitted successfully! (Mock mode)',
            loading: false,
            formData: initialFormState, // Reset form after success
          });

          toast.success('Thank you! Your request has been submitted.');

          // ================ END OF COMMENTED API SECTION ================
        } catch (err) {
          let errorMessage = 'Failed to submit form. Please try again.';

          if (err instanceof Error) {
            errorMessage = err.message;
          }

          set({
            error: errorMessage,
            loading: false,
          });

          toast.error(errorMessage);
        }
      },
    }),
    {
      name: 'help-form-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ formData: state.formData }),
    }
  )
);