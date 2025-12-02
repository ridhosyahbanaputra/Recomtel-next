"use client";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!data.success) {
      setMessage("Email tidak ditemukan");
      setIsLoading(false);
      return;
    }

    window.location.href = `/reset-password?userId=${data.userId}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Reset Kata Sandi
        </h2>
        <p className="text-gray-500 mb-8 text-center text-sm">
          Cari Email Untuk Reset Password.
        </p>

        {message && (
          <div
            className={`mb-6 p-3 rounded-lg text-center font-medium ${
              message.includes("tidak ditemukan")
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Masukan Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-full shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              "Cari Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
