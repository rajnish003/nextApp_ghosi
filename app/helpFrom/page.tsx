"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiUpload, FiPhone, FiBookOpen } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useHelpFormStore } from "@/_zustand/helpFormStore";

// Translations object (same as before)
const translations = {
  en: {
    title: "How Can We Help You?",
    subtitle: "Fill out the form below and our support team will get back to you soon",
    formHeader: "Support Request Form",
    formSub: "We're here to help you with any questions or issues",
    yourInfo: "Your Information",
    fullName: "Full Name",
    email: "Email Address",
    contactMethod: "How should we contact you?",
    phone: "Phone Number",
    issueDetails: "Issue Details",
    subject: "Subject",
    issueType: "Issue Type",
    selectHelp: "Select a Help type",
    medical: "Medical Help",
    job: "Job Search Help",
    career: "Career Guidance Help",
    govt: "Government Department Help",
    other: "Other",
    urgency: "Urgency Level",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    description: "Description of Issue",
    descriptionPH: "Please describe your issue in detail...",
    attach: "Attachments (Optional)",
    attachNote: "You can upload screenshots or documents related to your issue (Max 5MB)",
    preferredTime: "Preferred Contact Time (Optional)",
    bestTime: "Best time to contact you",
    bestTimePH: "e.g. Weekdays 9am-5pm, Evenings after 7pm, etc.",
    submit: "Submit Help Request",
    submitting: "Submitting...",
    success: "Your support request has been submitted successfully. We'll get back to you soon.",
    error: "Failed to submit the request. Please try again.",
    otherWays: "Other Ways to Get Help",
    call: "Call Us",
    whatsapp: "WhatsApp Chat",
    knowledge: "Knowledge Base",
    startChat: "Start Chat Now",
    browse: "Browse Articles",
  },
  hi: {
    title: "हम आपकी कैसे मदद कर सकते हैं?",
    subtitle: "नीचे दिया गया फॉर्म भरें और हमारी टीम जल्द ही आपसे संपर्क करेगी",
    formHeader: "सहायता अनुरोध फॉर्म",
    formSub: "हम आपके सभी प्रश्नों और समस्याओं में मदद करने के लिए हैं",
    yourInfo: "आपकी जानकारी",
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    contactMethod: "हम आपसे कैसे संपर्क करें?",
    phone: "फ़ोन नंबर",
    issueDetails: "समस्या का विवरण",
    subject: "विषय",
    issueType: "समस्या का प्रकार",
    selectHelp: "एक सहायता प्रकार चुनें",
    medical: "चिकित्सा सहायता",
    job: "नौकरी खोज सहायता",
    career: "करियर मार्गदर्शन सहायता",
    govt: "सरकारी विभाग सहायता",
    other: "अन्य",
    urgency: "आपातकालीन स्तर",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    description: "समस्या का विवरण",
    descriptionPH: "कृपया अपनी समस्या का विस्तार से वर्णन करें...",
    attach: "संलग्नक (वैकल्पिक)",
    attachNote: "आप अपनी समस्या से संबंधित स्क्रीनशॉट या दस्तावेज़ अपलोड कर सकते हैं (अधिकतम 5MB)",
    preferredTime: "पसंदीदा संपर्क समय (वैकल्पिक)",
    bestTime: "आपसे संपर्क करने का सबसे अच्छा समय",
    bestTimePH: "जैसे: कार्यदिवस 9am-5pm, शाम 7pm के बाद, आदि",
    submit: "सहायता अनुरोध सबमिट करें",
    submitting: "सबमिट किया जा रहा है...",
    success: "आपका सहायता अनुरोध सफलतापूर्वक सबमिट कर दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।",
    error: "अनुरोध सबमिट करने में विफल। कृपया पुन: प्रयास करें।",
    otherWays: "मदद पाने के अन्य तरीके",
    call: "हमें कॉल करें",
    whatsapp: "व्हाट्सएप चैट",
    knowledge: "ज्ञानकोष",
    startChat: "अभी चैट शुरू करें",
    browse: "लेख देखें",
  },
};

interface HelpFormData {
  name: string;
  email: string;
  subject: string;
  issueType: string;
  description: string;
  urgency: string;
  attachments: File | null;
  contactMethod: "phone" | "email" | ""; // Allow empty initial state
  phone: string;
  preferredTime: string;
}

const Help: React.FC = () => {
  const { formData, loading, error, success, updateField, submitForm } = useHelpFormStore();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = translations[lang];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] || null;
      // Optional: Add file size validation (5MB = 5 * 1024 * 1024 bytes)
      if (file && file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        input.value = ""; // Clear input
        return;
      }
      updateField(name as keyof HelpFormData, file);
    } else {
      updateField(name as keyof HelpFormData, value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLang("hi")}
            className={`px-4 py-2 rounded-l-lg font-medium transition ${
              lang === "hi"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 rounded-r-lg font-medium transition ${
              lang === "en"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            English
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-600 mb-3">{t.title}</h1>
          <p className="text-lg text-green-600">{t.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          {/* Form Header */}
          <div className="bg-green-700 text-white p-6">
            <h2 className="text-2xl font-bold">{t.formHeader}</h2>
            <p className="text-green-100">{t.formSub}</p>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-8">
            {/* Your Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-700">{t.yourInfo}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Contact Method */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contactMethod} <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-wrap gap-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === "email"}
                      onChange={handleChange}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">{t.email}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === "phone"}
                      onChange={handleChange}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">{t.phone}</span>
                  </label>
                </div>

                {formData.contactMethod === "phone" && (
                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      {t.phone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required={formData.contactMethod === "phone"}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Issue Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-700">{t.issueDetails}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {t.subject} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
                    {t.issueType} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="issueType"
                    name="issueType"
                    value={formData.issueType || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">{t.selectHelp}</option>
                    <option value="Medical">{t.medical}</option>
                    <option value="Job">{t.job}</option>
                    <option value="Career">{t.career}</option>
                    <option value="Government">{t.govt}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>
              </div>

              {/* Urgency Level */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">{t.urgency}</span>
                <div className="flex flex-wrap gap-6">
                  {["low", "medium", "high", "critical"].map((level) => (
                    <label key={level} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 capitalize">{t[level as keyof typeof t]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  {t.description} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder={t.descriptionPH}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 resize-vertical"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.attach}</label>
                <div className="mt-2 flex items-center gap-4">
                  <label className="flex items-center justify-center px-5 py-3 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition text-sm">
                    <FiUpload className="mr-2 text-lg" />
                    Upload File
                    <input
                      id="attachments"
                      name="attachments"
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  {formData.attachments && (
                    <span className="text-sm text-gray-700 truncate max-w-xs">
                      {formData.attachments.name}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">{t.attachNote}</p>
              </div>

              {/* Preferred Contact Time */}
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">
                  {t.preferredTime}
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  value={formData.preferredTime || ""}
                  onChange={handleChange}
                  placeholder={t.bestTimePH}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200">
              {success ? (
                <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg text-center">
                  {t.success}
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg text-center">
                  {t.error}
                </div>
              ) : null}

              {!success && (
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-6 py-4 px-6 rounded-lg text-lg font-semibold text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 shadow-lg"
                  }`}
                >
                  {loading ? t.submitting : t.submit}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Other Ways to Get Help */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">{t.otherWays}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="tel:+911234567890"
              className="flex flex-col items-center text-center hover:text-green-600 transition group"
            >
              <FiPhone className="text-4xl text-green-600 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-lg">{t.call}</h4>
              <p className="text-sm text-gray-600 mt-1">+91 12345 67890</p>
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center hover:text-green-600 transition group"
            >
              <FaWhatsapp className="text-4xl text-green-500 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-lg">{t.whatsapp}</h4>
              <p className="text-sm text-gray-600 mt-1">{t.startChat}</p>
            </a>
            <a
              href="/knowledge-base"
              className="flex flex-col items-center text-center hover:text-green-600 transition group"
            >
              <FiBookOpen className="text-4xl text-green-700 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-lg">{t.knowledge}</h4>
              <p className="text-sm text-gray-600 mt-1">{t.browse}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;