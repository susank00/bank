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
        className="p-4 text-white bg-blue-600 focus:outline-none md:hidden"
      >
        Toggle Menu
      </button>

      <div
        className={`fixed inset-0 z-30 bg-red-800 bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <nav
        className={`absolute top-0 left-0 h-screen bg-gradient-to-br from-red-900  to-green-800 shadow-md transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } md:relative md:translate-x-0 md:flex md:flex-col md:w-64`}
      >
        <div className="p-4 ">
          {/* <h2 className="text-xl font-bold">My App</h2> */}
        </div>
        <ul className="mt-1 space-y-4 font-bold text-2xl ml-5 ">
          <li>
            <Link
              href="/"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={toggleSidebar}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
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
