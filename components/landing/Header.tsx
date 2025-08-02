import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div className="relative h-10 w-10 md:h-20 md:w-21 rounded-full border-4 border-white shadow-md transform group-hover:rotate-12 transition-transform duration-300">
              <Image
                src="/image/logo.png"
                alt="Ghoshi Community Logo"
                layout="fill"
                // objectFit="cover"
                className="rounded-full"
              />
            </div>
            {/* <div className="ml-4 hidden md:block">
              <div className="text-xs font-medium text-white/80 tracking-wider">COMMUNITY</div>
              <div className="text-xl font-bold text-white">GHOSHI</div>
            </div> */}
          </div>

          {/* Title Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-serif tracking-tight">
              Welcome to Ghosi Community
            </h1>
            <div className="relative inline-block">
              <span className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                گھوسی کمیونٹی کی ویب سائٹ پر خوش آمدید
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-yellow-300 rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Profile/Right Section */}
          <div className="relative group">
            <div className="relative h-16 w-16 rounded-full border-3 border-white/80 shadow-lg overflow-hidden transition-all duration-300 group-hover:border-yellow-300 group-hover:scale-110">
              <Image
                src="/image/logo.png"
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              Member
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;