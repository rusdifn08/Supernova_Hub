import React from 'react';

export function Podium() {
  const data = [
    { userId: "1", userName: "Alice", rank: 1, value: 9500 },
    { userId: "2", userName: "Bob", rank: 2, value: 8200 },
    { userId: "3", userName: "Charlie", rank: 3, value: 7100 },
  ];

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4 h-56 md:h-64 p-2 md:p-4 mt-8 w-full">
      {/* 2nd Place */}
      <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-200 rounded-full mb-2 md:mb-3 flex items-center justify-center font-bold text-slate-600 shadow-md">2</div>
        <div className="text-xs md:text-sm font-semibold truncate w-16 md:w-24 text-center">{data[1]?.userName}</div>
        <div className="w-16 h-20 md:w-24 md:h-28 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-xl mt-2 md:mt-3 flex items-center justify-center font-mono text-slate-500 shadow-inner text-xs md:text-base">{data[1]?.value}</div>
      </div>
      {/* 1st Place */}
      <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-12 duration-700">
        <div className="w-14 h-14 md:w-20 md:h-20 bg-yellow-400 rounded-full mb-2 md:mb-3 flex items-center justify-center font-bold text-yellow-700 text-xl md:text-2xl shadow-xl border-4 border-yellow-200">1</div>
        <div className="text-sm md:text-base font-bold truncate w-20 md:w-28 text-center text-yellow-600">{data[0]?.userName}</div>
        <div className="w-20 h-28 md:w-28 md:h-36 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-xl mt-2 md:mt-3 flex items-center justify-center font-mono text-yellow-800 font-bold shadow-inner text-sm md:text-base">{data[0]?.value}</div>
      </div>
      {/* 3rd Place */}
      <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-600 rounded-full mb-2 md:mb-3 flex items-center justify-center font-bold text-amber-100 shadow-md">3</div>
        <div className="text-xs md:text-sm font-semibold truncate w-16 md:w-24 text-center">{data[2]?.userName}</div>
        <div className="w-16 h-16 md:w-24 md:h-20 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-xl mt-2 md:mt-3 flex items-center justify-center font-mono text-amber-200 shadow-inner text-xs md:text-base">{data[2]?.value}</div>
      </div>
    </div>
  );
}
