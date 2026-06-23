"use client";

import React from "react";
import { BookOpen, PlayCircle, Clock, Book, CheckCircle, GraduationCap, ArrowRight, FileText, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useGamificationStore } from "@/store/useGamificationStore";

const mockCourses = [
  { id: 1, title: "Mastering React Server Components", progress: 65, timeRemaining: "2h 15m", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Advanced Framer Motion", progress: 12, timeRemaining: "5h 30m", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Fullstack Next.js Apps", progress: 0, timeRemaining: "12h 0m", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "UI/UX Mastery", progress: 89, timeRemaining: "0h 45m", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" },
  { id: 5, title: "Rust for Beginners", progress: 5, timeRemaining: "14h 0m", img: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=600&auto=format&fit=crop" },
];

const mockBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", status: "Reading" },
  { id: 2, title: "Deep Work", author: "Cal Newport", status: "Plan to read" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", status: "Completed" },
  { id: 4, title: "The Pragmatic Programmer", author: "David Thomas", status: "Plan to read" },
];

export default function LearningPage() {
  const { gainExp } = useGamificationStore();

  const handleStudy = () => gainExp(25, "Completed a study session!");

  return (
    <div className="flex flex-col h-full overflow-hidden pb-4">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Left Column: Header + Active Courses */}
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <header className="shrink-0">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-3"
            >
              <GraduationCap className="w-10 h-10 text-blue-400" /> Learning Hub
            </motion.h1>
            <p className="text-gray-400 mt-2">Expand your knowledge. Every chapter read is a step towards mastery.</p>
          </header>

          {/* Active Courses Section (Fluid Scrollable Area) */}
          <div className="flex-1 flex flex-col bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/10 shrink-0 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-blue-400" /> Active Courses
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockCourses.map((course, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                  key={course.id} 
                  className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer flex flex-col"
                  onClick={handleStudy}
                >
                  <div className="h-36 w-full relative shrink-0 overflow-hidden">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-3">
                      <p className="text-gray-300 text-xs flex items-center gap-1 font-medium bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        <Clock className="w-3 h-3" /> {course.timeRemaining}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="flex items-center gap-2 text-white font-bold bg-blue-500 px-4 py-2 rounded-full text-sm">
                        Continue <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h3 className="font-bold text-white mb-2 line-clamp-2 text-sm">{course.title}</h3>
                    <div className="space-y-1.5 mt-auto">
                      <div className="flex justify-between text-xs text-gray-400 font-medium">
                        <span>Progress</span>
                        <span className="text-blue-400">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Sidebar panels (Books and Notion mock) */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-indigo-400" /> Reading List
            </h3>
            <div className="space-y-3">
              {mockBooks.map(book => (
                <div key={book.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors cursor-pointer" onClick={() => gainExp(10, `Read a chapter of ${book.title}`)}>
                  <div>
                    <h4 className="text-sm font-bold text-white">{book.title}</h4>
                    <p className="text-xs text-gray-400">{book.author}</p>
                  </div>
                  {book.status === "Completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md whitespace-nowrap ml-2">{book.status}</span>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-xl border border-indigo-500/30 text-indigo-400 text-sm font-bold hover:bg-indigo-500/10 transition-colors">
              + Add Book
            </button>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden shrink-0">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-gray-400" /> Knowledge Base
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-white/10" onClick={() => gainExp(5, "Reviewed notes")}>
                <div className="p-2 bg-gray-500/10 rounded-lg text-gray-400"><FileText className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold text-white">React Patterns</h4>
                  <p className="text-xs text-gray-400">Edited 2 hours ago</p>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Lightbulb className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-sm font-bold text-white">Startup Ideas</h4>
                  <p className="text-xs text-gray-400">Edited yesterday</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
