"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
const AddBalanceForm = () => {
  const router = useRouter(); // Initialize useRouter
  const { user } = useAuth(); // Get user information from your auth hook
  const [accountNumber, setAccountNumber] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin/addbalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountNumber,
        amountToAdd: parseFloat(amountToAdd),
      }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setAccountNumber("");
      setAmountToAdd("");
    }
  };

  // If the user is not logged in, do not render the form
  if (!user) return null;

  return (
    <>
      <Sidebar />
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-lg font-bold mb-4">Add Balance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="amountToAdd"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Add
            </label>
            <input
              type="number"
              id="amountToAdd"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Add Balance
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
    </>
  );
};

export default AddBalanceForm;
