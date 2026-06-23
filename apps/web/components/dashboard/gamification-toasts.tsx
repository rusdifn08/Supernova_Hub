"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";
import { Star } from "lucide-react";

export function GamificationToasts() {
  const { recentExpGains, clearExpGains } = useGamificationStore();

  useEffect(() => {
    if (recentExpGains.length > 0) {
      const timers = recentExpGains.map(gain => 
        setTimeout(() => clearExpGains(gain.id), 3000)
      );
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [recentExpGains, clearExpGains]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {recentExpGains.map((gain) => (
          <motion.div
            key={gain.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            className="bg-black/80 backdrop-blur-md border border-yellow-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center animate-pulse">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-bold">{gain.message}</p>
              <p className="text-yellow-400 font-black text-sm">+{gain.amount} EXP</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
