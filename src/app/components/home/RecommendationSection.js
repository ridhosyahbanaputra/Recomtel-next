"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/store/AuthContext";
import { apiGet } from "@/lib/helper";
import { TARGET_OFFERS } from "@/lib/data";
import { shuffleArray } from "@/lib/utils";

export default function RecommendationSection() {
  const { user, loading: authLoading } = useAuth();
  const [displayList, setDisplayList] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setDisplayList(shuffleArray(TARGET_OFFERS));
      setIsDataReady(true);
      return;
    }

    async function fetchAndMatch() {
      try {
        const endpoint = `/recommend/user/${user.id}`;
        const res = await apiGet(endpoint);

        const topRecsRaw = res?.recommend?.slice(0, 3) || [];
        const recommendedNames = new Set(topRecsRaw.map((r) => r.package_id));

        let tempArr = [...TARGET_OFFERS];
        let recommendedItems = [];
        let remainingItems = [];

        tempArr.forEach((item) => {
          if (recommendedNames.has(item.name)) {
            recommendedItems.push({ ...item, isRecommended: true });
          } else {
            remainingItems.push(item);
          }
        });

        const apiOrder = topRecsRaw.map((r) => r.package_id);
        recommendedItems.sort((a, b) => {
          return apiOrder.indexOf(a.name) - apiOrder.indexOf(b.name);
        });

        const rankedRecommendedItems = recommendedItems.map((item, index) => ({
          ...item,
          rank: index + 1, 
        }));

        const shuffledRemaining = shuffleArray(remainingItems);

        setDisplayList([...rankedRecommendedItems, ...shuffledRemaining]);
      } catch (err) {
        console.error("Error Matching:", err);
        setDisplayList(shuffleArray(TARGET_OFFERS));
      } finally {
        setIsDataReady(true);
      }
    }

    fetchAndMatch();
  }, [user, authLoading]);

  if (authLoading || !isDataReady) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayList.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`
            flex flex-col justify-between p-6 rounded-xl shadow-sm border transition-all duration-300 group
            ${
              item.isRecommended
                ? "bg-amber-50 border-amber-400 ring-2 ring-amber-400 shadow-xl scale-[1.03] z-10 order-first"
                : "bg-white border-gray-100 hover:shadow-lg"
            }
          `}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider bg-gray-100 text-gray-600">
                {item.category}
              </span>

              {item.isRecommended && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                  Rekomendasi
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3
                className={`text-lg font-bold transition-colors ${
                  item.isRecommended ? "text-amber-700" : "text-gray-800"
                }`}
              >
                {item.name}
              </h3>

              {item.isRecommended && (
                <span className="bg-amber-400 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                  {`Top ${item.rank}`}
                </span>
              )}

              {item.isRecommended && (
                <span className="bg-amber-400 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                  {`AI PICK`}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-6 line-clamp-3">
              {item.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Harga</p>
              <p
                className={`font-bold text-xl ${
                  item.isRecommended ? "text-amber-700" : "text-amber-600"
                }`}
              >
                {item.price > 0
                  ? `Rp ${item.price.toLocaleString("id-ID")}`
                  : "Cek Promo"}
              </p>
            </div>
            <button
              className={`
                px-4 py-2 rounded-lg text-sm font-bold text-white transition transform active:scale-95
                ${
                  item.isRecommended
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-gray-900 hover:bg-gray-800"
                }
            `}
            >
              Beli
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
