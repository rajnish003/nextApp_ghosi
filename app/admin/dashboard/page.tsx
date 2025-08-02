'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Dummy data
  const stats = {
    totalUsers: 1247,
    totalProfiles: 892,
    activeProfiles: 756,
    totalMatches: 234,
    successfulMatches: 89,
    formSubmissions: 156,
    pendingReviews: 23
  };

  const formSubmissions = [
    {
      id: '1',
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      subject: 'General Inquiry',
      message: 'I would like to know more about the community events.',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 87654 32109',
      subject: 'Membership Request',
      message: 'I am interested in becoming a member of the Ghosi community.',
      submittedAt: '2024-01-14T15:45:00Z',
      status: 'reviewed'
    }
  ];

  const matrimonialProfiles = [
    {
      id: '1',
      name: 'Anjali Singh',
      email: 'anjali@example.com',
      age: 28,
      gender: 'female',
      location: 'Mumbai, Maharashtra',
      education: 'Master\'s in Computer Science',
      occupation: 'Software Engineer',
      status: 'active'
    },
    {
      id: '2',
      name: 'Vikram Malhotra',
      email: 'vikram@example.com',
      age: 32,
      gender: 'male',
      location: 'Delhi, NCR',
      education: 'MBA',
      occupation: 'Business Analyst',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage community data and matrimonial profiles</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Matrimonial Profiles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProfiles}</p>
                <p className="text-sm text-green-600">+{stats.activeProfiles} active</p>
              </div>
              <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600">💕</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Matches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.successfulMatches}</p>
                <p className="text-sm text-blue-600">of {stats.totalMatches} total</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">❤️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Form Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.formSubmissions}</p>
                <p className="text-sm text-orange-600">+{stats.pendingReviews} pending</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'matrimonial', label: 'Matrimonial' },
                { id: 'forms', label: 'Form Submissions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">New Profile Created</p>
                          <p className="text-sm text-gray-600">Anjali Singh joined matrimonial</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Match Accepted</p>
                          <p className="text-sm text-gray-600">Vikram & Anjali matched</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <span className="text-sm font-medium">View Profiles</span>
                    </button>
                    <button className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <span className="text-sm font-medium">Review Submissions</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Matrimonial Tab */}
            {activeTab === 'matrimonial' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Search profiles..."
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + Add Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matrimonialProfiles.map((profile) => (
                    <div key={profile.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{profile.name}</h3>
                          <p className="text-sm text-gray-600">{profile.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>
                          {profile.status}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span>👤</span>
                          <span>{profile.age} years old</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>📍</span>
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>🎓</span>
                          <span>{profile.education}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>💼</span>
                          <span>{profile.occupation}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          👁️ View
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          ✏️ Edit
                        </button>
                        <button className="px-3 py-1 text-sm border border-red-300 rounded text-red-600 hover:bg-red-50">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Forms Tab */}
            {activeTab === 'forms' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {formSubmissions.map((submission) => (
                    <div key={submission.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{submission.name}</h3>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                          <p className="text-sm text-gray-600">{submission.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(submission.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Subject: {submission.subject}</h4>
                        <p className="text-gray-700">{submission.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          📧 Reply
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          📞 Call
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          ✓ Mark Reviewed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
