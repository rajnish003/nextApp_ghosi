// apiconnector.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./apis";

// Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for attaching token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiConnector = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config),
};

export default api;
