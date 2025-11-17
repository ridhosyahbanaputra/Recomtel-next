"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // eslint-disable-next-line
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      alert("ERROR di Context: " + error.message);
      console.error(error);
    }
  };

  const logout = () => {
    console.log("Logout berhasil");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
