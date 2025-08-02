'use client';

import React, { useState } from 'react';
import { useMatrimonial } from '../../_zustand/matrimonialStore';
import { useAuth } from '../../_zustand/authStore';
import { useRouter } from 'next/navigation';

interface ProfileFormData {
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  height: string;
  maritalStatus: string;
  weight: string;
  education: string;
  occupation: string;
  income: string;
  country: string;
  state: string;
  city: string;
  hobbies: string;
  about_me: string;
}
const MatrimonialProfileForm: React.FC = () => {
  const { user } = useAuth();
  const { createProfile, updateProfile, profile, loading, error, success } = useMatrimonial();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    dateOfBirth: profile?.dateOfBirth || '',
    gender: profile?.gender || '',
    contactNumber: profile?.contactNumber || '',
    height: profile?.height || '',
    maritalStatus: profile?.maritalStatus || '',
    weight: profile?.weight || '',
    education: profile?.education || '',
    occupation: profile?.occupation || '',
    income: profile?.income || '',
    country: profile?.country || '',
    state: profile?.state || '',
    city: profile?.city || '',
    hobbies: profile?.hobbies || '',
    about_me: profile?.about_me || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login first');
      return;
    }

    const profileData = {
      user_id: parseInt(user._id),
      ...formData
    };

    if (profile) {
        await updateProfile(profileData, (path) => router.push(path));
      } else {
        await createProfile(profileData, (path) => router.push(path));
      }
    };
  return(
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {profile ? 'Update Matrimonial Profile' : 'Create Matrimonial Profile'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="e.g., 5'8\"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="never_married">Never Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g., 70 kg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="e.g., Bachelor's Degree"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income
            </label>
            <input
              type="text"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
              placeholder="e.g., 50,000 - 75,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hobbies
          </label>
          <textarea
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            rows={3}
            placeholder="Tell us about your hobbies and interests..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Me
          </label>
          <textarea
            name="about_me"
            value={formData.about_me}
            onChange={handleInputChange}
            rows={4}
            placeholder="Tell us about yourself, your values, and what you're looking for..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (profile ? 'Update Profile' : 'Create Profile')}
        </button>
      </form>
    </div>
  );
};

export default MatrimonialProfileForm; 