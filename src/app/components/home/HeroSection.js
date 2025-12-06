"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBackground from "../../../../public/images/assets1.png"; 

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
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
  );
}
