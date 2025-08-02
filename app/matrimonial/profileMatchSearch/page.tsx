"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HeartIcon, UserPlusIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  motherTongue: string;
  profession?: string;
  education?: string;
  image?: string;
}

export default function ProfileMatch() {
  const [gender, setGender] = useState<string>("");
  const [ageFrom, setAgeFrom] = useState<string>("");
  const [ageTo, setAgeTo] = useState<string>("");
  const [motherTongue, setMotherTongue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  const router = useRouter();

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const ageOptions = Array.from({ length: 43 }, (_, i) => (18 + i).toString());

  const motherTongueOptions = [
    { label: "Hindi", value: "hindi" },
    { label: "Urdu", value: "urdu" },
    { label: "English", value: "english" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setAllUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = () => {
    const results = allUsers.filter((user) => {
      return (
        (!gender || user.gender.toLowerCase() === gender.toLowerCase()) &&
        (!ageFrom || user.age >= Number(ageFrom)) &&
        (!ageTo || user.age <= Number(ageTo)) &&
        (!motherTongue ||
          user.motherTongue.toLowerCase() === motherTongue.toLowerCase())
      );
    });

    setFilteredUsers(results);
    setIsSearchClicked(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Find Your Perfect Match in the Ghosi Community
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl">
              Connect with compatible partners who share your values and traditions
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => router.push("/matrimonial/register/signup")}
              className="bg-white text-green-800 hover:bg-green-100 px-6 py-3 text-lg font-medium rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <UserPlusIcon className="h-5 w-5" />
              Register Now
            </Button>
            <Button
              onClick={() => router.push("/login")}
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 text-lg font-medium rounded-full transition-all duration-300"
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Refine Your Search</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Gender Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1"> I&apos;m looking for a</label>
              <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
              <div className="flex items-center gap-2">
                <Select onValueChange={(value) => setAgeFrom(value)}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={`from-${age}`} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-500">to</span>
                <Select onValueChange={(value) => setAgeTo(value)}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={`to-${age}`} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mother Tongue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
              <Select onValueChange={(value) => setMotherTongue(value)}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {motherTongueOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="h-12 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Find Matches
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isSearchClicked 
              ? filteredUsers.length > 0 
                ? "Your Matches" 
                : "No Matches Found" 
              : "Start Your Search"}
          </h2>

          {isSearchClicked ? (
            filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
                      {user.image ? (
                        <Image 
                          src={user.image} 
                          alt={user.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white text-6xl font-light">{user.name.charAt(0)}</div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <h3 className="text-xl font-bold text-gray-800">{user.name}, {user.age}</h3>
                      <p className="text-sm text-gray-500 capitalize">{user.gender} • {user.motherTongue}</p>
                    </CardHeader>
                    <CardContent className="pb-4">
                      {user.profession && (
                        <p className="text-gray-700 mb-1">
                          <span className="font-medium">Profession:</span> {user.profession}
                        </p>
                      )}
                      {user.education && (
                        <p className="text-gray-700">
                          <span className="font-medium">Education:</span> {user.education}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" className="flex items-center gap-2">
                        <HeartIcon className="h-4 w-4" />
                        Shortlist
                      </Button>
                      <Button 
                        onClick={() => router.push("/registerform")}
                        variant="ghost" 
                        className="text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        View Profile <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No matches found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your search criteria to find more matches.</p>
                <Button 
                  onClick={() => {
                    setGender("");
                    setAgeFrom("");
                    setAgeTo("");
                    setMotherTongue("");
                    setIsSearchClicked(false);
                  }}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Reset Search
                </Button>
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
              <div className="mx-auto h-24 w-24 text-green-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Ready to find your match?</h3>
              <p className="mt-2 text-gray-600">Fill in your preferences and click &quot;Find Matches&quot; to see compatible profiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}