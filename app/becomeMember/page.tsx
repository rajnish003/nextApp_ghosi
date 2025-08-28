"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMemberFormStore } from "@/_zustand/memberFormStrore";

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

// Translations dictionary
const translations = {
  en: {
    title: "Join Our Community",
    subtitle: "Fill out the form below to become a member",
    header: "Membership Application",
    headerNote: "Please provide your details accurately",

    section1: "Personal Information",
    fullName: "Full Name",
    dob: "Date of Birth / Age",
    area: "Area of Residence",
    areaOptions: ["Rural", "Urban", "Semi-Urban"],
    district: "District",
    pinCode: "Pin Code",
    state: "State",
    country: "Country",

    section2: "Educational & Occupational Details",
    education: "Highest Education Qualification",
    educationOptions: [
      "No Formal Education",
      "Primary (Up to Class 5)",
      "Secondary (Class 6-10)",
      "Higher Secondary (Class 11-12)",
      "Diploma",
      "Undergraduate",
      "Postgraduate",
      "Doctorate (PhD)",
      "Other",
    ],
    otherEducation: "Specify Other Education",
    occupation: "Occupation",
    occupationOptions: [
      "Dairy Farming",
      "Agriculture",
      "Business",
      "Government Job",
      "Private Job",
      "Doctor",
      "Chartered Accountant (CA)",
      "Engineer",
      "Government Administrative Services",
      "Other",
    ],
    otherOccupation: "Specify Other Occupation",

    section3: "Contact Details",
    mobile: "Mobile Number",
    email: "Email Address",

    section4: "Family & Social Engagement",
    marital: "Marital Status",
    maritalOptions: ["Married", "Unmarried", "Divorced"],
    familyMembers: "Number of Family Members",
    volunteer: "Would you like to volunteer for community service?",
    volunteerOptions: ["Yes", "No"],
    volunteerSkills: "Area of interest or skills",

    section5: "Additional Information",
    additional: "Suggestions, comments, or other details",

    submit: "Submit Application",
    processing: "Processing...",
    success: "Your application has been submitted successfully.",
    privacy: "We respect your privacy. Your information will not be shared with third parties.",
  },

  hi: {
    title: "हमारे समुदाय से जुड़ें",
    subtitle: "सदस्य बनने के लिए नीचे दिया गया फॉर्म भरें",
    header: "सदस्यता आवेदन",
    headerNote: "कृपया अपनी जानकारी सही-सही भरें",

    section1: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि / आयु",
    area: "निवास क्षेत्र",
    areaOptions: ["ग्रामीण", "शहरी", "अर्ध-शहरी"],
    district: "जिला",
    pinCode: "पिन कोड",
    state: "राज्य",
    country: "देश",

    section2: "शैक्षिक और व्यावसायिक विवरण",
    education: "उच्चतम शैक्षिक योग्यता",
    educationOptions: [
      "कोई औपचारिक शिक्षा नहीं",
      "प्राथमिक (कक्षा 5 तक)",
      "माध्यमिक (कक्षा 6-10)",
      "उच्च माध्यमिक (कक्षा 11-12)",
      "डिप्लोमा",
      "स्नातक",
      "स्नातकोत्तर",
      "डॉक्टरेट (PhD)",
      "अन्य",
    ],
    otherEducation: "अन्य शिक्षा निर्दिष्ट करें",
    occupation: "व्यवसाय",
    occupationOptions: [
      "डेयरी",
      "कृषि",
      "व्यवसाय",
      "सरकारी नौकरी",
      "निजी नौकरी",
      "डॉक्टर",
      "चार्टर्ड अकाउंटेंट (CA)",
      "इंजीनियर",
      "प्रशासनिक सेवा",
      "अन्य",
    ],
    otherOccupation: "अन्य व्यवसाय निर्दिष्ट करें",

    section3: "संपर्क विवरण",
    mobile: "मोबाइल नंबर",
    email: "ईमेल पता",

    section4: "परिवार और सामाजिक सहभागिता",
    marital: "वैवाहिक स्थिति",
    maritalOptions: ["विवाहित", "अविवाहित", "तलाकशुदा"],
    familyMembers: "परिवार के सदस्यों की संख्या",
    volunteer: "क्या आप सामुदायिक सेवा के लिए स्वयंसेवा करना चाहेंगे?",
    volunteerOptions: ["हाँ", "नहीं"],
    volunteerSkills: "रुचि का क्षेत्र या कौशल",

    section5: "अतिरिक्त जानकारी",
    additional: "सुझाव, टिप्पणियाँ या अन्य विवरण",

    submit: "आवेदन जमा करें",
    processing: "प्रक्रिया हो रही है...",
    success: "आपका आवेदन सफलतापूर्वक जमा कर दिया गया है।",
    privacy: "हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी किसी तीसरे पक्ष के साथ साझा नहीं की जाएगी।",
  },
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required,
}) => (
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
  const { formData, loading, error, success, updateField, submitForm } =
    useMemberFormStore();

  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = translations[lang];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Language Switcher */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLang("en")}
            type="button"
            className={`px-3 py-1 rounded-l-lg ${
              lang === "en" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("hi")}
            type="button"
            className={`px-3 py-1 rounded-r-lg ${
              lang === "hi" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500 mb-2">{t.title}</h1>
          <p className="text-lg text-green-600">{t.subtitle}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          <div className="bg-green-500 text-white p-6">
            <h2 className="text-2xl font-bold">{t.header}</h2>
            <p className="text-green-100">{t.headerNote}</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Error */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Section 1 */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    1
                  </span>
                  {t.section1}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.dob} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="dobAge"
                    value={formData.dobAge}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>

                <RadioGroup
                  label={t.area}
                  name="area"
                  options={t.areaOptions}
                  value={formData.area}
                  onChange={handleChange}
                  required
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    name="district"
                    placeholder={t.district}
                    value={formData.district}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                  <input
                    name="pinCode"
                    placeholder={t.pinCode}
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                  <input
                    name="state"
                    placeholder={t.state}
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                  <input
                    name="country"
                    placeholder={t.country}
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    2
                  </span>
                  {t.section2}
                </h3>
              </div>

              <div className="space-y-4">
                <RadioGroup
                  label={t.education}
                  name="education"
                  options={t.educationOptions}
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
                {formData.education === "Other" && (
                  <input
                    name="educationOther"
                    placeholder={t.otherEducation}
                    value={formData.educationOther}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                )}

                <RadioGroup
                  label={t.occupation}
                  name="occupation"
                  options={t.occupationOptions}
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
                {formData.occupation === "Other" && (
                  <input
                    name="occupationOther"
                    placeholder={t.otherOccupation}
                    value={formData.occupationOther}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md py-2 px-3"
                  />
                )}
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    3
                  </span>
                  {t.section3}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="mobile"
                  placeholder={t.mobile}
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md py-2 px-3"
                />
                <input
                  name="email"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3"
                />
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    4
                  </span>
                  {t.section4}
                </h3>
              </div>

              <RadioGroup
                label={t.marital}
                name="maritalStatus"
                options={t.maritalOptions}
                value={formData.maritalStatus}
                onChange={handleChange}
              />

              <input
                name="familyMembers"
                placeholder={t.familyMembers}
                value={formData.familyMembers}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />

              <RadioGroup
                label={t.volunteer}
                name="volunteer"
                options={t.volunteerOptions}
                value={formData.volunteer}
                onChange={handleChange}
              />
              {formData.volunteer === "Yes" && (
                <textarea
                  name="volunteerSkills"
                  placeholder={t.volunteerSkills}
                  value={formData.volunteerSkills}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3"
                />
              )}
            </div>

            {/* Section 5 */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-green-500 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    5
                  </span>
                  {t.section5}
                </h3>
              </div>
              <textarea
                name="additionalInfo"
                placeholder={t.additional}
                value={formData.additionalInfo}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>

            {/* Submit */}
            <div className="pt-6">
              {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                  {t.success}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 rounded-md text-lg font-medium text-white bg-green-600 hover:bg-green-700 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? t.processing : t.submit}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Privacy */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{t.privacy}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
