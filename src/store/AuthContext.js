"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

const AuthSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="text-center">
      <ImSpinner2 
        className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" 
      />
      <p className="text-sm text-gray-600 font-medium">Loading Verification...</p>
    </div>
  </div>
);

const AuthContext = createContext(null);

const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user:", error);
        localStorage.removeItem("user");
        return null;
      }
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 50);
    return () => clearTimeout(timeout);
  }, []);

  const login = (userData, session) => {
    try {
      const userObj = {
        id: userData.id,
        email: userData.email,
        nama: userData.user_metadata?.nama || userData.nama || null,
      };

      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));

      if (session?.access_token)
        localStorage.setItem("token", session.access_token);

      router.replace("/");
    } catch (error) {
      console.error("Login Context Error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <AuthSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
