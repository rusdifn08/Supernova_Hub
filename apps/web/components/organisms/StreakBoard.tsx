import React from 'react';
import { StatCard } from '../molecules/StatCard';

export function StreakBoard({ streak = 24 }: { streak?: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-card text-card-foreground rounded-3xl shadow-sm border border-border w-full hover:shadow-lg transition-all duration-500 relative overflow-hidden group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-extrabold text-orange-500 mb-2 tracking-tight drop-shadow-sm">🔥 {streak}</div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6 md:mb-8">Day Streak</div>
        <div className="flex gap-2 md:gap-3 mt-2">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <StatCard key={day} day={day} active={day <= 5} />
          ))}
        </div>
      </div>
    </div>
  );
}
