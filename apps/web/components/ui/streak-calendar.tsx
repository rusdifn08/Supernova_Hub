import React from 'react';
import { cn } from "@/lib/utils";

export type StreakPeriod = {
  periodStart: string;
  periodEnd: string;
};

export function StreakCalendar({ streak = 12 }: { streak?: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-2xl shadow-sm border border-border w-full max-w-sm mx-auto hover:shadow-lg transition-all">
      <div className="text-5xl font-extrabold text-orange-500 mb-2 tracking-tight">🔥 {streak}</div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Day Streak</div>
      <div className="flex gap-3 mt-2">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <div key={day} className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors", 
            day <= 5 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-muted text-muted-foreground"
          )}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}
          </div>
        ))}
      </div>
    </div>
  );
}
