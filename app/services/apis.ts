
const BASE_URL: string = process.env.PUBLIC_API_BASE_URL as string; // Replace with your actual base URL

export const endpoints: Record<string, string> = {
  SENDOTP_API: `${BASE_URL}/auth/sendotp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
  
  // Admin API endpoints
  ADMIN_LOGIN_API: `${BASE_URL}/admin`,
  
  // Matrimonial API endpoints
  CREATE_PROFILE_API: `${BASE_URL}/createProfile`,
  UPDATE_PROFILE_API: `${BASE_URL}/updateProfile`,
  DELETE_PROFILE_API: `${BASE_URL}/deleteProfile`,
  GET_MATCHES_API: `${BASE_URL}/matches`,
};
