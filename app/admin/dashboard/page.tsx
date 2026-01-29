'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


interface FormSubmission {
  _id: string;
  fullName: string;
  dobAge: string;
  area: string;
  district: string;
  pinCode: string;
  state: string;
  country: string;
  education: string;
  occupation: string;
  mobile: string;
  email: string;
  maritalStatus: string;
  familyMembers: string;
  volunteer: string;
  additionalInfo: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<FormSubmission[]>([]);

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchForms();
  }, []);

  // 📡 Fetch form submissions
const fetchForms = async () => {
  try {
    const res = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/become-member`,);

    // If your API returns: { success, data }
    if (res.data.success) {
      setForms(res.data.data);
    }
  } catch (error) {
    console.error('Failed to fetch forms', error);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Form Submissions</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Submissions */}
        <div className="space-y-6">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{form.fullName}</h2>
                  <p className="text-sm text-gray-600">{form.email}</p>
                  <p className="text-sm text-gray-600">{form.mobile}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(form.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p><b>Age:</b> {form.dobAge}</p>
                <p><b>Marital Status:</b> {form.maritalStatus}</p>
                <p><b>Education:</b> {form.education}</p>
                <p><b>Occupation:</b> {form.occupation}</p>
                <p><b>Area:</b> {form.area}</p>
                <p><b>District:</b> {form.district}</p>
                <p><b>State:</b> {form.state}</p>
                <p><b>Country:</b> {form.country}</p>
                <p><b>Pincode:</b> {form.pinCode}</p>
                <p><b>Family Members:</b> {form.familyMembers}</p>
                <p><b>Volunteer:</b> {form.volunteer}</p>
              </div>

              {form.additionalInfo && (
                <div className="mt-4">
                  <p className="font-medium">Additional Info</p>
                  <p className="text-gray-700">{form.additionalInfo}</p>
                </div>
              )}
            </div>
          ))}

          {forms.length === 0 && (
            <p className="text-center text-gray-500">
              No form submissions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
