"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      setMessage(data.message);
      console.log(data.user); // Optional: log user info for debugging

      // Redirect to the profile page after successful login
      router.push("/profile"); // Redirect to the profile page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              n-p
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
            className="w-full p-3  text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300"
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
