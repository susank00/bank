"use client"; // For client-side components in Next.js 13+
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Import the context

const Navbar = () => {
  const { user, handleLogout } = useAuth(); // Access user and logout from context
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const onLogout = async () => {
    await handleLogout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-slate-500">
      <div className="mx-auto flex justify-between items-center h-16 px-4">
        {/* Left Section - Nepal Bank */}
        <div className="flex-1">
          <Link href="/" className="text-4xl font-bold text-blue-800">
            Nepal Bank
          </Link>
        </div>

        {/* Center Section - Home and About Us */}
        <div className="flex flex-row justify-center flex-1 space-x-4">
          <Link
            href="/"
            className="text-white p-4 rounded-md hover:bg-slate-600"
          >
            Home
          </Link>
          <Link
            href="/profile"
            className="text-white p-4 rounded-md hover:bg-slate-600"
          >
            Profile
          </Link>
          <Link
            href="/about"
            className="text-white p-4 rounded-md hover:bg-slate-600"
          >
            About Us
          </Link>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center flex-1 justify-end">
          {user ? (
            <>
              <div className="mr-4">Welcome, {user.username}</div>
              <div className="relative ">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-blue-600 text-white p-2 rounded-full flex items-center justify-center"
                >
                  <Image
                    src="/icons/transaction.png" // Replace with the path to your image
                    alt="Transaction icon" // Always include an alt for accessibility
                    width={30} // Adjusted width for better display
                    height={30} // Adjusted height for better display
                    className="rounded-full object-cover" // Ensures the image fits within the rounded border
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                    <button
                      onClick={onLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="p-8 ">
                <Link
                  href="/auth/login"
                  className="bg-blue-600 mr-8 text-white  py-2 rounded-md p-4"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
