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
    <nav className="relative bg-gradient-to-r from-green-700 to-blue-500 shadow-lg z-10">
      {" "}
      {/* Set z-index to 10 */}
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        {/* Left Section - Nepal Bank */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-4xl font-bold text-white transition duration-300 hover:text-blue-800 "
          >
            <h2 className="font-extrabold font-serif">Nepal Bank</h2>
          </Link>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-row justify-center flex-1 space-x-6">
          {["Home", "Profile", "About Us"].map((item) => (
            <Link
              key={item}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s/g, "")}`
              }
              className="text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 transform hover:-translate-y-1"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center flex-1 justify-end">
          {user ? (
            <>
              <div className="mr-4 text-white text-lg">
                Welcome, {user.username}
              </div>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white text-blue-600 p-2 rounded-full flex items-center justify-center shadow transition duration-300 hover:bg-gray-200"
                >
                  <Image
                    src="/icons/transaction.png" // Replace with the path to your image
                    alt="Transaction icon" // Always include an alt for accessibility
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                    <button
                      onClick={onLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg w-full text-left transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="bg-white text-blue-600 py-2 px-4 rounded-md shadow hover:bg-blue-100 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Curvy Bottom Border */}
      <svg
        className="absolute left-0 right-0 bottom-0 w-full h-5 z-1"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="purple" // Change this to adjust the color of the curve
          d="M0,192L30,202.7C60,213,120,235,190,224C240,213,300,171,360,154.7C420,139,480,149,540,149.3C600,149,660,139,720,128C780,117,840,107,900,106.7C960,107,1020,117,1080,128C1140,139,1200,149,1260,160C1320,171,1380,181,1410,186.7L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0V192Z"
        ></path>
      </svg>
    </nav>
  );
};

export default Navbar;
