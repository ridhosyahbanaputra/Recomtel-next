"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);


const getInitialUser = () => {

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {

        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
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

    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);

    return () => clearTimeout(timer);
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
      localStorage.setItem("token", session?.access_token || "");

      router.push("/"); 
    } catch (error) {
      console.error("Login Error di Context:", error);
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading Authentication...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
