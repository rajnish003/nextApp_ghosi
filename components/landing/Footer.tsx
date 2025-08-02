"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  comment: string;
}

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    comment: ""
  });

//   const context = useContext(DataContext);
//   const counter = context?.counter ?? 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your feedback!");
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-2">Vision</h2>
            <p className="text-gray-400">
              This is a great platform to unite all like-minded Ghosi people at one station.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/aboutghosi" className="hover:text-blue-400">About</Link></li>
              <li><Link href="/courses" className="hover:text-blue-400">Posts</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
            </ul>
          </div>

          {/* Comment Form */}
          <div>
            <h2 className="text-xl font-bold mb-2">Leave a Comment</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="comment"
                placeholder="Your Comment"
                rows={3}
                value={formData.comment}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/muslimghosiunite/"
              className="text-gray-400 hover:text-blue-400 text-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaLinkedin /></a>
          </div>

          {/* Visitor Count */}
          <div className="text-gray-400 mt-4 md:mt-0">
            <p>Visitor Count: <span className="font-bold text-white">0</span></p>
          </div>

          {/* Copyright */}
          <p className="mt-4 md:mt-0">© 2025 Ghoshi Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
