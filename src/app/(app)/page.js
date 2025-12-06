"use client";
import React from "react";
import HeroSection from "../components/home/HeroSection";
import BenefitsSection from "../components/home/BenefitsSection";
import RecommendationSection from "../components/home/RecommendationSection";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section  */}
      <BenefitsSection />

      {/* Recommendation Section */}
      <section className="pt-15 pb-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
            Rekomendasi Paket Untuk Kamu
          </h2>
          <RecommendationSection />
        </div>
      </section>
    </main>
  );
}
