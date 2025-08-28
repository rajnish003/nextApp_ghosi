'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuthStore } from '@/_zustand/authStore';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

interface FormErrors {
  passwordMatch: boolean;
  passwordLength: boolean;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    passwordMatch: false,
    passwordLength: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Get auth store methods
  const { sendOtp, loading, error } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'confirmPassword' || name === 'password') {
      setErrors(prev => ({
        ...prev,
        passwordMatch:
          (name === 'confirmPassword' && formData.password !== value) ||
          (name === 'password' && formData.confirmPassword !== value),
        passwordLength: name === 'password' && value.length < 8,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    // Basic validations
    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, passwordLength: true }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, passwordMatch: true }));
      return;
    }

    try {
      // First, send OTP
      await sendOtp(
        formData.email,
        () => {
          // Store registration data temporarily
          localStorage.setItem('signupData', JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password
          }));
          router.push("/matrimonial/register/otp");
        }
      );
    } catch (err) {
      console.error('OTP send error:', err);
    }
  };



  return (
    <div className="min-h-screen py-20 bg-gray-50 mt-2">
      <div className="max-w-5xl mx-auto flex bg-white shadow-md overflow-hidden rounded-2xl">
        {/* Image Section */}
        <div className="hidden lg:block h-auto lg:w-1/2 bg-cover bg-center">
          <Image
            src="/image/matrimonial_home.png"
            alt="Matrimonial Home"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            {/* Show error message from auth store */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-800 via-gray-500 to-green-800 text-transparent bg-clip-text">
              Create Account
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Password Field with Eye Icon */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.passwordLength ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                />
                <span
                  className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
                {errors.passwordLength && (
                  <p className="mt-1 text-sm text-red-600">Password must be at least 8 characters</p>
                )}
              </div>

              {/* Confirm Password Field with Eye Icon */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.passwordMatch ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                />
                <span
                  className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
                {errors.passwordMatch && (
                  <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  // onClick= {handleRegistration}
                  disabled={loading}
                  className={`text-white font-bold bg-gradient-to-r from-green-800 via-gray-500 to-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full px-5 py-2.5 text-center ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Sending OTP...' : 'Sign up'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/matrimonial/login" className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;