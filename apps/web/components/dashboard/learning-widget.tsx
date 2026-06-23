"use client";

import React from "react";
import { BookOpen, PlayCircle, Clock } from "lucide-react";

export function LearningWidget() {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Active Quest
        </h3>
        <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/30">
          Course
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/10 group-hover:border-blue-500/50 transition-colors">
          <img 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop" 
            alt="React Masterclass" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <div>
              <h4 className="text-white font-bold leading-tight">Mastering React Server Components</h4>
              <p className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 2h 15m remaining
              </p>
            </div>
          </div>
          
          <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <PlayCircle className="w-12 h-12 text-white shadow-2xl" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>Progress</span>
            <span className="text-blue-400">65%</span>
          </div>
          <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-blue-500 w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
