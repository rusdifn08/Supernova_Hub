import React from 'react';

export type UserRankRowProps = {
  rank: number;
  userName: string;
  byline: string;
  value: number;
  delay?: number;
};

export function UserRankRow({ rank, userName, byline, value, delay = 0 }: UserRankRowProps) {
  return (
    <div 
      className="flex items-center justify-between p-3 md:p-4 rounded-2xl bg-card border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-6 md:w-8 font-bold text-muted-foreground text-base md:text-lg">#{rank}</div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
          {userName.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-sm md:text-base">{userName}</span>
          <span className="text-xs text-muted-foreground">{byline}</span>
        </div>
      </div>
      <div className="font-mono font-bold text-primary bg-primary/5 px-2 md:px-3 py-1 rounded-full text-sm md:text-base">
        {value} XP
      </div>
    </div>
  );
}
