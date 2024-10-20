"use client";
// components/Navbar.js
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <Link href="/" className="text-4xl font-bold text-blue-800 ml-0">
              Nepal Bank
            </Link>
            <div className="hidden md:flex space-x-4 ml-10">
              <Link href="/" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-blue-600"
              >
                Services
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-gray-800 hover:text-blue-600 focus:outline-none"
                >
                  More
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/faq"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      FAQ
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-3 py-2 rounded-md align"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 focus:outline-none"
              // Toggle mobile menu logic (not implemented in this snippet)
            >
              {/* Menu icon for mobile view */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
