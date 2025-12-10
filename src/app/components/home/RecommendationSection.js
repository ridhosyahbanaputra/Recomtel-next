"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/store/AuthContext";
import { apiGet } from "@/lib/helper";
import { TARGET_OFFERS } from "@/lib/data";

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

function PackageCard({ headerLines = [], mainLines, price }) {
  return (
    <motion.div
      whileHover={{
        y: -4,

        boxShadow: "0 18px 35px rgba(15, 23, 42, 0.12)",
      }}
      transition={{ duration: 0.2 }}
      className="shrink-0 w-[150px] sm:w-[170px] md:w-[190px] rounded-3xl border border-gray-200 bg-white px-4 pt-4 pb-4 flex flex-col justify-between relative overflow-hidden"
    >
      <div>
        {headerLines.length > 0 && (
          <div className="mb-2 space-y-0.5">
            {headerLines.map((line, index) => (
              <p
                key={index}
                className="text-[11px] font-semibold text-gray-800 leading-tight"
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {mainLines && mainLines.length > 0 && (
          <p className="text-2xl font-extrabold text-gray-900 leading-tight">
            {mainLines[0]}
          </p>
        )}

        {mainLines &&
          mainLines.slice(1).map((line, index) => (
            <p key={index} className="mt-1 text-sm text-gray-800 leading-tight">
              {line}
            </p>
          ))}
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3">
        <p className="text-[11px] sm:text-sm font-semibold mb-2 text-orange-500">
          {price}
        </p>

        <button
          type="button"
          className="w-full rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-white transition-colors bg-rose-500 hover:bg-rose-600"
        >
          Beli
        </button>
      </div>
    </motion.div>
  );
}

function PackageSection({ title, cards, isRecommendedSection, rank }) {
  return (
    <section
      className={`rounded-2xl border px-4 py-5 md:px-6 md:py-6 transition-all duration-500 ${
        isRecommendedSection
          ? "border-amber-400 bg-amber-50/50"
          : "border-gray-100 bg-gray-50/30"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-5">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>

        {isRecommendedSection && (
          <>
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full  shadow-sm">
              TOP {rank}
            </span>
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full  shadow-sm">
              AI PICK ⚡
            </span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              Rekomendasi Teratas
            </span>
          </>
        )}
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide px-1">
        {cards.map((card, index) => (
          <PackageCard
            key={`${title}-${index}`}
            {...card}
            isRecommended={isRecommendedSection && index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export default function RecommendationSection() {
  const { user, loading: authLoading } = useAuth();
  const [sections, setSections] = useState(TARGET_OFFERS);
  const [isDataReady, setIsDataReady] = useState(false);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setSections(TARGET_OFFERS);
      setIsDataReady(true);
      return;
    }

    async function fetchAndMatch() {
      try {
        const endpoint = `/api/recommend/user/${user.id}`;
        const res = await apiGet(endpoint);

        const topRecsRaw = res?.recommend?.slice(0, 3) || [];
        const topRecNames = topRecsRaw.map((r) => r.package_id.toLowerCase());

        if (topRecNames.length > 0) {
          let recommendedSections = [];
          let otherSections = [];

          TARGET_OFFERS.forEach((section) => {
            const sectionTitleLower = section.title.toLowerCase();
            const rankIndex = topRecNames.indexOf(sectionTitleLower);

            if (rankIndex !== -1) {
              recommendedSections.push({
                ...section,
                isRecommendedSection: true,
                rank: rankIndex + 1,
              });
            } else {
              otherSections.push(section);
            }
          });

          recommendedSections.sort((a, b) => a.rank - b.rank);
          setSections([...recommendedSections, ...otherSections]);
        } else {
          setSections(TARGET_OFFERS);
        }
      } catch (err) {
        console.error("Error Matching:", err);
        setSections(TARGET_OFFERS);
      } finally {
        setIsDataReady(true);
      }
    }

    fetchAndMatch();
  }, [user, authLoading]);

  if (authLoading || !isDataReady) {
    return (
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const topSections = sections.slice(0, 3);
  const hiddenSections = sections.slice(3);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="space-y-8 md:space-y-12">
        {topSections.map((section) => (
          <motion.div key={section.title} variants={fadeInUp}>
            <PackageSection
              title={section.title}
              cards={section.cards}
              isRecommendedSection={section.isRecommendedSection}
              rank={section.rank}
            />
          </motion.div>
        ))}

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-8 md:space-y-12 overflow-hidden"
            >
              {hiddenSections.map((section) => (
                <motion.div
                  key={section.title}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <PackageSection
                    title={section.title}
                    cards={section.cards}
                    isRecommendedSection={section.isRecommendedSection}
                    rank={section.rank}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hiddenSections.length > 0 && (
        <div className="flex justify-center pt-8 border-t border-gray-100 mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors duration-300 outline-none"
          >
            <span className="text-xl font-bold widest transition-all group-hover:[0.15rem]">
              {showAll
                ? "Tutup"
                : `Lihat ${hiddenSections.length} Paket Lainnya`}
            </span>

            <span
              className={`text-xl transition-transform duration-500 ${
                showAll ? "rotate-180" : "group-hover:translate-y-1"
              }`}
            >
              ▼
            </span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
