"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiImage, FiX } from "react-icons/fi";
import { apiPost } from "@/lib/helper";

export default function AiRecommend() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAiQuery("");
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();

    const queryCopy = aiQuery.trim();
    if (!queryCopy && !imageFile) return;

    setIsThinking(true);
    setAiResponse(null);
    setAiQuery("");

    try {
      let data;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        data = await apiPost("/analyze_images", formData);
      } else {
        const jsonBody = { query: queryCopy };
        data = await apiPost("/chat_query", jsonBody);
      }

      if (data && (data.error || data.detail)) {
        throw new Error(data.error || data.detail);
      }

      setAiResponse({
        analysis: data.analysis,
        recommendation: data.recommendation,
        error: null,
        answer: data.recommendation
          ? `Rekomendasi Utama: ${data.recommendation.name}. Alasan: ${data.analysis.recommendationReason}`
          : data.answer || "Permintaan berhasil diproses.",
      });
    } catch (error) {
      let errorMessage =
        error.message || "Terjadi kesalahan saat menghubungi Backend FastAPI.";
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage =
          "Koneksi gagal. Pastikan Server FastAPI berjalan (Port 8000).";
      }

      setAiResponse({
        error: errorMessage,
      });
    } finally {
      setIsThinking(false);
      handleRemoveImage();
    }
  };

  return (
    <div className="mb-10 mt-5 flex flex-col items-center px-4">
      <form
        onSubmit={handleAiSubmit}
        className={`
          relative w-full max-w-3xl transition-all duration-300
          ${aiResponse ? "mb-6" : "mb-10"}
        `}
      >
        <div
          className="
          flex items-center w-full pr-3 pl-6 py-3 
          bg-gray-50 
          rounded-full
          shadow-[6px_6px_12px_#d0d0d0,-6px_-6px_12px_#ffffff]
          focus-within:shadow-[3px_3px_8px_#d0d0d0,-3px_-3px_8px_#ffffff]
          transition-all
        "
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`
                mr-3 text-2xl transition hover:scale-110 
                ${
                  imageFile
                    ? "text-green-500"
                    : "text-gray-500 hover:text-amber-600"
                }
            `}
            title="Upload Image Pemakaian Kuota"
          >
            <FiImage />
          </button>

          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder={
              imageFile
                ? "Tuliskan fokus analisis (Opsional)"
                : "Contoh: 'Paket apa yang cocok untuk nonton?'"
            }
            className="
              grow bg-transparent outline-none text-gray-800 text-base
            "
          />

          <button
            type="submit"
            disabled={isThinking || (!aiQuery.trim() && !imageFile)}
            className={`
                p-2.5 rounded-full text-white transition transform active:scale-95 text-xl 
                ${
                  isThinking
                    ? "bg-gray-400"
                    : "bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/50"
                }
            `}
          >
            <FiSend />
          </button>
        </div>

        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-white rounded-xl border border-gray-300 flex items-center gap-3 w-full"
          >
            <div
              className="w-16 h-16 bg-cover bg-center rounded-md relative"
              style={{ backgroundImage: `url(${imagePreview})` }}
            >
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md"
              >
                <FiX />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Image siap dianalisis: **{imageFile.name}**
            </p>
          </motion.div>
        )}
      </form>

      {isThinking && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 flex items-center gap-2 mb-4"
        >
          <span className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
          AI sedang menganalisis pemakaianmu...
        </motion.p>
      )}

      {aiResponse && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-xl border border-amber-400/50"
        >
          {aiResponse.error ? (
            <p className="font-bold text-red-600">
              <span className="text-xl mr-2">⚠️</span>Error: {aiResponse.error}
            </p>
          ) : (
            <>
              <p className="font-bold text-amber-700 mb-2">Recomtel AI:</p>

              <p
                className="text-gray-700 mt-1"
                dangerouslySetInnerHTML={{
                  __html: aiResponse.answer.replace(
                    /\*\*(.*?)\*\*/g,
                    "<b>$1</b>"
                  ),
                }}
              />

              {aiResponse.analysis && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Detail Analisis Pemakaian:
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    {aiResponse.analysis.dominantCategory &&
                      aiResponse.analysis.dominantCategory !== "N/A" && (
                        <li className="flex items-center">
                          <span className="font-medium w-28">Tipe User:</span>
                          <span className="font-bold text-amber-600">
                            {aiResponse.analysis.dominantCategory}
                          </span>
                        </li>
                      )}

                    {aiResponse.analysis.totalUsageGB &&
                      aiResponse.analysis.totalUsageGB !== "N/A" &&
                      aiResponse.analysis.totalUsageGB > 0 && (
                        <li className="flex items-center">
                          <span className="font-medium w-28">
                            Total Pemakaian:
                          </span>
                          <span>{aiResponse.analysis.totalUsageGB} GB</span>
                        </li>
                      )}

                    {(!aiResponse.analysis.dominantCategory ||
                      aiResponse.analysis.dominantCategory === "Other") &&
                      !aiResponse.analysis.totalUsageGB && (
                        <li className="text-xs italic text-gray-500">
                          *Analisis kuota gagal dilakukan dari gambar.
                        </li>
                      )}
                  </ul>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
