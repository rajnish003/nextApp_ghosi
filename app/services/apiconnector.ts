import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";

export const axiosInstance: AxiosInstance = axios.create({});

export const apiConnector = <T = unknown>( // Added generic type T for the response data
  method: Method,
  url: string,
  bodyData?: Record<string, unknown> | FormData, // More specific for bodyData
  headers?: Record<string, string>, // More specific for headers
  params?: Record<string, string | number | boolean> // More specific for params
): Promise<AxiosResponse<T>> => { // Use generic T for AxiosResponse
  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    // Use undefined instead of null for better Axios defaults
    data: bodyData, 
    headers: headers,
    params: params,
  };

  return axiosInstance(config);
};