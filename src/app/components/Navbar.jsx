"use client"; // For client-side components in Next.js 13+
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Import the context

const Navbar = () => {
  const { user, handleLogout } = useAuth(); // Access user and logout from context
  const router = useRouter();

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
            {user ? (
              <>
                <span className="text-gray-800">Welcome, {user.username}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-3 py-2 rounded-md"
                >
                  Logout
                </button>
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
