import React from 'react';
import { Podium } from '../molecules/Podium';
import { UserRankRow } from '../molecules/UserRankRow';

export function LeaderboardSection() {
  const rankings = [
    { userId: "4", rank: 4, userName: "Diana", byline: "Consistent Learner", value: 6400 },
    { userId: "5", rank: 5, userName: "Ethan", byline: "Night Owl", value: 5900 },
    { userId: "6", rank: 6, userName: "Fiona", byline: "Speed Reader", value: 5100 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start bg-card/50 rounded-3xl p-4 md:p-8 border shadow-sm w-full h-full">
      <div className="w-full lg:w-1/2 flex-1">
        <Podium />
      </div>
      <div className="w-full lg:w-1/2 flex-1 flex flex-col gap-3 justify-center">
        {rankings.map((item, i) => (
          <UserRankRow key={item.userId} {...item} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}
