"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaInfinity, FaSignal } from "react-icons/fa";
import HeroBackground from "../../../public/images/assets1.png";

import { motion } from "framer-motion";

const benefitsData = [
  {
    iconName: "clock",
    title: "Kuota Utuh 24 Jam",
    description:
      "Nikmati kuota tanpa pembagian waktu, aktif 24 jam penuh tanpa batas.",
  },
  {
    iconName: "infinity",
    title: "Nomor Aktif Selamanya",
    description:
      "Nomor Anda akan tetap aktif selama Anda melakukan isi ulang minimal 1x dalam setahun.",
  },
  {
    iconName: "signal",
    title: "Sinyal Kuat",
    description:
      "Didukung oleh jaringan Telkomsel, sinyal dijamin kuat dan stabil di seluruh Indonesia.",
  },
];

const IconMap = {
  clock: FaClock,
  infinity: FaInfinity,
  signal: FaSignal,
};

// --- VARIAN ANIMASI  ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function BenefitCard({ iconName, title, description }) {
  const IconComponent = IconMap[iconName] || FaSignal;

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-6 md:p-10 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mx-auto w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full mb-4">
        <IconComponent className="text-3xl text-amber-500" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Animasi Gambar Background (Zoom In halus) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={HeroBackground}
            alt="Banner"
            fill
            priority={true}
            sizes="100vw"
            className="z-0 object-center object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-white text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-md"
            >
              BARENG <span className="text-amber-400">Recomtel</span> SERUNYA
              <br className="hidden md:block" /> GAK ADA ABISNYA
            </motion.h1>
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center text-3xl font-bold text-gray-800 mb-12"
          >
            Satu provider banyak untungnya!
          </motion.h2>

          {/* Animasi Grid Kartu (Staggered) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {benefitsData.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                iconName={benefit.iconName}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </motion.div>

          {/* Animasi Tombol Link */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/register"
              className="text-amber-500 font-semibold text-lg flex items-center justify-center group transition hover:text-amber-600"
            >
              Gabung Sekarang
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pt-15 pb-10 bg-white"></section>
    </main>
  );
}
