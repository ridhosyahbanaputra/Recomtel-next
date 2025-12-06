"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock, FaInfinity, FaSignal } from "react-icons/fa";
import { benefitsData } from "@/lib/data";

const IconMap = {
  clock: FaClock,
  infinity: FaInfinity,
  signal: FaSignal,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

function BenefitCard({ iconName, title, description }) {
  const IconComponent = IconMap[iconName] || FaSignal;

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center border border-gray-100 h-full flex flex-col items-center"
    >
      <div className="w-20 h-20 flex items-center justify-center bg-amber-50 rounded-full mb-6 group-hover:bg-amber-100 transition-colors">
        <IconComponent className="text-4xl text-amber-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center text-4xl font-extrabold text-gray-900 mb-16"
        >
          Satu provider banyak untungnya!
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto"
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

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/register"
            className="text-amber-600 font-bold text-xl flex items-center justify-center group transition hover:text-amber-700"
          >
            Gabung Sekarang
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300 text-2xl">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
