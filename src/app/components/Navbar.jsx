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
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-4xl font-bold text-blue-800">
            Nepal Bank
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/about"
              className="text-white px-3 py-2 rounded-md hover:bg-slate-600"
            >
              About Us
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-white px-3 py-2 rounded-md hover:bg-slate-600"
                >
                  Profile
                </Link>
                <div className="text-center p-2">Welcome {user.username}</div>

                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-blue-600 text-white px-3  rounded-full"
                  >
                    <Image
                      className="ml-5 "
                      src="/icons/transaction.png" // Replace with the path to your image
                      alt="Description of image" // Always include an alt for accessibility
                      width={60} // Set the width of the image
                      height={5} // Set the height of the image
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-full shadow-lg z-20">
                      <button
                        onClick={onLogout}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-blue-600 text-white px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
