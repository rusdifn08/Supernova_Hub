"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, ArrowRightLeft, CreditCard, PiggyBank, Briefcase, Coffee, Car, Zap, Gamepad2, ShoppingBag, Plus, Banknote, Clock, Gift, Heart, Home, Monitor, Star, Award, Music, Video, Smile, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGamificationStore } from "@/store/useGamificationStore";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const ICON_MAP: Record<string, any> = {
  Wallet, TrendingUp, TrendingDown, ArrowRightLeft, CreditCard, PiggyBank, Briefcase, Coffee, Car, Zap, Gamepad2, ShoppingBag, Plus, Banknote, Clock, Gift, Heart, Home, Monitor, Star, Award, Music, Video, Smile
};

const defaultCategories = [
  { name: "Food", icon: "Coffee", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", type: "EXPENSE" },
  { name: "Transport", icon: "Car", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30", type: "EXPENSE" },
  { name: "Utilities", icon: "Zap", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", type: "EXPENSE" },
  { name: "Entertainment", icon: "Gamepad2", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30", type: "EXPENSE" },
  { name: "Shopping", icon: "ShoppingBag", color: "text-pink-400", bg: "bg-pink-500/20", border: "border-pink-500/30", type: "EXPENSE" },
  { name: "Salary", icon: "Briefcase", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30", type: "INCOME" },
  { name: "Freelance", icon: "Monitor", color: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/30", type: "INCOME" },
  { name: "Gift", icon: "Gift", color: "text-pink-400", bg: "bg-pink-500/20", border: "border-pink-500/30", type: "INCOME" },
];

export default function FinancePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { gainExp } = useGamificationStore();
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  
  const [customCategories, setCustomCategories] = useState<any[]>([]);
  const allCategories = [...defaultCategories, ...customCategories];
  const filteredCategories = allCategories.filter(c => c.type === (type === "expense" ? "EXPENSE" : "INCOME"));
  
  const [selectedCategory, setSelectedCategory] = useState(filteredCategories[0]?.name || "Food");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("Star");
  const [newCatColor, setNewCatColor] = useState("text-yellow-400");
  const [newCatType, setNewCatType] = useState<"INCOME"|"EXPENSE">("EXPENSE");

  useEffect(() => {
    setIsMounted(true);
    fetchFinanceData();
  }, []);

  useEffect(() => {
    const currentFiltered = allCategories.filter(c => c.type === (type === "expense" ? "EXPENSE" : "INCOME"));
    if (currentFiltered.length > 0 && !currentFiltered.find(c => c.name === selectedCategory)) {
      setSelectedCategory(currentFiltered[0].name);
    }
  }, [type, customCategories]);

  const fetchFinanceData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const res = await fetch(`http://${window.location.hostname}:4000/finance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
        setTotalBalance(data.totalBalance || 0);
        setTotalIncome(data.totalIncome || 0);
        setTotalExpense(data.totalExpense || 0);
        
        const catRes = await fetch(`http://${window.location.hostname}:4000/finance/categories`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (catRes.ok) {
          const catData = await catRes.json();
          setCustomCategories(catData || []);
        }
        
        // Calculate chart data based on last 7 days
        const last7Days = Array.from({length: 7}).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return {
            name: daysOfWeek[d.getDay()],
            dateString: d.toISOString().split('T')[0],
            income: 0,
            expense: 0
          };
        });

        (data.transactions || []).forEach((tx: any) => {
          const txDate = new Date(tx.date).toISOString().split('T')[0];
          const dayData = last7Days.find(d => d.dateString === txDate);
          if (dayData) {
            if (tx.type === 'INCOME') dayData.income += tx.amount;
            if (tx.type === 'EXPENSE') dayData.expense += tx.amount;
          }
        });
        
        setChartData(last7Days);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const handleAddTransaction = async () => {
    if (!amount) return;
    const val = parseFloat(amount);
    if (isNaN(val)) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const finalDesc = desc.trim() || selectedCategory;

    try {
      const res = await fetch(`http://${window.location.hostname}:4000/finance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          type: type === "income" ? "INCOME" : "EXPENSE",
          amount: val,
          name: finalDesc,
          category: selectedCategory
        })
      });

      if (res.ok) {
        setAmount("");
        setDesc("");
        gainExp(15, "Tracked a transaction. Good financial discipline!");
        fetchFinanceData(); // Refresh data
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCategory = async () => {
    if (!newCatName) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const bgMap: Record<string, string> = {
      "text-orange-400": "bg-orange-500/20", "text-blue-400": "bg-blue-500/20",
      "text-yellow-400": "bg-yellow-500/20", "text-purple-400": "bg-purple-500/20",
      "text-pink-400": "bg-pink-500/20", "text-green-400": "bg-green-500/20",
      "text-cyan-400": "bg-cyan-500/20", "text-red-400": "bg-red-500/20"
    };
    const borderMap: Record<string, string> = {
      "text-orange-400": "border-orange-500/30", "text-blue-400": "border-blue-500/30",
      "text-yellow-400": "border-yellow-500/30", "text-purple-400": "border-purple-500/30",
      "text-pink-400": "border-pink-500/30", "text-green-400": "border-green-500/30",
      "text-cyan-400": "border-cyan-500/30", "text-red-400": "border-red-500/30"
    };

    try {
      const res = await fetch(`http://${window.location.hostname}:4000/finance/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          type: newCatType,
          name: newCatName,
          icon: newCatIcon,
          color: newCatColor,
          bg: bgMap[newCatColor] || "bg-gray-500/20",
          border: borderMap[newCatColor] || "border-gray-500/30"
        })
      });
      if (res.ok) {
        setNewCatName("");
        setIsModalOpen(false);
        fetchFinanceData();
      }
    } catch (err) { console.error(err); }
  };

  const expenseByCategory = transactions
    .filter(tx => tx.type === 'EXPENSE')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, {} as Record<string, number>);

  const topExpenses = Object.keys(expenseByCategory)
    .map(category => ({ category, amount: expenseByCategory[category] }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

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
            <p className="text-2xl xl:text-3xl font-black text-white">{formatIDR(totalBalance)}</p>
            <p className="text-green-400 text-xs xl:text-sm mt-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Tracked Balance</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-[40px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold mb-1 flex items-center gap-2 text-sm xl:text-base"><Briefcase className="w-4 h-4 text-purple-400" /> Total Income</h3>
            <p className="text-2xl xl:text-3xl font-black text-white">{formatIDR(totalIncome)}</p>
            <p className="text-green-400 text-xs xl:text-sm mt-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> All time inflow</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[40px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold mb-1 flex items-center gap-2 text-sm xl:text-base"><PiggyBank className="w-4 h-4 text-red-400" /> Total Expenses</h3>
            <p className="text-2xl xl:text-3xl font-black text-white">{formatIDR(totalExpense)}</p>
            <p className="text-red-400 text-[10px] xl:text-xs mt-1.5 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> All time outflow</p>
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Amount (Rp)</label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white font-bold text-lg focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Description</label>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What was this for?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Category</label>
                  <button onClick={() => { setNewCatType(type === "expense" ? "EXPENSE" : "INCOME"); setIsModalOpen(true); }} className="text-[10px] flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 transition-colors">
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {filteredCategories.map(cat => {
                    const Icon = ICON_MAP[cat.icon] || Wallet;
                    return (
                      <button 
                        key={cat.id || cat.name} onClick={() => setSelectedCategory(cat.name)}
                        className={cn("flex flex-col items-center justify-center p-2 rounded-xl border transition-all aspect-square", selectedCategory === cat.name ? `${cat.bg} ${cat.border} ${cat.color} shadow-[0_0_10px_rgba(255,255,255,0.05)]` : "border-white/5 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300")}
                        title={cat.name}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-[9px] font-bold truncate w-full text-center">{cat.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button onClick={handleAddTransaction} className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Save Transaction
              </button>
            </div>
          </div>

          {/* Column 2: Mini Chart & Management */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 xl:p-5 flex flex-col h-full">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 shrink-0"><ArrowRightLeft className="w-5 h-5 text-cyan-400" /> Cash Flow Analytics</h3>
            
            <div className="flex-1 w-full min-h-[150px] mb-4">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={5} />
                    <Tooltip 
                      formatter={(value: any) => formatIDR(value as number)}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                    />
                    <Bar dataKey="income" fill="#22d3ee" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="expense" fill="#f87171" radius={[2, 2, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Loading chart...</div>}
            </div>

            <div className="shrink-0 pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Expenses This Month</h4>
              <div className="space-y-3">
                {topExpenses.length > 0 ? topExpenses.map((expense, index) => {
                  const catObj = allCategories.find(c => c.name === expense.category);
                  const Icon = catObj && ICON_MAP[catObj.icon] ? ICON_MAP[catObj.icon] : ShoppingBag;
                  const colorClass = catObj ? catObj.color : "text-gray-400";
                  const bgClass = catObj ? catObj.bg.replace('/20', '') : "bg-gray-400";
                  const percentage = totalExpense > 0 ? (expense.amount / totalExpense) * 100 : 0;
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1"><span className="text-white flex items-center gap-1"><Icon className={`w-3 h-3 ${colorClass}`} /> {expense.category}</span><span className="text-gray-400">{formatIDR(expense.amount)}</span></div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${bgClass}`} style={{ width: `${percentage}%` }} /></div>
                    </div>
                  );
                }) : <p className="text-xs text-gray-500">No expenses yet.</p>}
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
                const isIncome = tx.type === "INCOME";
                const catObj = allCategories.find(c => c.name === tx.category);
                const Icon = catObj && ICON_MAP[catObj.icon] ? ICON_MAP[catObj.icon] : null;
                const formattedDate = new Date(tx.date).toLocaleDateString();
                
                return (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors", isIncome ? "bg-green-500/10 text-green-400 group-hover:bg-green-500/20" : "bg-white/5 text-gray-400 group-hover:bg-white/10")}>
                        {Icon ? <Icon className="w-5 h-5" /> : (isIncome ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{tx.name}</h4>
                        <p className="text-[10px] text-gray-400">{tx.category} • {formattedDate}</p>
                      </div>
                    </div>
                    <div className={cn("font-bold text-sm", isIncome ? "text-green-400" : "text-white")}>
                      {isIncome ? '+' : '-'}{formatIDR(Math.abs(tx.amount))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">New {newCatType === "INCOME" ? "Income" : "Expense"} Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors"><X className="w-4 h-4 text-gray-400 hover:text-white" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Name</label>
                <input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="E.g. Bonus" className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Icon</label>
                <div className="grid grid-cols-6 gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-1">
                  {Object.keys(ICON_MAP).map(iconName => {
                    const Icon = ICON_MAP[iconName];
                    return (
                      <button key={iconName} onClick={() => setNewCatIcon(iconName)} className={cn("p-2 flex items-center justify-center rounded-xl border transition-colors", newCatIcon === iconName ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300")}>
                        <Icon className="w-4 h-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Color</label>
                <div className="flex gap-2">
                  {["text-orange-400", "text-blue-400", "text-yellow-400", "text-purple-400", "text-pink-400", "text-green-400", "text-cyan-400", "text-red-400"].map(color => (
                    <button key={color} onClick={() => setNewCatColor(color)} className={cn("w-6 h-6 rounded-full border-2 transition-transform", newCatColor === color ? "scale-110 border-white" : "border-transparent opacity-50 hover:opacity-100", color.replace('text', 'bg').replace('400', '500'))} />
                  ))}
                </div>
              </div>
              
              <button onClick={handleSaveCategory} className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">Save Category</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
