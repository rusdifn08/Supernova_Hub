"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Trophy, Zap, BookOpen, CheckSquare, Wallet, PlayCircle, TrendingUp, Clock, FileText, CalendarCheck, Eye, EyeOff, Plus, X, Target, Library, Timer, Flag } from "lucide-react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { cn } from "@/lib/utils";

const AVAILABLE_WIDGETS = [
  { id: 'weekly', icon: CalendarCheck, label: 'Weekly Task', color: 'text-purple-400' },
  { id: 'todo', icon: CheckSquare, label: 'To Do List', color: 'text-green-400' },
  { id: 'notepad', icon: FileText, label: 'Notepad', color: 'text-yellow-400' },
  { id: 'finance', icon: Wallet, label: 'Finance Overview', color: 'text-cyan-400' },
  { id: 'learning', icon: BookOpen, label: 'Current Learning', color: 'text-blue-400' },
  { id: 'analytics', icon: Clock, label: 'Focus Analytics', color: 'text-red-400' },
  { id: 'habit', icon: Target, label: 'Habit Tracker', color: 'text-orange-400' },
  { id: 'reading', icon: Library, label: 'Reading Books', color: 'text-pink-400' },
  { id: 'goals', icon: Flag, label: 'Goals Tracker', color: 'text-rose-400' },
  { id: 'pomodoro', icon: Timer, label: 'Pomodoro Timer', color: 'text-indigo-400' },
];

export default function DashboardPage() {
  const { level, exp, maxExp, gold, playerName, playerClass, setPlayerName, setStats } = useGamificationStore();
  const progress = (exp / maxExp) * 100;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.name) {
              setPlayerName(data.name);
            }
          }
        } catch (err) {
          console.error("Failed to fetch user profile", err);
        }
      }
    };
    fetchUser();
  }, [setPlayerName]);

  // --- WIDGET TOGGLE STATE ---
  const [activeWidgets, setActiveWidgets] = useState<string[]>(['weekly', 'todo', 'notepad', 'finance', 'learning', 'analytics']);

  const toggleWidget = (id: string) => {
    if (activeWidgets.includes(id)) {
      setActiveWidgets(activeWidgets.filter(w => w !== id));
    } else {
      if (activeWidgets.length >= 6) {
        // Can't add more than 6
        return;
      }
      setActiveWidgets([...activeWidgets, id]);
    }
  };

  // --- DUMMY DATA FOR WIDGETS ---
  const [weeklyTasks, setWeeklyTasks] = useState<any[]>([]);
  const [toDoList, setToDoList] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [habits, setHabits] = useState<any[]>([]);
  const [readingBooks, setReadingBooks] = useState<any[]>([]);
  const [learningCourses, setLearningCourses] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [wibTime, setWibTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setWibTime(new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " WIB");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProductivity = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const [prodRes, finRes, learnRes, calRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/finance`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/learning`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/calendar`, { headers: { Authorization: `Bearer ${token}` } })
          ]);
          
          if (prodRes.ok) {
            const data = await prodRes.json();
            setWeeklyTasks(data.weekly || []);
            setToDoList(data.todos || []);
            setNotes(data.notes || []);
            setHabits(data.habits || []);
            setReadingBooks(data.reading || []);
          }
          if (finRes.ok) {
            const data = await finRes.json();
            setTotalBalance(data.totalBalance || 0);
          }
          if (learnRes.ok) {
            const data = await learnRes.json();
            const enrolled = data.enrolled || [];
            const mappedCourses = enrolled.map((enrollment: any) => ({
              id: enrollment.courseId,
              courseName: enrollment.course.title,
              currentModule: enrollment.status === "COMPLETED" ? "Course Completed" : "Continue Learning",
              progressPercent: Math.round(enrollment.progressPercent || 0)
            }));
            setLearningCourses(mappedCourses);
          }
          if (calRes.ok) {
            const data = await calRes.json();
            setCalendarData(data || []);
          }
        } catch (err) {
          console.error("Failed to fetch productivity data", err);
        }
      }
    };
    fetchProductivity();
  }, []);

  const [showBalance, setShowBalance] = useState(false);
  const [activeNote, setActiveNote] = useState<any>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const refreshStats = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setStats({
        level: data.level, exp: data.exp, maxExp: data.maxExp, 
        gold: data.gold, playerClass: data.playerClass
      });
    }
  };

  const toggleWeeklyTask = async (id: string) => {
    setWeeklyTasks(weeklyTasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshStats();
    }
  };
  
  const toggleToDo = async (id: string) => {
    setToDoList(toDoList.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshStats();
    }
  };
  
  const toggleHabit = async (id: string) => {
    setHabits(habits.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    const token = localStorage.getItem("access_token");
    if (token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/productivity/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedHabit = await res.json();
        setHabits(current => current.map(t => t.id === id ? updatedHabit : t));
      }
      refreshStats();
    }
  };

  const activeCourses = [
    { id: 1, title: "Mastering React Server Components", progress: 65 },
    { id: 2, title: "Advanced Framer Motion", progress: 12 },
    { id: 3, title: "UI/UX Mastery", progress: 89 },
    { id: 4, title: "Rust for Beginners", progress: 5 },
  ];

  const financeData = [
    { month: 'Jan', balance: 8000000 }, { month: 'Feb', balance: 9500000 }, { month: 'Mar', balance: 11000000 },
    { month: 'Apr', balance: 10500000 }, { month: 'May', balance: 12000000 }, { month: 'Jun', balance: 12450000 }
  ];

  const focusData = [
    { day: 'M', hours: 2 }, { day: 'T', hours: 3.5 }, { day: 'W', hours: 1 },
    { day: 'T', hours: 4 }, { day: 'F', hours: 2.5 }, { day: 'S', hours: 0 }, { day: 'S', hours: 1.5 }
  ];

  const formattedBalance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalBalance);

  const saveNote = () => {
    if (notes.find(n => n.id === activeNote.id)) {
      setNotes(notes.map(n => n.id === activeNote.id ? activeNote : n));
    } else {
      setNotes([activeNote, ...notes]);
    }
    setIsEditingNote(false);
  };

  return (
    <div className="flex flex-col h-full space-y-3 md:space-y-4 xl:overflow-hidden pr-1 relative overflow-y-auto xl:overflow-y-hidden custom-scrollbar">
      
      {/* Top Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 shrink-0 bg-black/20 p-3 md:p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3 w-full lg:flex-1">
          <div className="relative shrink-0">
            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${playerName}`} alt="Avatar" className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] rounded-full border border-white/20 bg-black/50 p-1" />
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-600 w-[clamp(1.2rem,1.5vw,1.4rem)] h-[clamp(1.2rem,1.5vw,1.4rem)] rounded-full flex items-center justify-center border border-black text-[clamp(0.5rem,0.8vw,0.6rem)] font-bold text-white shadow-[0_0_10px_rgba(250,204,21,0.5)]">{level}</div>
          </div>
          <div className="flex flex-col flex-1 w-full mr-4">
            <div className="flex items-center gap-6">
               <h2 className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold text-white leading-tight">{playerName}</h2>
               <span className="text-[clamp(0.5rem,0.8vw,0.6rem)] text-cyan-400 font-bold px-3 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">{playerClass}</span>
            </div>
            <div className="flex items-center gap-4 mt-1.5">
              <div className="flex items-center gap-1.5 text-yellow-400 text-[clamp(0.65rem,1vw,0.75rem)] font-black shrink-0"><Trophy className="w-[clamp(0.75rem,1.2vw,0.875rem)] h-[clamp(0.75rem,1.2vw,0.875rem)]" /> {gold.toLocaleString()} G</div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 font-bold flex items-center gap-1 shrink-0"><Zap className="w-[clamp(0.65rem,1vw,0.75rem)] h-[clamp(0.65rem,1vw,0.75rem)] text-purple-400"/> {exp} / {maxExp}</span>
                <div className="h-1.5 w-full max-w-[400px] bg-white/10 rounded-full overflow-hidden relative">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-3 w-full lg:w-auto mt-3 lg:mt-0 shrink-0">
          <div className="relative flex-1 lg:w-[clamp(10rem,12vw,14rem)]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-[clamp(0.65rem,1vw,0.75rem)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500" />
          </div>
          <button className="relative p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col xl:flex-row gap-3 md:gap-4 w-full xl:overflow-hidden pb-4 shrink-0 xl:shrink">
        
        {/* Main Left Grid - Conditional Rendering based on activeWidgets */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-rows-2 gap-3 md:gap-4 xl:overflow-hidden">
          
          {/* Card 1: Weekly Task */}
          {activeWidgets.includes('weekly') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-purple-400" /> Weekly Task</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {weeklyTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => toggleWeeklyTask(task.id)}>
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${task.isCompleted ? 'bg-purple-500 border-purple-500' : 'border-gray-500'}`}>
                      {task.isCompleted && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <p className={`text-[clamp(0.65rem,1vw,0.75rem)] font-medium transition-all truncate ${task.isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Card 2: To Do List */}
          {activeWidgets.includes('todo') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><CheckSquare className="w-4 h-4 text-green-400" /> To Do List</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {toDoList.map(task => (
                  <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => toggleToDo(task.id)}>
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${task.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                      {task.isCompleted && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <p className={`text-[clamp(0.65rem,1vw,0.75rem)] font-medium transition-all truncate ${task.isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Card 3: Notion / Notepad */}
          {activeWidgets.includes('notepad') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><FileText className="w-4 h-4 text-yellow-400" /> Notepad</h3>
                <button onClick={() => { setActiveNote({ id: Date.now(), title: '', preview: '', content: '', date: 'Just now' }); setIsEditingNote(true); }} className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {notes.map(note => (
                  <div key={note.id} onClick={() => { setActiveNote(note); setIsEditingNote(false); }} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10 transition-colors cursor-pointer flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate pr-2">{note.title}</p>
                      <span className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-500 shrink-0">{new Date(note.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 truncate">{note.content?.substring(0, 30)}...</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Card 4: Finance Overview */}
          {activeWidgets.includes('finance') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white mb-2 shrink-0 flex items-center gap-2"><Wallet className="w-4 h-4 text-cyan-400" /> Finance Overview</h3>
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 min-h-[50px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financeData}>
                      <XAxis dataKey="month" hide />
                      <Tooltip formatter={(val: any) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits:0 }).format(Number(val))} contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '6px', fontSize: '10px' }} />
                      <Line type="monotone" dataKey="balance" stroke="#22d3ee" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="shrink-0 mt-2">
                  <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-black text-white leading-none flex items-center gap-2">
                    {showBalance ? formattedBalance : 'Rp ••••••••'}
                    <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white transition-colors focus:outline-none">
                      {showBalance ? <EyeOff className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" /> : <Eye className="w-[clamp(1rem,1.5vw,1.25rem)] h-[clamp(1rem,1.5vw,1.25rem)]" />}
                    </button>
                  </h3>
                  <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400">
                    <span>Liquid Cash</span>
                    <span className="flex items-center gap-1 text-green-400"><TrendingUp className="w-3 h-3"/> +2.4%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Card 5: Current Learning */}
          {activeWidgets.includes('learning') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-400" /> Current Learning</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {learningCourses.length > 0 ? learningCourses.map(course => (
                  <div key={course.id} className="space-y-1.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-white text-[clamp(0.65rem,1vw,0.75rem)] block truncate">{course.courseName}</span>
                        {course.currentModule && <span className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-blue-400 block truncate">{course.currentModule}</span>}
                      </div>
                      <span className="text-cyan-400 font-bold shrink-0 text-[clamp(0.65rem,1vw,0.75rem)]">{course.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-green-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${course.progressPercent}%` }} />
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 text-xs py-4">No active courses.</div>
                )}
              </div>
            </motion.div>
          )}

          {/* Card 6: Focus Analytics */}
          {activeWidgets.includes('analytics') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white shrink-0 mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-purple-400" /> Focus Analytics</h3>
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 min-h-[50px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={focusData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 9 }} dy={2} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '6px', fontSize: '10px', padding: '4px' }} />
                      <Bar dataKey="hours" fill="#a855f7" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="shrink-0 mt-2 flex justify-between bg-white/5 rounded-lg p-2">
                   <div>
                     <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">Total</p>
                     <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold text-white">14.5h</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">Avg</p>
                     <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-bold text-purple-400">2.1h/d</p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Habit Tracker */}
          {activeWidgets.includes('habit') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><Target className="w-4 h-4 text-orange-400" /> Habit Tracker</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {habits.map(habit => (
                  <div key={habit.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => toggleHabit(habit.id)}>
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${habit.isCompleted ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                      {habit.isCompleted && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[clamp(0.65rem,1vw,0.75rem)] font-medium transition-all truncate ${habit.isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>{habit.title}</p>
                      <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-orange-400">🔥 {habit.streak} day streak</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reading Books */}
          {activeWidgets.includes('reading') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><Library className="w-4 h-4 text-pink-400" /> Reading Books</h3>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {(() => {
                  const reading = readingBooks.filter(b => b.status === 'READING');
                  const planned = readingBooks.filter(b => b.status === 'PLAN_TO_READ');
                  return (
                    <>
                      {reading.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Currently Reading</h4>
                          <div className="space-y-2">
                            {reading.map(book => {
                              const progress = book.totalPages > 0 ? Math.round((book.readPages / book.totalPages) * 100) : 0;
                              return (
                                <div key={book.id} className="p-2 bg-white/5 rounded-lg border border-white/5">
                                  <div className="flex justify-between items-center mb-0.5">
                                    <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate pr-2">{book.title}</p>
                                    <span className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-pink-400 font-bold">{progress}%</span>
                                  </div>
                                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400 mb-1 flex items-center justify-between">
                                    <span>{book.author}</span>
                                    <span>{book.readPages} / {book.totalPages} pages</span>
                                  </p>
                                  {book.currentChapter && <p className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-pink-300 font-medium mb-1.5 truncate">{book.currentChapter}</p>}
                                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400" style={{ width: `${progress}%` }} />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      {planned.length > 0 && (
                        <div>
                          <h4 className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Plan to Read</h4>
                          <div className="space-y-1.5">
                            {planned.map(book => (
                              <div key={book.id} className="flex justify-between items-center p-1.5 bg-black/40 rounded-lg border border-white/5">
                                <div className="min-w-0 pr-2">
                                  <p className="text-[clamp(0.6rem,0.9vw,0.7rem)] font-bold text-gray-200 truncate">{book.title}</p>
                                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-500">{book.author}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {reading.length === 0 && planned.length === 0 && (
                        <div className="text-center text-gray-500 text-xs py-4">No books tracked.</div>
                      )}
                    </>
                  )
                })()}
              </div>
            </motion.div>
          )}
          {/* Goals Tracker */}
          {activeWidgets.includes('goals') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><Flag className="w-4 h-4 text-rose-400" /> Goals Tracker</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 text-xs px-4">
                <Flag className="w-8 h-8 mb-2 opacity-50" />
                <p>Define your milestones and track your journey.</p>
              </div>
            </motion.div>
          )}

          {/* Pomodoro Timer */}
          {activeWidgets.includes('pomodoro') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><Timer className="w-4 h-4 text-indigo-400" /> Pomodoro Timer</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-[6px] border-indigo-500/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-[6px] border-indigo-400" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                  <span className="text-3xl font-black text-white">25:00</span>
                </div>
                <p className="mt-4 text-indigo-400 font-bold text-sm cursor-pointer hover:text-indigo-300">START FOCUS</p>
              </div>
            </motion.div>
          )}

        </div>

        <div className="flex flex-col gap-3 md:gap-4 w-full xl:w-[clamp(240px,20vw,280px)] shrink-0 xl:h-full min-h-[300px]">
          
          {/* Calendar Heatmap */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden shrink-0 xl:h-[30%]">
            <div className="flex flex-col mb-2 shrink-0">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white shrink-0 flex items-center justify-between">
                Daily Performance
                <span className="text-[10px] text-cyan-400 font-mono bg-cyan-900/30 px-2 py-0.5 rounded-full">{wibTime}</span>
              </h3>
              <p className="text-[11px] text-gray-300 mt-1 font-medium">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' })}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar flex items-center justify-center">
              <div className="grid grid-cols-10 gap-1.5 p-1 w-full max-w-[260px]">
                {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate();
                  const record = calendarData.find(d => new Date(d.date).getDate() === day);
                  
                  // Default style for future or unrecorded dates
                  let colorClass = isToday 
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-100 shadow-[0_0_8px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400" 
                    : "bg-blue-900/20 border border-blue-500/40 text-blue-100/70"; 
                    
                  if (record) {
                    if (record.status === "GREEN") colorClass = "bg-green-500 border border-green-400 text-white shadow-[0_0_8px_rgba(34,197,94,0.5)]";
                    else if (record.status === "YELLOW") colorClass = "bg-yellow-400 border border-yellow-300 text-yellow-950 shadow-[0_0_8px_rgba(250,204,21,0.5)]";
                    else if (record.status === "ORANGE") colorClass = "bg-orange-500 border border-orange-400 text-white shadow-[0_0_8px_rgba(249,115,22,0.5)]";
                    else if (record.status === "RED") colorClass = "bg-red-500 border border-red-400 text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]";
                  }
                  
                  return (
                    <div key={day} className={`aspect-square rounded-sm flex items-center justify-center text-[9px] font-bold cursor-pointer hover:scale-110 transition-transform ${colorClass}`} title={record ? `Completed: ${record.completedTasks}, Failed: ${record.failedTasks + record.failedHabits}` : (isToday ? 'Today' : 'No data')}>
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden flex-1 xl:h-[40%]">
            <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white mb-3 shrink-0">Recent Activity</h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <div className="w-[clamp(1.5rem,2vw,1.75rem)] h-[clamp(1.5rem,2vw,1.75rem)] rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><PlayCircle className="w-3 h-3" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate">Studied "React Server"</p>
                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">2 hours ago</p>
                </div>
                <div className="text-[clamp(0.55rem,0.8vw,0.65rem)] font-bold text-purple-400 shrink-0">+25 EXP</div>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <div className="w-[clamp(1.5rem,2vw,1.75rem)] h-[clamp(1.5rem,2vw,1.75rem)] rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0"><CheckSquare className="w-3 h-3" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate">Completed "Design"</p>
                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">5 hours ago</p>
                </div>
                <div className="text-[clamp(0.55rem,0.8vw,0.65rem)] font-bold text-purple-400 shrink-0">+15 EXP</div>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <div className="w-[clamp(1.5rem,2vw,1.75rem)] h-[clamp(1.5rem,2vw,1.75rem)] rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0"><Wallet className="w-3 h-3" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate">Freelance Payment</p>
                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">Yesterday</p>
                </div>
                <div className="text-[clamp(0.55rem,0.8vw,0.65rem)] font-bold text-yellow-400 shrink-0">+Rp1.5M</div>
              </div>
            </div>
          </motion.div>

          {/* Widget Customizer Toggler */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col shrink-0 xl:h-[30%]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Widgets ({activeWidgets.length}/6)</h3>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {AVAILABLE_WIDGETS.map((widget) => {
                const isActive = activeWidgets.includes(widget.id);
                const Icon = widget.icon;
                return (
                  <button
                    key={widget.id}
                    onClick={() => toggleWidget(widget.id)}
                    title={widget.label}
                    className={cn(
                      "flex items-center justify-center aspect-square rounded-lg border transition-all",
                      isActive 
                        ? `bg-white/10 border-white/30 ${widget.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]` 
                        : "bg-black/50 border-white/5 text-gray-600 hover:bg-white/5 hover:text-gray-400",
                      !isActive && activeWidgets.length >= 6 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Notepad Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-4 shrink-0">
                {isEditingNote ? (
                  <input 
                    autoFocus
                    value={activeNote.title} 
                    onChange={e => setActiveNote({...activeNote, title: e.target.value})} 
                    className="bg-transparent text-white text-xl font-bold border-b border-white/20 focus:border-cyan-500 focus:outline-none w-full mr-4 transition-colors pb-1" 
                    placeholder="Note Title" 
                  />
                ) : (
                  <h2 className="text-xl font-bold text-white">{activeNote.title}</h2>
                )}
                <button onClick={() => setActiveNote(null)} className="p-1 hover:bg-white/10 rounded-md transition-colors">
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>
              <div className="flex-1 min-h-[250px] mb-6">
                {isEditingNote ? (
                  <textarea 
                    value={activeNote.content || activeNote.preview} 
                    onChange={e => setActiveNote({...activeNote, content: e.target.value, preview: e.target.value.substring(0, 30) + '...'})} 
                    className="w-full h-full min-h-[250px] bg-black/40 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-cyan-500/50 resize-none transition-colors custom-scrollbar" 
                    placeholder="Write your notes here..." 
                  />
                ) : (
                  <div className="w-full h-full min-h-[250px] bg-black/20 border border-white/5 rounded-xl p-4 text-gray-300 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                    {activeNote.content || activeNote.preview}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 shrink-0">
                {isEditingNote ? (
                  <>
                    <button className="px-4 py-2 rounded-xl text-gray-400 font-bold hover:bg-white/5 transition-colors" onClick={() => setActiveNote(null)}>Cancel</button>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]" onClick={saveNote}>Save Note</button>
                  </>
                ) : (
                  <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2 rounded-xl transition-colors" onClick={() => setIsEditingNote(true)}>Edit Note</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
