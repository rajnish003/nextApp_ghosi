'use client';

import React, { useEffect, useState } from 'react';
import { useMatrimonial } from '../../_zustand/matrimonialStore';
import { useAuth } from '../../_zustand/authStore';
import Image from 'next/image';

const MatrimonialMatches: React.FC = () => {
  const { user } = useAuth();
  const { getMatches, matches, loading, error } = useMatrimonial();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadMatches = async () => {
      if (user && !hasLoaded) {
        await getMatches(parseInt(user._id));
        setHasLoaded(true);
      }
    };

    loadMatches();
  }, [user, getMatches, hasLoaded]);

  if (loading && !hasLoaded) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Matches Found</h3>
          <p className="text-gray-500">
            We couldn&apos;t find any matches based on your preferences. Try updating your profile or preferences.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Matches</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700">
              {match.image ? (
                <Image
                  src={match.image}
                  alt={match.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-6xl font-light">
                    {match.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {match.name}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium w-20">Age:</span>
                  <span>{match.age} years</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium w-20">Gender:</span>
                  <span className="capitalize">{match.gender}</span>
                </div>
                
                {match.education && (
                  <div className="flex items-center">
                    <span className="font-medium w-20">Education:</span>
                    <span>{match.education}</span>
                  </div>
                )}
                
                {match.occupation && (
                  <div className="flex items-center">
                    <span className="font-medium w-20">Occupation:</span>
                    <span>{match.occupation}</span>
                  </div>
                )}
                
                {match.location && (
                  <div className="flex items-center">
                    <span className="font-medium w-20">Location:</span>
                    <span>{match.location}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm">
                  View Profile
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm">
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {loading && hasLoaded && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default MatrimonialMatches; 