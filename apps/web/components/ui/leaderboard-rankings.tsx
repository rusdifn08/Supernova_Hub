import React from 'react';
import { cn } from "@/lib/utils";

export type LeaderboardRankingItem = {
  userId: string;
  rank: number;
  userName: string;
  byline: string;
  value: number;
  displayed: boolean;
};

export function LeaderboardRankings({ rankings }: { rankings?: LeaderboardRankingItem[] }) {
  const defaultRankings: LeaderboardRankingItem[] = [
    { userId: "4", rank: 4, userName: "Diana", byline: "Consistent Learner", value: 6400, displayed: true },
    { userId: "5", rank: 5, userName: "Ethan", byline: "Night Owl", value: 5900, displayed: true },
    { userId: "6", rank: 6, userName: "Fiona", byline: "Speed Reader", value: 5100, displayed: true },
  ];
  const data = rankings || defaultRankings;

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto p-4">
      {data.map((item, i) => (
        <div 
          key={item.userId} 
          className="flex items-center justify-between p-4 rounded-2xl bg-card border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 font-bold text-muted-foreground text-lg">#{item.rank}</div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {item.userName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{item.userName}</span>
              <span className="text-xs text-muted-foreground">{item.byline}</span>
            </div>
          </div>
          <div className="font-mono font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
            {item.value} XP
          </div>
        </div>
      ))}
    </div>
  );
}
