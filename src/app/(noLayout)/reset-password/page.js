"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const FormInputValidated = ({
  icon: Icon,
  placeholder,
  value,
  onChange,
  isMatch = null,
  isConfirmField = false,
}) => {
  const [showPass, setShowPass] = useState(false);

  const iconColorClass =
    isMatch === true
      ? "text-green-500"
      : isMatch === false
      ? "text-red-500"
      : "text-gray-400";

  const LeftIcon = isConfirmField && isMatch === false ? MdCancel : Icon;
  const FinalIconClass =
    isConfirmField && isMatch !== null ? iconColorClass : "text-gray-400";

  const inputType = isConfirmField
    ? "password"
    : showPass
    ? "text"
    : "password";

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LeftIcon
          className={`${FinalIconClass} transition-colors duration-200`}
        />
      </div>

      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
        required
        minLength={6}
      />

      {!isConfirmField && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      )}
    </div>
  );
};

function ResetPasswordContent() {
  const params = useSearchParams();
  const userId = params.get("userId");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let isPasswordMatch = null;
  if (confirm.length > 0) {
    isPasswordMatch = password === confirm;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirm) {
      setLoading(false);
      return setMessage("Password tidak sama");
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword: password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(" Password berhasil direset. Silakan login kembali.");
      } else {
        setMessage(`Terjadi error: ${data.message || "Token tidak valid."}`);
      }
    } catch (error) {
      setMessage("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 text-center">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <p className="text-red-600 font-semibold text-lg">
            Parameter user ID tidak valid atau link telah kadaluarsa.
          </p>
          <Link
            href="/forgot-password"
            className="mt-4 text-amber-600 hover:text-amber-700 block"
          >
            Minta link reset baru
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Atur Ulang Password
        </h2>
        <p className="text-gray-500 mb-6 text-center text-sm">
          Masukkan Password Baru.
        </p>

        {message && (
          <div
            className={`mb-6 p-3 rounded-lg text-center font-medium ${
              message.includes("berhasil")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password Baru
            </label>
            <FormInputValidated
              icon={FaLock}
              type="password"
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Konfirmasi Password
            </label>
            <FormInputValidated
              icon={FaCheckCircle}
              errorIcon={MdCancel}
              type="password"
              placeholder="Konfirmasi password baru"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              isMatch={isPasswordMatch}
              isConfirmField={true}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password || !confirm}
            className="w-full flex justify-center py-2 px-4 rounded-full shadow-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 cursor-pointer"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ResetPasswordContent />;
    </Suspense>
  );
}
