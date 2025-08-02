'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = localStorage.getItem('email');
      const signupDataString = localStorage.getItem('signupData');

      if (!email || !signupDataString) {
        setError('Signup data not found. Please register again.');
        return;
      }

      const signupData = JSON.parse(signupDataString);

      // Add the OTP value
      const fullData = {
        ...signupData,
        otp,
      };

      // Now do the actual signup
      await axios.post('/signup', fullData);

      await Swal.fire({
        title: 'OTP Verified!',
        text: 'Your account has been successfully created.',
        icon: 'success',
        confirmButtonText: 'Go to Login',
      });

      // Clear stored data
      localStorage.removeItem('signupData');
      localStorage.removeItem('email');

      router.push('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Signup error:', err.response?.data);
        setError(err.response?.data?.message || 'Invalid OTP or signup failed. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Enter OTP</h2>

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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800 transition duration-200"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <p className='text-center text-[#3d41458d]'>Please check your email..</p>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
