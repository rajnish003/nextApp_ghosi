"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface MenuItem {
  name: string;
  link?: string;
  dropdown?: { name: string; link: string }[];
}

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const menus: MenuItem[] = [
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
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      menus.forEach((menu) => {
        if (menu.link) router.prefetch(menu.link);
        if (menu.dropdown) {
          menu.dropdown.forEach((item) => router.prefetch(item.link));
        }
      });
    }
  });

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const adminLoginHandler = () => {
    startTransition(() => {
      router.push("/admin/login");
    });
  };

  const memberHandler = () => {
    startTransition(() => {
      router.push("/becomeMember");
    });
  };

  return (
    <nav className="bg-white shadow-lg border-b border-green-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <div className="flex-shrink-0"></div>

          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={memberHandler}
              className="border border-green-500 text-red-500 px-3 py-1 rounded-md hover:bg-green-200 transition text-sm whitespace-nowrap"
            >
              Become a Member
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <ul className="flex space-x-6">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(index)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menu.dropdown ? (
                    <>
                      <button className="flex items-center text-gray-700 hover:text-green-500 font-medium transition-colors duration-200">
                        {menu.name}
                        {openDropdown === index ? (
                          <SlArrowUp className="ml-1 text-xs" />
                        ) : (
                          <SlArrowDown className="ml-1 text-xs" />
                        )}
                      </button>
                      <ul
                        className={`absolute left-0 pt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 transition-all duration-200 ${
                          openDropdown === index
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        {menu.dropdown.map((item, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={item.link}
                              prefetch={true}
                              className="block px-4 py-2 text-md text-[#0A0A0A] hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={menu.link || "#"}
                      prefetch={true}
                      className="text-gray-700 hover:text-green-500 transition-colors duration-200 font-medium"
                    >
                      {menu.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={adminLoginHandler}
              className="border border-green-500 text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200 whitespace-nowrap"
            >
              Admin Login
            </button>
            <button
              onClick={memberHandler}
              className="border border-green-500 text-red-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white shadow-lg ${open ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1">
          {menus.map((menu, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              {menu.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="flex justify-between items-center w-full px-3 py-3 text-gray-700 font-medium hover:text-green-500"
                  >
                    <span>{menu.name}</span>
                    {openDropdown === index ? (
                      <SlArrowUp className="text-xs" />
                    ) : (
                      <SlArrowDown className="text-xs" />
                    )}
                  </button>
                  {openDropdown === index && (
                    <div className="pl-4 pb-2 space-y-2">
                      {menu.dropdown.map((item, subIndex) => (
                        <Link
                          key={subIndex}
                          href={item.link}
                          prefetch={true}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={menu.link || "#"}
                  prefetch={true}
                  className="block px-3 py-3 text-gray-700 hover:text-green-500 font-medium"
                >
                  {menu.name}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-2 space-y-2">
            <button
              onClick={adminLoginHandler}
              className="w-full text-left px-3 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50"
            >
              Admin Login
            </button>
            <button
              onClick={memberHandler}
              className="w-full text-left px-3 py-2 border border-green-500 text-red-500 rounded-md hover:bg-green-50 font-medium"
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
