// app/components/TransferForm.js

"use client"; // Enables client-side rendering
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function TransferForm() {
  const { user, username, accountNumber } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: username ? username : "", // Set initial username from user context
    sourceAccountNumber: accountNumber ? accountNumber : "", // Set initial account number
    targetAccountNumber: "",
    transferAmount: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(username);
  //   console.log(accountNumber);

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");

    // if (response.ok){
    //     targetAccountNumber: "",
    //     transferAmount: "",
    // }
    try {
      const response = await fetch("/api/customer/moneytransfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.userName,
          sourceAccountNumber: formData.sourceAccountNumber,
          targetAccountNumber: formData.targetAccountNumber,
          transferAmount: parseFloat(formData.transferAmount),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          targetAccountNumber: "", // Reset target account number
          transferAmount: "", // Reset transfer amount
        }));
        setResponseMessage(`Success: ${result.message}`);
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("Error: Could not process transfer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex items-center  min-h-screen bg-gradient-to-br from-green-900  to-red-950 h-screen">
        <div className=" p-12 max-w-md mx-auto w-full bg-white shadow-md rounded-md ">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Transfer Balance
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                readOnly // Make the username field read-only
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Your Account Number:
              </label>
              <input
                type="text"
                name="sourceAccountNumber"
                value={formData.sourceAccountNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                readOnly // Make the source account number field read-only
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Target Account Number:
              </label>
              <input
                type="text"
                name="targetAccountNumber"
                value={formData.targetAccountNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Transfer Amount:</label>
              <input
                type="number"
                name="transferAmount"
                value={formData.transferAmount}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Transfer"}
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}
