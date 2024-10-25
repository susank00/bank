"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null); // New state for account number

  const fetchUserSession = async () => {
    try {
      const response = await fetch("/api/auth/checksession", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setAccountNumber(data.user.accountNumber); // Set account number from user data
        } else {
          setUser(null);
          setAccountNumber(null);
        }
      } else {
        setUser(null);
        setAccountNumber(null);
      }
    } catch (error) {
      console.error("Failed to fetch user session", error);
      setUser(null);
      setAccountNumber(null);
    }
  };

  const handleLogin = async ({ email, password }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed.");
    }

    const data = await response.json();
    setUser(data.user);
    setAccountNumber(data.user.accountNumber); // Set account number on login
    return data;
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setAccountNumber(null); // Clear account number on logout
  };

  useEffect(() => {
    fetchUserSession(); // Fetch user session on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accountNumber, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
