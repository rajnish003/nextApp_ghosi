"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiUpload, FiPhone, FiBookOpen } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useHelpFormStore } from "@/_zustand/helpFormStore";

// Move translations to a separate file in a real project for maintainability
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
  contactMethod: "phone" | "email";
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
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      updateField(name, file);
    } else {
      updateField(name, value);
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
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-700">{t.yourInfo}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData?.email || ""}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {t.contactMethod} <span className="text-red-500">*</span>
                </span>
                <div className="mt-2 flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      onChange={handleChange}
                      checked={formData?.contactMethod === "email"}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">{t.email}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      onChange={handleChange}
                      checked={formData?.contactMethod === "phone"}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">{t.phone}</span>
                  </label>
                </div>
                {formData?.contactMethod === "phone" && (
                  <div className="mt-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t.phone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData?.phone || ""}
                      onChange={handleChange}
                      required
                      aria-required="true"
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
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.subject} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData?.subject || ""}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="issueType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t.issueType} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="issueType"
                    name="issueType"
                    value={formData?.issueType || ""}
                    onChange={handleChange}
                    required
                    aria-required="true"
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

              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {t.urgency}
                </span>
                <div className="mt-2 flex flex-wrap gap-4">
                  {["low", "medium", "high", "critical"].map((level) => (
                    <label key={level} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        onChange={handleChange}
                        checked={formData?.urgency === level}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2">{t[level as keyof typeof t]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.description} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleChange}
                  rows={5}
                  required
                  aria-required="true"
                  placeholder={t.descriptionPH}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="attachments"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.attach}
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <label className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition">
                    <FiUpload className="mr-2" />
                    {t.attach}
                    <input
                      id="attachments"
                      name="attachments"
                      type="file"
                      onChange={handleChange}
                      className="hidden"
                      aria-label={t.attach}
                    />
                  </label>
                  {formData?.attachments && (
                    <span className="text-sm text-gray-600 truncate w-full sm:max-w-[200px]">
                      {(formData.attachments as File).name}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">{t.attachNote}</p>
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t.preferredTime}
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  value={formData?.preferredTime || ""}
                  onChange={handleChange}
                  placeholder={t.bestTimePH}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Form Submission */}
            <div className="pt-6">
              {success ? (
                <div className="bg-green-100 bAorder border-green-400 text-green-700 px-4 py-3 rounded">
                  {t.success}
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {t.error}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? t.submitting : t.submit}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Other Help Options */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">{t.otherWays}</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <a
              href="tel:+911234567890"
              className="flex flex-col items-center hover:text-green-600 transition"
            >
              <FiPhone className="text-green-600 text-2xl mb-2" />
              <h4 className="font-medium">{t.call}</h4>
              <p className="text-sm">+91 1234567890</p>
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:text-green-600 transition"
            >
              <FaWhatsapp className="text-green-500 text-2xl mb-2" />
              <h4 className="font-medium">{t.whatsapp}</h4>
              <p className="text-sm">{t.startChat}</p>
            </a>
            <a
              href="#"
              className="flex flex-col items-center hover:text-green-600 transition"
            >
              <FiBookOpen className="text-green-700 text-2xl mb-2" />
              <h4 className="font-medium">{t.knowledge}</h4>
              <p className="text-sm">{t.browse}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;