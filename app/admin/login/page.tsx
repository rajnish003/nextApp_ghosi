"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { endpoints } from '../../services/apis';

const MySwal = withReactContent(Swal);

interface AdminLoginData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<AdminLoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use the API endpoint from configuration
      const response = await axios.post(endpoints.ADMIN_LOGIN_API, formData);
      
      // Store admin token from response
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', formData.email);

      await MySwal.fire({
        title: 'Login Successful!',
        text: 'Welcome back, Admin!',
        icon: 'success',
        confirmButtonText: 'Go to Dashboard',
      });

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      let errorMessage = 'Login failed. Please try again.';
      
      // Handle axios error responses
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      await MySwal.fire({
        title: 'Login Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Admin Login</h2>
        

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            This is only for Admin access
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Contact system administrator for credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
