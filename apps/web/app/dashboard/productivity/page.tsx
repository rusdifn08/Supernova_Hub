"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Calendar, Clock, BarChart2, Plus, FileText, Target, Send, X } from "lucide-react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { cn } from "@/lib/utils";

export default function ProductivityPage() {
  const { gainExp } = useGamificationStore();
  
  // State for forms
  const [todoInput, setTodoInput] = useState("");
  const [weeklyInput, setWeeklyInput] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [habitInput, setHabitInput] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTotalPages, setBookTotalPages] = useState("");

  const [todos, setTodos] = useState<any[]>([]);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [habits, setHabits] = useState<any[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data) {
        setTodos(data.todos || []);
        setWeekly(data.weekly || []);
        setHabits(data.habits || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: string, status: string) => {
    if (status === 'FAILED') {
      showToast("Cannot complete a failed task!");
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/${id}/toggle`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  // Toast / notification state
  const [toast, setToast] = useState<{message: string, show: boolean}>({ message: "", show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 3000);
  };

  const handleAddTodo = async () => {
    if (!todoInput) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/todo`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: todoInput })
      });
      showToast(`To-Do added: ${todoInput}`);
      setTodoInput("");
      fetchData();
    }
  };

  const handleAddWeekly = async () => {
    if (!weeklyInput) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/weekly`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: weeklyInput, day: selectedDay })
      });
      showToast(`Task added for ${selectedDay}: ${weeklyInput}`);
      setWeeklyInput("");
      fetchData();
    }
  };

  const handleAddHabit = async () => {
    if (!habitInput) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/habit`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: habitInput })
      });
      showToast(`New Habit tracked: ${habitInput}`);
      setHabitInput("");
      fetchData();
    }
  };

  const handleAddNote = async () => {
    if (!noteTitle) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/note`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: noteTitle, content: noteContent })
      });
      showToast(`Note saved: ${noteTitle}`);
      setNoteTitle("");
      setNoteContent("");
      gainExp(20, "Documented your thoughts!");
    }
  };

  const handleAddBook = async () => {
    if (!bookTitle) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/reading`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: bookTitle, author: bookAuthor, totalPages: parseInt(bookTotalPages) || 0 })
      });
      showToast(`Book tracking added: ${bookTitle}`);
      setBookTitle("");
      setBookAuthor("");
      setBookTotalPages("");
      gainExp(25, "Started a new book!");
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="flex flex-col h-full space-y-4 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }} 
            animate={{ opacity: 1, y: 0, x: "-50%" }} 
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="absolute top-4 left-1/2 z-50 bg-green-500/20 border border-green-500 text-green-400 px-6 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] backdrop-blur-md flex items-center gap-2"
          >
            <CheckSquare className="w-5 h-5" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-black/20 p-3 md:p-4 rounded-2xl border border-white/5">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 flex items-center gap-2"
          >
            <CheckSquare className="w-6 h-6 md:w-8 md:h-8 text-green-400" /> Productivity Hub
          </motion.h1>
        </div>

        {/* Focus Session moved to header */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 md:p-3 flex items-center gap-4 shrink-0 relative overflow-hidden w-full md:w-auto">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-[50px] pointer-events-none" />
          <div className="flex flex-col">
            <h3 className="text-gray-400 font-bold flex items-center gap-1.5 text-[10px] md:text-xs mb-0.5"><Clock className="w-3 h-3 text-red-400" /> Focus Session</h3>
            <div className="text-xl md:text-2xl font-black text-white tracking-widest font-mono">25:00</div>
          </div>
          <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)] text-xs md:text-sm ml-auto" onClick={() => gainExp(50, "Completed a Pomodoro!")}>Start</button>
        </motion.div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 pb-3 min-h-0">
        
        {/* Data Entry Forms Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 h-full">
            
            {/* Add To-Do Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-green-400" /> To Do List</h3>
              
              {/* Active Items List to fill space */}
              <div className="flex-1 overflow-y-auto mb-2 space-y-1.5 custom-scrollbar pr-1 mt-1">
                {todos.map((task) => {
                  const isFailed = task.status === 'FAILED';
                  return (
                    <div key={task.id} onClick={() => handleToggle(task.id, task.status)} className={cn("flex items-center gap-2 text-[11px] md:text-xs p-2 rounded-lg border transition-colors cursor-pointer", isFailed ? "bg-red-500/10 border-red-500/30 text-red-400 line-through" : task.isCompleted ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10")}>
                      <div className={cn("w-3 h-3 rounded border shrink-0 flex items-center justify-center", isFailed ? "border-red-500" : task.isCompleted ? "border-green-500 bg-green-500 text-black" : "border-gray-500")}>
                        {task.isCompleted && !isFailed && <CheckSquare className="w-2.5 h-2.5" />}
                        {isFailed && <X className="w-2.5 h-2.5" />}
                      </div>
                      <span className="truncate flex-1">{task.title}</span>
                      {!task.isCompleted && !isFailed && task.dueDate && (
                        <span className="text-[9px] text-gray-500 shrink-0">Due: {new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto flex gap-2 shrink-0">
                <input 
                  type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                  placeholder="e.g. Reply to client email..." 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-white focus:outline-none focus:border-green-500/50 transition-colors text-xs md:text-sm"
                />
                <button onClick={handleAddTodo} className="bg-green-500 hover:bg-green-600 text-black p-1.5 md:p-2 rounded-lg transition-all shadow-[0_0_10px_rgba(34,197,94,0.3)] shrink-0">
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </motion.div>

            {/* Add Weekly Task Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-400" /> Schedule Weekly Task</h3>
              
              {/* Active Items List to fill space */}
              <div className="flex-1 overflow-y-auto mb-2 space-y-1.5 custom-scrollbar pr-1 mt-1">
                {weekly.map((task) => (
                  <div key={task.id} onClick={() => handleToggle(task.id, task.status)} className={cn("flex items-center gap-2 text-[11px] md:text-xs p-2 rounded-lg border transition-colors cursor-pointer", task.isCompleted ? "bg-purple-500/30 border-purple-500 text-white" : "bg-purple-500/10 border-purple-500/20 text-purple-100/70")}>
                    <div className={cn("w-2 h-2 rounded-full shrink-0", task.isCompleted ? "bg-white" : "bg-purple-500")} />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 shrink-0 mt-auto">
                <input 
                  type="text" value={weeklyInput} onChange={(e) => setWeeklyInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleAddWeekly()}
                  placeholder={`Task for ${selectedDay}...`} 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors text-xs md:text-sm"
                />
                <button onClick={handleAddWeekly} className="bg-purple-500 hover:bg-purple-600 text-white p-1.5 md:p-2 rounded-lg transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0">
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </motion.div>

            {/* Add Habit Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-red-400" /> Track New Habit</h3>
              
              {/* Active Items List to fill space */}
              <div className="flex-1 overflow-y-auto mb-2 space-y-1.5 custom-scrollbar pr-1 mt-1">
                {habits.map((habit) => (
                  <div key={habit.id} onClick={() => handleToggle(habit.id, habit.status)} className={cn("flex items-center justify-between text-[11px] md:text-xs p-2 rounded-lg border transition-colors cursor-pointer", habit.isCompleted ? "bg-red-500/30 border-red-500/50 text-white" : "bg-red-500/10 border-red-500/20 text-red-100/70")}>
                    <div className="flex items-center gap-2 truncate">
                      <Target className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{habit.title}</span>
                    </div>
                    <span className={cn("text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0", habit.streak >= 21 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>
                      {habit.streak >= 21 ? 'Mastered!' : `${habit.streak} / 21`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex gap-2 shrink-0">
                <input 
                  type="text" value={habitInput} onChange={(e) => setHabitInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
                  placeholder="e.g. Read 20 pages..." 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-white focus:outline-none focus:border-red-500/50 transition-colors text-xs md:text-sm"
                />
                <button onClick={handleAddHabit} className="bg-red-500 hover:bg-red-600 text-white p-1.5 md:p-2 rounded-lg transition-all shadow-[0_0_10px_rgba(239,68,68,0.3)] shrink-0">
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </motion.div>

            {/* Add Note Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-yellow-400" /> Workspace Note</h3>
              <div className="flex flex-col gap-2 mt-auto h-full justify-end">
                <input 
                  type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} 
                  placeholder="Note Title" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors font-bold text-[11px] md:text-xs"
                />
                <textarea 
                  value={noteContent} onChange={(e) => setNoteContent(e.target.value)} 
                  placeholder="Content..." 
                  className="w-full flex-1 min-h-[50px] bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors resize-none custom-scrollbar text-[11px] md:text-xs"
                />
                <button onClick={handleAddNote} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1.5 rounded-lg transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] flex justify-center items-center gap-1.5 text-[11px] md:text-xs mt-1">
                  <Plus className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </motion.div>

            {/* Add Reading Book Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col h-full overflow-hidden">
              <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                Track Reading
              </h3>
              <div className="flex flex-col gap-2 mt-auto h-full justify-end">
                <input 
                  type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} 
                  placeholder="Book Title" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-pink-500/50 transition-colors font-bold text-[11px] md:text-xs"
                />
                <input 
                  type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} 
                  placeholder="Author" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-pink-500/50 transition-colors text-[11px] md:text-xs"
                />
                <input 
                  type="number" value={bookTotalPages} onChange={(e) => setBookTotalPages(e.target.value)} 
                  placeholder="Total Pages" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-pink-500/50 transition-colors text-[11px] md:text-xs"
                />
                <button onClick={handleAddBook} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-1.5 rounded-lg transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] flex justify-center items-center gap-1.5 text-[11px] md:text-xs mt-1">
                  <Plus className="w-3.5 h-3.5" /> Start Reading
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Side Panels - Analytics only */}
        <div className="w-full lg:w-[220px] xl:w-[260px] shrink-0 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 shrink-0 h-full flex flex-col">
            <h3 className="text-gray-400 font-bold flex items-center gap-1.5 mb-3 text-xs md:text-sm"><BarChart2 className="w-3.5 h-3.5 text-emerald-400" /> Analytics</h3>
            <div className="space-y-3 flex-1">
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>Data Entries</span><span className="text-emerald-400">12 today</span></div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[78%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>Focus Goal</span><span className="text-emerald-400">4/5 hrs</span></div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[80%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div>
              </div>
              <div className="pt-3 mt-auto">
                 <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 text-center">
                    <p className="text-[10px] text-gray-400">Productivity Score</p>
                    <p className="text-2xl md:text-3xl font-black text-emerald-400 mt-0.5">85<span className="text-xs font-bold">%</span></p>
                 </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
