"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaCheckCircle,
  FaSignal,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const AuthPage = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterActive(true);
  };

  const handleLoginClick = () => {
    setIsRegisterActive(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl min-h-[700px] bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full p-8 transition-all duration-700 ease-in-out z-10">
          <RegisterForm />
        </div>

        <div className="absolute top-0 left-1/2 w-1/2 h-full p-8 transition-all duration-700 ease-in-out z-10">
          <LoginForm />
        </div>

        <div
          className={`
                        absolute top-0 left-0 w-1/2 h-full bg-amber-500 text-white
                        flex flex-col items-center justify-center p-12 text-center
                        transition-all duration-700 ease-in-out z-30
                        ${
                          isRegisterActive
                            ? "transform translate-x-full"
                            : "transform translate-x-0"
                        }
                    `}
        >
          {isRegisterActive ? (
            <OverlayPanel
              title="Sudah punya akun?"
              message="Masuk aja lewat sebelah."
              buttonText="Login"
              onClick={handleLoginClick}
            />
          ) : (
            <OverlayPanel
              title="Belum Punya Akun?"
              message="Daftar dulu disebelah sekarang."
              buttonText="Registrasi"
              onClick={handleRegisterClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Konten untuk Panel Overlay
 */
function OverlayPanel({ title, message, buttonText, onClick }) {
  return (
    <>
      <FaSignal className="text-8xl text-white/50 mb-6" />
      <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
      <p className="text-lg text-amber-100 mb-6">{message}</p>
      <button
        onClick={onClick}
        className="
                    bg-white text-amber-600 font-bold 
                    py-2 px-8 rounded-full shadow-lg
                    hover:bg-gray-100 transition duration-300 cursor-pointer
                "
      >
        {buttonText}
      </button>
      <Link href="/" className="mt-8 text-sm text-white/80 hover:text-white">
        ← Kembali ke Beranda
      </Link>
    </>
  );
}

/**
 * Komponen Input Kustom (dengan Icon)
 */
function FormInput({
  icon: Icon,
  type,
  errorIcon: ErrorIcon = null,
  placeholder,
  value,
  onChange,
  isPassword = false,
  showPassword,
  onToggleShowPassword,
  isMatch = null,
}) {
  const iconColorClass =
    isMatch === true
      ? "text-green-500"
      : isMatch === false
      ? "text-red-500"
      : "text-gray-400";

  const DisplayIcon = isMatch === false && ErrorIcon ? ErrorIcon : Icon;
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <DisplayIcon
          className={`${iconColorClass} text-lg transition-colors duration-200`}
        />
      </div>

      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        required
      />

      {isPassword && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={onToggleShowPassword}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Form Login (Kanan)
 */
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal!");
        return;
      }
      console.log("Login berhasil:", data);

      router.push("/");
    } catch (err) {
      setError("Tidak dapat terhubung ke server.");
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Login Akun
      </h2>
      <p className="text-gray-500 mb-6 text-center">Selamat datang kembali!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon={FaEnvelope}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          icon={FaLock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword={true}
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
        />

        {error && <p className="text-xs text-red-600 text-center">{error}</p>}

        <Link
          href="#"
          className="text-sm text-amber-600 hover:text-amber-700 block text-right"
        >
          Lupa Kata Sandi?
        </Link>
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 rounded-full shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 cursor-pointer"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}

/**
 * Form Register (Kiri)
 */

function RegisterForm() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let confirmPassMatchState = null;
  if (confirmPassword.length > 0) {
    confirmPassMatchState = password === confirmPassword;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal!");
      } else {
        setSuccess(
          data.message || "Registrasi berhasil! Silakan pindah ke tab Login."
        );
        setNama("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("Tidak dapat terhubung ke server.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center ">
        Register
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon={FaUser}
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <FormInput
          icon={FaEnvelope}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          icon={FaLock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword={true}
          showPassword={showPass}
          onToggleShowPassword={() => setShowPass(!showPass)}
        />
        <FormInput
          icon={FaCheckCircle}
          errorIcon={MdCancel}
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isMatch={confirmPassMatchState}
        />
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 rounded-full shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 cursor-pointer flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin text-lg" />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
