"use client";

import React, { useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";
import { useLoading } from "../ui/LoadingProvider";

interface DropdownItem {
  name: string;
  link: string;
}

interface MenuItem {
  name: string;
  link?: string;
  dropdown?: DropdownItem[];
}

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ href, children, className, onClick }) => {
  const { startLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (href !== pathname) {
        startLoading();
      }
      onClick?.();
    },
    [href, pathname, startLoading, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick} prefetch={false}>
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const menus = useMemo<MenuItem[]>(
    () => [
      { name: "Home", link: "/" },
      {
        name: "About Us",
        dropdown: [
          { name: "Vision, Mission & Objective", link: "/about/vision" },
          { name: "About Ghosi Community", link: "/about/aboutGhosi" },
          { name: "Literature", link: "/about/literature" },
        ],
      },
      { name: "Our Initiatives", link: "/initiative" },
      { name: "Matrimonial", link: "/matrimonial/profileMatchSearch" },
      {
        name: "Career",
        dropdown: [
          { name: "Education", link: "/careers/education" },
          { name: "Career", link: "/careers/career" },
          { name: "ScholarShip", link: "/careers/scholarship" },
        ],
      },
      { name: "News & Events", link: "/news" },
      { name: "Prominent Ghosi", link: "/promonentghosi" },
      { name: "Gallery", link: "/gallery" },
    ],
    []
  );

  return (
    <nav className="bg-white shadow-lg border-b border-green-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo Placeholder */}
          <div className="flex-shrink-0"></div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            <LoadingLink
              href="/becomeMember"
              className="border border-green-500 text-red-500 px-3 py-1 rounded-md hover:bg-green-200 transition text-sm whitespace-nowrap"
            >
              Become a Member
            </LoadingLink>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <ul className="flex space-x-6">
              {menus.map((menu, index) => (
                <li key={index} className="relative group">
                  {menu.dropdown ? (
                    <>
                      <button className="flex items-center text-gray-700 hover:text-green-500 font-medium transition-colors duration-200">
                        {menu.name}
                        <SlArrowDown className="ml-1 text-xs transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      <ul className="absolute left-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                        {menu.dropdown.map((item, subIndex) => (
                          <li key={subIndex}>
                            <LoadingLink
                              href={item.link}
                              className="block px-4 py-2 text-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                            >
                              {item.name}
                            </LoadingLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <LoadingLink
                      href={menu.link || "#"}
                      className="text-gray-700 hover:text-green-500 transition-colors duration-200 font-medium"
                    >
                      {menu.name}
                    </LoadingLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <LoadingLink
              href="/admin/login"
              className="border border-green-500 text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200 whitespace-nowrap"
            >
              Admin Login
            </LoadingLink>
            <LoadingLink
              href="/becomeMember"
              className="border border-green-500 text-red-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Become a Member
            </LoadingLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
     {/* Mobile Menu */}
{open && (
  <div className="lg:hidden bg-white shadow-lg">
    <div className="px-2 pt-2 pb-4 space-y-1">
      {menus.map((menu, index) => (
        <div key={index} className="border-b border-gray-100 last:border-0">
          {menu.dropdown ? (
            <>
              <details className="group">
                <summary className="flex justify-between items-center px-3 py-3 text-gray-700 font-medium cursor-pointer hover:text-green-500 list-none">
                  {menu.name}
                  <SlArrowDown className="text-xs transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="pl-4 pb-2 space-y-2">
                  {menu.dropdown.map((item, subIndex) => (
                    <LoadingLink
                      key={subIndex}
                      href={item.link}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded"
                      onClick={() => setOpen(false)}   
                    >
                      {item.name}
                    </LoadingLink>
                  ))}
                </div>
              </details>
            </>
          ) : (
            <LoadingLink
              href={menu.link || "#"}
              className="block px-3 py-3 text-gray-700 hover:text-green-500 font-medium"
              onClick={() => setOpen(false)}  
            >
              {menu.name}
            </LoadingLink>
          )}
        </div>
      ))}

      <div className="pt-2 space-y-2">
        <LoadingLink
          href="/admin/login"
          className="w-full block text-left px-3 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50"
          onClick={() => setOpen(false)}  
        >
          Admin Login
        </LoadingLink>
        <LoadingLink
          href="/becomeMember"
          className="w-full block text-left px-3 py-2 border border-green-500 text-red-500 rounded-md hover:bg-green-50 font-medium"
          onClick={() => setOpen(false)}  
        >
          Become a Member
        </LoadingLink>
      </div>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
