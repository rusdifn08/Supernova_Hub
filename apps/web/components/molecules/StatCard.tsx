import React from 'react';
import { cn } from "@/lib/utils";

export function StatCard({ day, active }: { day: number; active: boolean }) {
  return (
    <div className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300", 
      active ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-110" : "bg-muted text-muted-foreground"
    )}>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}
    </div>
  );
}
