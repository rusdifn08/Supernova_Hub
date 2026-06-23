"use client";

import React, { useState } from "react";
import { CheckSquare, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const initialTasks = [
  { id: 1, title: "Read 10 pages of 'Atomic Habits'", completed: false, exp: 15 },
  { id: 2, title: "Complete 2 Pomodoro sessions", completed: true, exp: 20 },
  { id: 3, title: "Log daily expenses", completed: false, exp: 10 },
  { id: 4, title: "Review React concepts", completed: false, exp: 25 },
];

export function ProductivityWidget() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    // In a real app, play a sound and trigger global EXP gain here
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-green-500/20" />

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-green-400" />
          Daily Missions
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-lg border border-white/10">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group/task",
              task.completed 
                ? "bg-green-500/10 border-green-500/30 opacity-70" 
                : "bg-white/5 border-white/10 hover:border-green-400/50 hover:bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                task.completed ? "bg-green-500 border-green-400" : "border-gray-500 group-hover/task:border-green-400"
              )}>
                {task.completed && <CheckSquare className="w-3.5 h-3.5 text-black" />}
              </div>
              <span className={cn(
                "text-sm font-medium transition-all",
                task.completed ? "line-through text-gray-500" : "text-gray-200"
              )}>
                {task.title}
              </span>
            </div>
            
            <div className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md",
              task.completed ? "text-green-500" : "text-purple-400 bg-purple-500/10"
            )}>
              +{task.exp} <Star className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
