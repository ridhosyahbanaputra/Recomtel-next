"use client";
import React from "react";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form Login disubmit!");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden transform transition ">
        <div className="bg-amber-500 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-1">Selamat Datang</h2>
          <p className="text-amber-100">Silakan masuk ke akun Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat Email
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@contoh.com"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kata Sandi
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan kata sandi"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-amber-600 hover:text-amber-700 transition duration-150"
            >
              Lupa Kata Sandi?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150"
          >
            Masuk
          </button>

          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-amber-600 hover:text-amber-700"
            >
              Daftar di sini
            </Link>
          </p>
        </form>

        <div className="text-center p-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
