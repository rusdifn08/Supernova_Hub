"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Calendar, Clock, BarChart2, Plus } from "lucide-react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { cn } from "@/lib/utils";

const weeklyTasks = [
  { id: 1, day: "Monday", tasks: [{ id: 101, title: "Design System Review", done: true }, { id: 102, title: "Client Meeting", done: false }] },
  { id: 2, day: "Tuesday", tasks: [{ id: 103, title: "Frontend Architecture", done: false }] },
  { id: 3, day: "Wednesday", tasks: [{ id: 104, title: "Database Migration", done: false }, { id: 105, title: "Write API Docs", done: false }] },
  { id: 4, day: "Thursday", tasks: [] },
  { id: 5, day: "Friday", tasks: [{ id: 106, title: "Weekly Report", done: false }] },
];

export default function ProductivityPage() {
  const { gainExp } = useGamificationStore();
  const [board, setBoard] = useState(weeklyTasks);

  const toggleTask = (dayId: number, taskId: number) => {
    setBoard(board.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: day.tasks.map(t => {
            if (t.id === taskId) {
              if (!t.done) gainExp(15, "Task Completed!");
              return { ...t, done: !t.done };
            }
            return t;
          })
        };
      }
      return day;
    }));
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <header className="shrink-0">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 flex items-center gap-3"
        >
          <CheckSquare className="w-10 h-10 text-green-400" /> Productivity Hub
        </motion.h1>
        <p className="text-gray-400 mt-2">Manage your time, conquer your tasks, and level up your efficiency.</p>
      </header>

      {/* Main Container - Internally Scrollable if needed */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-6 pb-4">
        
        {/* Weekly Task Board */}
        <div className="flex-1 flex flex-col bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/10 shrink-0 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" /> Weekly Objectives
            </h2>
          </div>
          
          <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar p-4">
            <div className="flex gap-4 h-full min-w-max">
              {board.map((day, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  key={day.id} 
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-[280px] flex flex-col h-full shrink-0"
                >
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10 shrink-0">
                    {day.day}
                  </div>
                  
                  <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
                    {day.tasks.map(task => (
                      <div 
                        key={task.id} onClick={() => toggleTask(day.id, task.id)}
                        className={cn("p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer", task.done ? "bg-green-500/10 border-green-500/30 text-gray-500 line-through" : "bg-white/5 border-white/10 text-gray-200 hover:border-green-400/50 hover:bg-white/10")}
                      >
                        {task.title}
                      </div>
                    ))}
                    <button className="w-full py-2 border border-dashed border-white/20 rounded-xl text-gray-500 hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                      <Plus className="w-4 h-4" /> Add Task
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden shrink-0">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-[50px] pointer-events-none" />
            <h3 className="text-gray-400 font-bold flex items-center justify-center gap-2 mb-6"><Clock className="w-4 h-4 text-red-400" /> Focus Session</h3>
            <div className="text-5xl font-black text-white mb-6 tracking-widest font-mono">25:00</div>
            <div className="flex gap-2 justify-center">
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]" onClick={() => gainExp(50, "Completed a Pomodoro!")}>Start</button>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shrink-0">
            <h3 className="text-gray-400 font-bold flex items-center gap-2 mb-4"><BarChart2 className="w-4 h-4 text-emerald-400" /> Analytics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Task Completion</span><span className="text-emerald-400">78%</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[78%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Focus Goal</span><span className="text-emerald-400">4/5 hrs</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[80%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
