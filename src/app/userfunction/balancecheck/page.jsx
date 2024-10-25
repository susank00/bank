// app/balance/page.js
"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const BalancePage = () => {
  const router = useRouter(); // Initialize useRouter

  const { user, accountNumber } = useAuth(); // Get account number from context
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setBalance(null); // Reset balance
    setLoading(true); // Set loading state

    try {
      const response = await fetch(
        `/api/userinfo?accountNumber=${accountNumber}`
      );
      if (!response.ok) {
        throw new Error(
          (await response.json()).error || "Something went wrong"
        );
      }

      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Check Account Balance</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-md`}
          >
            {loading ? "Loading..." : "Get Balance"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {balance !== null && (
          <p className="mt-4 text-green-500">Balance: {balance}</p>
        )}
      </div>
    </>
  );
};

export default BalancePage;
