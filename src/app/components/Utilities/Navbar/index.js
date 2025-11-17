"use client";

import React, { useState } from "react";
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

  const { user, logout, loading } = useAuth();

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  const profileImageSrc = `https://placehold.co/400x400/f59e0b/ffffff?text=${userInitial}`;

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Promo", href: "/promo" },
    { name: "Aktivasi SIM Card", href: "/aktivasi" },
    { name: "Isi Ulang", href: "/isi-ulang" },
    { name: "Blog", href: "/blog" },
    { name: "Bantuan", href: "/bantuan" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 h-20 flex justify-between items-center text-sm font-medium text-gray-700">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Image
            src={LogoImage}
            alt="Recomtel Logo"
            width={100}
            className="h-auto"
          />
        </Link>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="hidden text-black md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-amber-500 transition duration-150"
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
                  className={`flex items-center gap-2 hover:bg-gray-100 p-1 pr-3 rounded-full transition duration-150 ${
                    isProfileOpen ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={profileImageSrc}
                      alt="User Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <FaChevronDown
                    className={`text-xs text-gray-500 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Desktop */}
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
                          Halo, {user.name}!
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
                <button className="border border-amber-500 text-black font-semibold py-1 px-3 rounded-full hover:bg-amber-500 transition duration-150">
                  Dapatkan SIM Card
                </button>
                <Link
                  href="/login"
                  className="p-2 transition duration-150 cursor-pointer"
                >
                  <FaUser className="text-2xl hover:text-amber-500 transition duration-150 text-black" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* HAMBURGER BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-black z-50"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE DROPDOWN --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl z-40 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-6 h-full overflow-y-auto pb-32">
              {/* 1. PROFIL USER */}
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
                          {user.name || user.email}
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* 2. MENU NAVIGASI */}
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

              {/* 3. TOMBOL-TOMBOL (Bawah) */}
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
