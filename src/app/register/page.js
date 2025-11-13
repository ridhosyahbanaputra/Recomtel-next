"use client";

import React from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser, FaCheckCircle } from "react-icons/fa";

function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Registrasi disubmit!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-amber-500 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-1">
            Daftar Akun Baru
          </h2>
          <p className="text-amber-100">
            Bergabunglah dengan Recomtel sekarang.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Masukkan nama lengkap"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150"
                required
              />
            </div>
          </div>

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
                placeholder="Buat kata sandi"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Konfirmasi Kata Sandi
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCheckCircle className="text-gray-400" />
              </div>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Ulangi kata sandi"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 mt-6"
          >
            Daftar
          </button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-amber-600 hover:text-amber-700"
            >
              Masuk di sini
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
}

export default RegisterPage;
