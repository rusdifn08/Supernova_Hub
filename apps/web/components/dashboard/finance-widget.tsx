"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet, TrendingUp, TrendingDown, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", balance: 4000, income: 2400, expense: 1000 },
  { name: "Tue", balance: 3000, income: 1398, expense: 2000 },
  { name: "Wed", balance: 2000, income: 9800, expense: 2780 },
  { name: "Thu", balance: 2780, income: 3908, expense: 1890 },
  { name: "Fri", balance: 1890, income: 4800, expense: 2390 },
  { name: "Sat", balance: 2390, income: 3800, expense: 3490 },
  { name: "Sun", balance: 3490, income: 4300, expense: 1000 },
];

export function FinanceWidget() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-cyan-500/20" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-cyan-400" />
          Treasury
        </h3>
        <button className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors flex items-center gap-1">
          <ArrowRightLeft className="w-3 h-3" /> Transact
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3">
          <div className="text-gray-400 text-xs font-medium mb-1">Total Balance</div>
          <div className="text-xl font-bold text-white">$12,450.00</div>
          <div className="text-green-400 text-xs font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +2.4%
          </div>
        </div>
        <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3">
          <div className="text-gray-400 text-xs font-medium mb-1">Monthly Spend</div>
          <div className="text-xl font-bold text-white">$3,240.00</div>
          <div className="text-red-400 text-xs font-medium flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3" /> -1.2%
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[150px] relative w-full">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#22d3ee" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">Loading chart...</div>
        )}
      </div>
    </div>
  );
}
