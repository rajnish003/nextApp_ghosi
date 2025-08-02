"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  fullName: string;
  dobAge: string;
  area: string;
  district: string;
  pinCode: string;
  state: string;
  country: string;
  education: string;
  educationOther: string;
  occupation: string;
  occupationOther: string;
  mobile: string;
  email: string;
  maritalStatus: string;
  familyMembers: string;
  volunteer: string;
  volunteerSkills: string;
  additionalInfo: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, required }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-2 flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            className="h-4 w-4 text-green-500 focus:ring-green-300 border-gray-300"
            required={required}
          />
          <span className="ml-2 text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const MemberPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dobAge: '',
    area: '',
    district: '',
    pinCode: '',
    state: '',
    country: '',
    education: '',
    educationOther: '',
    occupation: '',
    occupationOther: '',
    mobile: '',
    email: '',
    maritalStatus: '',
    familyMembers: '',
    volunteer: '',
    volunteerSkills: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dobAge.trim()) newErrors.dobAge = 'Date of Birth / Age is required';
    if (!formData.area) newErrors.area = 'Area of Residence is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (formData.education === 'Other' && !formData.educationOther.trim())
      newErrors.educationOther = 'Please specify other education';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (formData.occupation === 'Other' && !formData.occupationOther.trim())
      newErrors.occupationOther = 'Please specify other occupation';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = 'Pin Code must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', {
        ...formData,
        education: formData.education === 'Other' ? formData.educationOther : formData.education,
        occupation: formData.occupation === 'Other' ? formData.occupationOther : formData.occupation,
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          dobAge: '',
          area: '',
          district: '',
          pinCode: '',
          state: '',
          country: '',
          education: '',
          educationOther: '',
          occupation: '',
          occupationOther: '',
          mobile: '',
          email: '',
          maritalStatus: '',
          familyMembers: '',
          volunteer: '',
          volunteerSkills: '',
          additionalInfo: '',
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">Join Our Community</h1>
          <p className="text-lg text-green-600">Fill out the form below to become a member</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="bg-green-500 text-white p-6">
            <h2 className="text-2xl font-bold">Membership Application</h2>
            <p className="text-green-100">Please provide your details accurately</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  Personal Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="dobAge" className="block text-sm font-medium text-gray-700">
                    Date of Birth / Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dobAge"
                    name="dobAge"
                    value={formData.dobAge}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                  />
                  {errors.dobAge && <p className="text-red-500 text-sm">{errors.dobAge}</p>}
                </div>

                <RadioGroup
                  label="Area of Residence"
                  name="area"
                  options={['Rural', 'Urban', 'Semi-Urban']}
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
                {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                    <input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">Pin Code</label>
                    <input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                    {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Occupation Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Educational & Occupational Details
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <RadioGroup
                    label="Highest Education Qualification"
                    name="education"
                    options={[
                      'No Formal Education',
                      'Primary (Up to Class 5)',
                      'Secondary (Class 6-10)',
                      'Higher Secondary (Class 11-12)',
                      'Diploma',
                      'Undergraduate',
                      'Postgraduate',
                      'Doctorate (PhD)',
                      'Other',
                    ]}
                    value={formData.education}
                    onChange={handleChange}
                    required
                  />
                  {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
                  {formData.education === 'Other' && (
                    <div className="mt-3">
                      <label htmlFor="educationOther" className="block text-sm font-medium text-gray-700">
                        Specify Other Education
                      </label>
                      <input
                        id="educationOther"
                        name="educationOther"
                        value={formData.educationOther}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                      {errors.educationOther && <p className="text-red-500 text-sm">{errors.educationOther}</p>}
                    </div>
                  )}
                </div>

                <div>
                  <RadioGroup
                    label="Occupation"
                    name="occupation"
                    options={[
                      'Dairy Farming',
                      'Agriculture',
                      'Business',
                      'Government Job',
                      'Private Job',
                      'Doctor',
                      'Chartered Accountant (CA)',
                      'Engineer',
                      'Government Administrative Services',
                      'Other',
                    ]}
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                  />
                  {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
                  {formData.occupation === 'Other' && (
                    <div className="mt-3">
                      <label htmlFor="occupationOther" className="block text-sm font-medium text-gray-700">
                        Specify Other Occupation
                      </label>
                      <input
                        id="occupationOther"
                        name="occupationOther"
                        value={formData.occupationOther}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                      {errors.occupationOther && <p className="text-red-500 text-sm">{errors.occupationOther}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  Contact Details
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    type="tel"
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Family & Social Engagement Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                  Family & Social Engagement
                </h3>
              </div>

              <div className="space-y-4">
                <RadioGroup
                  label="Marital Status"
                  name="maritalStatus"
                  options={['Married', 'Unmarried', 'Divorced']}
                  value={formData.maritalStatus}
                  onChange={handleChange}
                />

                <div className="space-y-1">
                  <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700">
                    Number of Family Members
                  </label>
                  <input
                    id="familyMembers"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                  />
                </div>

                <div>
                  <RadioGroup
                    label="Would you like to volunteer for community service?"
                    name="volunteer"
                    options={['Yes', 'No']}
                    value={formData.volunteer}
                    onChange={handleChange}
                  />
                  {formData.volunteer === 'Yes' && (
                    <div className="mt-3">
                      <label htmlFor="volunteerSkills" className="block text-sm font-medium text-gray-700">
                        Area of interest or skills
                      </label>
                      <textarea
                        id="volunteerSkills"
                        name="volunteerSkills"
                        value={formData.volunteerSkills}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">5</span>
                  Additional Information
                </h3>
              </div>

              <div className="space-y-1">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                  Suggestions, comments, or other details
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150"
                />
              </div>
            </div>

            <div className="pt-6">
              {submitSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Success! </strong>
                  <span className="block sm:inline">Your application has been submitted successfully.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>We respect your privacy. Your information will not be shared with third parties.</p>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;