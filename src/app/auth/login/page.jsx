"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); // Initialize useRouter
  const { handleLogin, user } = useAuth(); // Access the handleLogin function from the AuthContext
  useEffect(() => {
    if (user) {
      router.push("/profile"); // Redirect to the profile page if user is logged in
    }
  }, [user, router]);
  const onLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Call handleLogin from context, which handles the login logic
      const data = await handleLogin({ email, password });

      // Assuming handleLogin returns the data after successful login
      if (data) {
        setMessage("Login successful! Redirecting...");
        router.push("/profile"); // Redirect to the profile page
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Login</h1>

        <form onSubmit={onLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block text-gray-700"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300"
          >
            {message ? "Logging in..." : "Login"}
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-center bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-4 text-green-500 text-center bg-green-100 p-2 rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
