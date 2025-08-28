// apiendpoints.ts

// Ensure BASE_URL is always available
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Define endpoints consistently as relative paths
export const endpoints = {
  SENDOTP_API: `/send-otp`,
  SIGNUP_API: `/signup`,
  LOGIN_API: `/login`,
  RESETPASSTOKEN_API: `/auth/reset-password-token`,
  RESETPASSWORD_API: `/auth/reset-password`,
  BECOME_A_MEMBER_API: `/become-a-member`,
  HELP_FORM_API:`/help-form`,

  // Admin
  ADMIN_LOGIN_API: `/admin`,

  // Matrimonial
  CREATE_PROFILE_API: `/createProfile`,
  UPDATE_PROFILE_API: `/updateProfile`,
  DELETE_PROFILE_API: `/deleteProfile`,
  GET_MATCHES_API: `/matches`,
};
