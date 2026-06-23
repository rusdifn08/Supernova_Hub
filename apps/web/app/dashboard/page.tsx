"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Trophy, Zap, BookOpen, CheckSquare, Wallet, PlayCircle, TrendingUp, Clock, FileText, CalendarCheck, Eye, EyeOff, Plus, X } from "lucide-react";
import { useGamificationStore } from "@/store/useGamificationStore";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export default function DashboardPage() {
  const { level, exp, maxExp, gold, playerName, playerClass } = useGamificationStore();
  const progress = (exp / maxExp) * 100;

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 1, text: "Client Meeting Preparation", completed: false },
    { id: 2, text: "Update Financial Spreadsheet", completed: false },
    { id: 3, text: "Review Q3 Roadmap", completed: true },
    { id: 4, text: "Publish Next.js Article", completed: false },
  ]);

  const [toDoList, setToDoList] = useState([
    { id: 1, text: "Design System Review", completed: true },
    { id: 2, text: "Complete React Course Chapter", completed: false },
    { id: 3, text: "Email Marketing Team", completed: false },
    { id: 4, text: "Sync Database Backups", completed: false },
    { id: 5, text: "Buy Groceries", completed: false },
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: "Project Ideas 2026", date: "Today", preview: "Build AI agent...", content: "Build an AI agent that can automatically write code and design UI.\n\nStack:\n- Next.js\n- TailwindCSS\n- TypeScript" },
    { id: 2, title: "Meeting Notes: Client A", date: "Yesterday", preview: "Discussed MVP scope.", content: "Client A wants the MVP by next month. Scope includes:\n- Authentication\n- Dashboard\n- Payments" },
    { id: 3, title: "Habit Tracker Setup", date: "3 days ago", preview: "Track coding daily.", content: "Must code for at least 2 hours every day to keep the streak alive." },
    { id: 4, title: "Book Summary: Deep Work", date: "1 week ago", preview: "Eliminate distractions.", content: "Focus on deep work blocks of 90 minutes. Turn off notifications." },
    { id: 5, title: "Startup Brainstorming", date: "2 weeks ago", preview: "SaaS for students.", content: "A platform combining pomodoro, note-taking, and task management specifically tailored for university students." },
  ]);

  const [showBalance, setShowBalance] = useState(true);
  const [activeNote, setActiveNote] = useState<any>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const toggleWeeklyTask = (id: number) => setWeeklyTasks(weeklyTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const toggleToDo = (id: number) => setToDoList(toDoList.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

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

  const currentBalance = 12450000;
  const formattedBalance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(currentBalance);

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
          <div className="flex flex-col flex-1 max-w-md">
            <div className="flex items-center gap-2">
               <h2 className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold text-white leading-tight">{playerName}</h2>
               <span className="text-[clamp(0.5rem,0.8vw,0.6rem)] text-cyan-400 font-bold px-2 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">{playerClass}</span>
            </div>
            <div className="flex items-center gap-4 mt-1.5">
              <div className="flex items-center gap-1.5 text-yellow-400 text-[clamp(0.65rem,1vw,0.75rem)] font-black shrink-0"><Trophy className="w-[clamp(0.75rem,1.2vw,0.875rem)] h-[clamp(0.75rem,1.2vw,0.875rem)]" /> {gold.toLocaleString()} G</div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 font-bold flex items-center gap-1 shrink-0"><Zap className="w-[clamp(0.65rem,1vw,0.75rem)] h-[clamp(0.65rem,1vw,0.75rem)] text-purple-400"/> {exp} / {maxExp}</span>
                <div className="h-1.5 w-full max-w-[150px] bg-white/10 rounded-full overflow-hidden relative">
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

      {/* Main Content Area - Responsive Flex Row logic changed here */}
      <div className="flex-1 flex flex-col xl:flex-row gap-3 md:gap-4 w-full xl:overflow-hidden pb-4 shrink-0 xl:shrink">
        
        {/* Main Left Grid - 3 Columns on lg, 2 on md. 2 Rows. Static Height on xl. */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-rows-2 gap-3 md:gap-4 xl:overflow-hidden">
          
          {/* Card 1: Weekly Task */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-purple-400" /> Weekly Task</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
              {weeklyTasks.map(task => (
                <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => toggleWeeklyTask(task.id)}>
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${task.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-500'}`}>
                    {task.completed && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <p className={`text-[clamp(0.65rem,1vw,0.75rem)] font-medium transition-all truncate ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{task.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: To Do List */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><CheckSquare className="w-4 h-4 text-green-400" /> To Do List</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
              {toDoList.map(task => (
                <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => toggleToDo(task.id)}>
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                    {task.completed && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <p className={`text-[clamp(0.65rem,1vw,0.75rem)] font-medium transition-all truncate ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{task.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Notion / Notepad */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
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
                    <span className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-500 shrink-0">{note.date}</span>
                  </div>
                  <p className="text-[clamp(0.55rem,0.8vw,0.65rem)] text-gray-400 truncate">{note.preview}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Finance Overview */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
            <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white mb-2 shrink-0 flex items-center gap-2"><Wallet className="w-4 h-4 text-cyan-400" /> Finance Overview</h3>
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 min-h-[50px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financeData}>
                    <XAxis dataKey="month" hide />
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '6px', fontSize: '10px' }} />
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

          {/* Card 5: Current Learning */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <h3 className="text-[clamp(0.875rem,1.2vw,1rem)] font-bold text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-400" /> Current Learning</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
              {activeCourses.map(course => (
                <div key={course.id} className="space-y-1.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex justify-between text-[clamp(0.65rem,1vw,0.75rem)]">
                    <span className="font-bold text-white truncate pr-2">{course.title}</span>
                    <span className="text-blue-400 font-bold shrink-0">{course.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 6: Focus Analytics */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-[250px] xl:h-full">
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

        </div>

        {/* Right Sidebar - Flex on all screens, moves to bottom when stacking on smaller devices */}
        <div className="flex flex-col w-full xl:w-[clamp(240px,20vw,280px)] shrink-0 xl:h-full min-h-[300px]">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col overflow-hidden h-full xl:h-full">
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
                <div className="text-[clamp(0.55rem,0.8vw,0.65rem)] font-bold text-yellow-400 shrink-0">+$1500</div>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <div className="w-[clamp(1.5rem,2vw,1.75rem)] h-[clamp(1.5rem,2vw,1.75rem)] rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0"><Trophy className="w-3 h-3" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[clamp(0.65rem,1vw,0.75rem)] font-bold text-white truncate">Reached Level 10!</p>
                  <p className="text-[clamp(0.5rem,0.7vw,0.6rem)] text-gray-400">2 days ago</p>
                </div>
              </div>
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
