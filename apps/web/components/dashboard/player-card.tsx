"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Shield, Zap } from "lucide-react";
import { useGamificationStore } from "@/store/useGamificationStore";

export function PlayerCard() {
  const { level, exp, maxExp, gold, playerName, playerClass } = useGamificationStore();
  const progress = (exp / maxExp) * 100;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-6">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Avatar (Dynamic Dicebear SVG) */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
        <img 
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${playerName}`} 
          alt="Avatar" 
          className="relative w-24 h-24 rounded-full border-2 border-white/20 bg-black/50 p-2"
        />
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-600 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black text-xs font-bold text-white shadow-[0_0_10px_rgba(250,204,21,0.5)]">
          {level}
        </div>
      </div>

      {/* Stats */}
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {playerName}
              <Shield className="w-5 h-5 text-cyan-400" />
            </h2>
            <p className="text-cyan-400/80 font-medium tracking-wide text-sm">{playerClass}</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              <Trophy className="w-4 h-4" />
              <span className="font-bold">{gold.toLocaleString()} G</span>
            </div>
          </div>
        </div>

        {/* EXP Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-gray-400">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-purple-400"/> EXP</span>
            <span>{exp} / {maxExp}</span>
          </div>
          <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-sm" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
