"use client";
import React from "react";
import HeroSection from "../components/home/HeroSection";
import AiRecommend from "../components/home/AiRecommend";
import RecommendationSection from "../components/home/RecommendationSection";
import BenefitsSection from "../components/home/BenefitsSection";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      {/* AI commands */}
      <section className="pt-15 pb-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">
            Bingung pilih paket, tanya aja kesini
          </h1>
          <AiRecommend />
        </div>
      </section>
      {/* Recommendation Section */}
      <section className="pt-15 pb-10 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-10">
            Rekomendasi Paket Untuk Kamu
          </h1>
          <RecommendationSection />
        </div>
      </section>
      {/* Benefits Section  */}
      <BenefitsSection />
    </main>
  );
}
