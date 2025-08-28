'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/_zustand/authStore';

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  // Get auth store methods
  const { verifyOtp,register, loading, error } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem('email');
      const signupDataString = localStorage.getItem('signupData');
      console.log("signupDataString:", signupDataString);

      if (!email || !signupDataString) {
        throw new Error('Signup data not found. Please register again.');
      }

       // First verify OTP
      await verifyOtp(email, otp);

      // After OTP verification, proceed with registration
      const signupData = JSON.parse(signupDataString);
      await register(
        {
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
          password: signupData.password
        },
        () => {
          // Clean up stored data after successful registration
          localStorage.removeItem('signupData');
          localStorage.removeItem('email');
          router.push('/matrimonial/login');
        }
      );
    } catch (err) {
      console.error('OTP Verification or Registration failed:', err);
      // Handle error display via the store's error state
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Enter OTP</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <p className='text-center text-[#3d41458d]'>
            Please check your email for the OTP code
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;