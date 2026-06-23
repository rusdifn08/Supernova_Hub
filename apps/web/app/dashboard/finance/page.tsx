"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, ArrowRightLeft, CreditCard, PiggyBank, Briefcase, Coffee, Car, Zap, Gamepad2, ShoppingBag, Plus, DollarSign, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGamificationStore } from "@/store/useGamificationStore";
import { cn } from "@/lib/utils";

const initialChartData = [
  { name: "Mon", income: 240, expense: 100 },
  { name: "Tue", income: 139, expense: 200 },
  { name: "Wed", income: 980, expense: 278 },
  { name: "Thu", income: 390, expense: 189 },
  { name: "Fri", income: 480, expense: 239 },
  { name: "Sat", income: 380, expense: 349 },
  { name: "Sun", income: 430, expense: 100 },
];

const initialTransactions = [
  { id: 1, name: "Supernova Pro", amount: -12.00, date: "Today", category: "Software", icon: Zap },
  { id: 2, name: "Freelance", amount: 1500.00, date: "Yesterday", category: "Income", icon: Briefcase },
  { id: 3, name: "Coffee Shop", amount: -4.50, date: "Mon, 12th", category: "Food", icon: Coffee },
  { id: 4, name: "Grocery", amount: -45.20, date: "Sun, 11th", category: "Shopping", icon: ShoppingBag },
  { id: 5, name: "Internet", amount: -60.00, date: "Sat, 10th", category: "Utilities", icon: Zap },
];

const categories = [
  { name: "Food", icon: Coffee, color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  { name: "Transport", icon: Car, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { name: "Utilities", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  { name: "Entertainment", icon: Gamepad2, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  { name: "Shopping", icon: ShoppingBag, color: "text-pink-400", bg: "bg-pink-500/20", border: "border-pink-500/30" },
];

export default function FinancePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { gainExp } = useGamificationStore();
  
  const [transactions, setTransactions] = useState(initialTransactions);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  useEffect(() => setIsMounted(true), []);

  const handleAddTransaction = () => {
    if (!amount || !desc) return;
    
    const val = parseFloat(amount);
    if (isNaN(val)) return;

    const newTx = {
      id: Date.now(),
      name: desc,
      amount: type === "expense" ? -val : val,
      date: "Just now",
      category: type === "expense" ? selectedCategory : "Income",
      icon: type === "expense" ? categories.find(c => c.name === selectedCategory)?.icon || Wallet : Briefcase
    };

    setTransactions([newTx, ...transactions]);
    setAmount("");
    setDesc("");
    gainExp(15, "Tracked a transaction. Good financial discipline!");
  };

  return (
    <div className="flex flex-col h-full space-y-3 xl:space-y-4 xl:overflow-hidden pr-1 relative overflow-y-auto xl:overflow-y-hidden custom-scrollbar">
      
      {/* Top Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 shrink-0 bg-black/20 p-3 md:p-4 rounded-2xl border border-white/5">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(1.5rem,2.5vw,2rem)] font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-3 leading-tight"
          >
            <Wallet className="w-8 h-8 text-cyan-400" /> Financial Command
          </motion.h1>
          <p className="text-gray-400 mt-1 text-[clamp(0.75rem,1vw,0.875rem)]">Track wealth, monitor investments, and build your empire.</p>
        </div>
      </header>

      {/* Main Layout Area - One Page System on Desktop */}
      <div className="flex-1 flex flex-col gap-3 xl:gap-4 xl:overflow-hidden pb-4">
        
        {/* Top Assets Row - Fixed Height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-4 shrink-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[40px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold mb-1 flex items-center gap-2 text-sm xl:text-base"><CreditCard className="w-4 h-4 text-cyan-400" /> Liquid Cash</h3>
            <p className="text-2xl xl:text-3xl font-black text-white">$12,450.00</p>
            <p className="text-green-400 text-xs xl:text-sm mt-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +2.4% this month</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-[40px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold mb-1 flex items-center gap-2 text-sm xl:text-base"><Briefcase className="w-4 h-4 text-purple-400" /> Investments</h3>
            <p className="text-2xl xl:text-3xl font-black text-white">$45,200.50</p>
            <p className="text-green-400 text-xs xl:text-sm mt-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +8.1% all time</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[40px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold mb-1 flex items-center gap-2 text-sm xl:text-base"><PiggyBank className="w-4 h-4 text-yellow-400" /> Savings Goal</h3>
            <p className="text-2xl xl:text-3xl font-black text-white">$5,000.00</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2 xl:mt-3"><div className="h-full bg-yellow-400 w-[60%] shadow-[0_0_10px_rgba(250,204,21,0.8)]" /></div>
            <p className="text-gray-400 text-[10px] xl:text-xs mt-1.5 text-right">60% reached</p>
          </motion.div>
        </div>

        {/* Bottom Tools Row - Fills remaining space */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 xl:gap-4 xl:overflow-hidden min-h-[400px]">
          
          {/* Column 1: Add Transaction (Money Tracker) */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0"><Plus className="w-5 h-5 text-cyan-400" /> Add Transaction</h3>
            
            <div className="flex bg-white/5 p-1 rounded-xl mb-4 shrink-0">
              <button 
                onClick={() => setType("expense")}
                className={cn("flex-1 py-1.5 text-sm font-bold rounded-lg transition-all", type === "expense" ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "text-gray-500 hover:text-white")}
              >Expense</button>
              <button 
                onClick={() => setType("income")}
                className={cn("flex-1 py-1.5 text-sm font-bold rounded-lg transition-all", type === "income" ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]" : "text-gray-500 hover:text-white")}
              >Income</button>
            </div>

            <div className="space-y-4 shrink-0">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white font-bold text-lg focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Description</label>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What was this for?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors" />
              </div>

              {type === "expense" && (
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
                  <div className="grid grid-cols-5 gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat.name} onClick={() => setSelectedCategory(cat.name)}
                        className={cn("flex flex-col items-center justify-center p-2 rounded-xl border transition-all aspect-square", selectedCategory === cat.name ? `${cat.bg} ${cat.border} ${cat.color}` : "border-white/5 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300")}
                        title={cat.name}
                      >
                        <cat.icon className="w-5 h-5 mb-1" />
                        <span className="text-[9px] font-bold truncate w-full text-center">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={handleAddTransaction} className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Save Transaction
              </button>
            </div>
          </div>

          {/* Column 2: Mini Chart & Management (Replaces giant chart) */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 flex flex-col h-full">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0"><ArrowRightLeft className="w-5 h-5 text-cyan-400" /> Cash Flow Analytics</h3>
            
            <div className="flex-1 w-full min-h-[150px] mb-4">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={initialChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={5} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="income" fill="#22d3ee" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="expense" fill="#f87171" radius={[2, 2, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Loading chart...</div>}
            </div>

            <div className="shrink-0 pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Expenses This Month</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-white flex items-center gap-1"><Coffee className="w-3 h-3 text-orange-400" /> Food & Dining</span><span className="text-gray-400">$450.00</span></div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-400 w-[45%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-white flex items-center gap-1"><ShoppingBag className="w-3 h-3 text-pink-400" /> Shopping</span><span className="text-gray-400">$320.00</span></div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-pink-400 w-[30%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-white flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> Utilities</span><span className="text-gray-400">$180.00</span></div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[18%]" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Recent Activity (Internal Scrolling) */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-gray-400" /> Recent Activity</h3>
              <button className="text-cyan-400 text-xs font-medium hover:text-cyan-300">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
              {transactions.map(tx => {
                const Icon = tx.icon;
                const isIncome = tx.amount > 0;
                return (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors", isIncome ? "bg-green-500/10 text-green-400 group-hover:bg-green-500/20" : "bg-white/5 text-gray-400 group-hover:bg-white/10")}>
                        {Icon ? <Icon className="w-5 h-5" /> : (isIncome ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{tx.name}</h4>
                        <p className="text-[10px] text-gray-400">{tx.category} • {tx.date}</p>
                      </div>
                    </div>
                    <div className={cn("font-bold text-sm", isIncome ? "text-green-400" : "text-white")}>
                      {isIncome ? '+' : ''}{tx.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
