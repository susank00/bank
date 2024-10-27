import { useState } from "react";
import Link from "next/link"; // Next.js Link

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex absolute">
      <button
        onClick={toggleSidebar}
        className="p-3 rounded-md text-white bg-blue-600 focus:outline-none md:hidden transition duration-300 transform hover:scale-105"
      >
        Toggle Menu
      </button>

      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <nav
        className={`absolute top-0 left-0 h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg transition-transform transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } md:relative md:translate-x-0 md:flex md:flex-col md:w-64 rounded-tr-[40px] rounded-br-[40px]`}
      >
        <div className="p-4">
          {/* Optional App Title */}
          {/* <h2 className="text-2xl font-bold text-white">My App</h2> */}
        </div>
        <ul className="mt-1 space-y-4 font-bold text-2xl ml-5">
          <li>
            <Link
              href="/"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-white hover:bg-white hover:text-purple-600 rounded-md transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-white hover:bg-white hover:text-purple-600 rounded-md transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-white hover:bg-white hover:text-purple-600 rounded-md transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-white hover:bg-white hover:text-purple-600 rounded-md transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
