"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "../../../../../public/logo/recomtel.png";
import { useAuth } from "@/store/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout, loading } = useAuth();

  const userInitial = user?.nama ? user.nama.charAt(0).toUpperCase() : "U";
  const profileImageSrc = `https://placehold.co/400x400/f59e0b/ffffff?text=${userInitial}`;

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Promo", href: "/" },
    { name: "Aktivasi SIM Card", href: "/" },
    { name: "Isi Ulang", href: "/" },
    { name: "Blog", href: "/" },
    { name: "Bantuan", href: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = isScrolled || isMobileMenuOpen;

  const textColorClass = isSolid ? "text-gray-700" : "text-white";
  const hoverColorClass = isSolid
    ? "hover:text-amber-500"
    : "hover:text-amber-300";
  const buttonBorderClass = isSolid
    ? "border-amber-500 text-black"
    : "border-white text-white hover:bg-white hover:text-black";

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        /* 🟢 UPDATE 2: Padding Konsisten (py-4) agar tidak melompat */
        py-4
        ${isSolid ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"}
      `}
    >
      <nav className="container mx-auto px-4 h-16 flex justify-between items-center text-sm font-medium">
        <Link
          href="/"
          className="flex items-center space-x-2 cursor-pointer z-50"
        >
          <Image
            src={LogoImage}
            alt="Recomtel Logo"
            width={100}
            className="h-auto"
            style={{ filter: isSolid ? "none" : "brightness(0) invert(1)" }}
          />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div
            className={`hidden md:flex items-center space-x-6 ${textColorClass}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${hoverColorClass} transition duration-150`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse flex items-center gap-3">
                <div className="h-9 w-32 bg-gray-200 rounded-full"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 p-1 pr-3 rounded-full transition duration-150 
                    ${isSolid ? "hover:bg-gray-100" : "hover:bg-white/20"}
                  `}
                >
                  <div
                    className={`w-8 h-8 relative rounded-full overflow-hidden border ${
                      isSolid ? "border-gray-200" : "border-white/50"
                    }`}
                  >
                    <Image
                      src={profileImageSrc}
                      alt="User Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 
                      ${isProfileOpen ? "rotate-180" : ""}
                      ${textColorClass}
                    `}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-[350px] bg-[#e9eef6] rounded-[28px] shadow-2xl p-4 z-50 text-gray-800 border border-white/50 ring-1 ring-black/5"
                    >
                      <div className="flex justify-center items-center relative mb-2">
                        <span className="text-sm font-medium text-gray-600 truncate max-w-[200px]">
                          {user.email}
                        </span>
                        <button
                          onClick={() => setIsProfileOpen(false)}
                          className="absolute right-0 text-gray-500 hover:bg-gray-200 p-1 rounded-full transition"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-20 h-20 relative rounded-full overflow-hidden border-4 border-white shadow-sm mb-3">
                          <Image
                            src={profileImageSrc}
                            alt="User Avatar Large"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">
                          Halo, {user.nama}!
                        </h3>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="mt-4 px-6 py-2 border border-gray-400 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition bg-transparent"
                        >
                          Kelola Akun Anda
                        </Link>
                      </div>
                      <div className="bg-white rounded-xl overflow-hidden mt-2 shadow-sm">
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100"
                        >
                          <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                            <FaUser />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              Data Pribadi
                            </span>
                            <span className="text-xs text-gray-500">
                              Lihat profil lengkap
                            </span>
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition text-left"
                        >
                          <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                            <FaSignOutAlt />
                          </div>
                          <span className="font-medium text-sm">
                            Logout dari akun
                          </span>
                        </button>
                      </div>
                      <div className="mt-4 text-center text-[10px] text-gray-500 flex justify-center gap-2">
                        <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">
                          Kebijakan Privasi
                        </span>
                        <span>•</span>
                        <span className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">
                          Persyaratan Layanan
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isProfileOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                )}
              </div>
            ) : (
              <>
                <button
                  className={`border font-semibold py-1 px-3 rounded-full transition duration-150 ${buttonBorderClass}`}
                >
                  Dapatkan SIM Card
                </button>
                <Link
                  href="/login"
                  className="p-2 transition duration-150 cursor-pointer"
                >
                  <FaUser
                    className={`text-2xl transition duration-150 ${textColorClass} ${hoverColorClass}`}
                  />
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`text-2xl z-50 transition-colors duration-300 ${
              isMobileMenuOpen ? "text-black" : textColorClass
            }`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-0 left-0 w-full bg-white shadow-xl z-40 overflow-hidden pt-20"
          >
            <div className="flex flex-col p-4 space-y-6 h-full overflow-y-auto pb-32">
              {/* 1. PROFIL USER MOBILE */}
              <div className="pb-4 border-b border-gray-200">
                {loading ? (
                  <div className="animate-pulse flex items-center gap-3 p-2">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
                  </div>
                ) : (
                  user && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center space-x-3">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-200 shrink-0">
                        <Image
                          src={profileImageSrc}
                          alt="User Avatar Mobile"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-500">Halo,</p>
                        <p className="font-bold text-gray-800 text-lg truncate">
                          {user.nama || user.email}
                        </p>
                      </div>
                    </div>
                  )
                )}

                <div className="flex flex-col space-y-1 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition duration-150 py-3 px-3 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col space-y-3 mt-auto">
                <button className="w-full border-2 border-amber-500 text-black font-bold py-3 px-4 rounded-full hover:bg-amber-500 hover:text-white transition">
                  Dapatkan SIM Card
                </button>

                {user ? (
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 px-4 rounded-full hover:bg-red-100 transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3 px-4 rounded-full hover:bg-gray-800 transition"
                  >
                    <FaUser />
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
