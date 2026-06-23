"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Loader2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGamificationStore } from "@/store/useGamificationStore";

export default function CourseReadingPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { gainExp } = useGamificationStore();

  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [moduleContent, setModuleContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    fetch(`http://${window.location.hostname}:4000/learning/courses/${courseId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch course');
      return res.json();
    })
    .then(data => {
      setCourse(data.course);
      setProgress(data.progress);
      
      // Select the first uncompleted module or the first module
      if (data.course.modules && data.course.modules.length > 0) {
        let nextMod = data.course.modules[0].id;
        for (const mod of data.course.modules) {
          const isCompleted = data.progress.some((p: any) => p.moduleId === mod.id && p.isCompleted);
          if (!isCompleted) {
            nextMod = mod.id;
            break;
          }
        }
        setActiveModuleId(nextMod);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [courseId]);

  useEffect(() => {
    if (!activeModuleId) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    setContentLoading(true);
    fetch(`http://${window.location.hostname}:4000/learning/modules/${activeModuleId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch module');
      return res.json();
    })
    .then(data => {
      setModuleContent(data.module);
      setContentLoading(false);
    })
    .catch(err => {
      console.error(err);
      setContentLoading(false);
    });
  }, [activeModuleId]);

  const handleMarkCompleted = () => {
    if (!activeModuleId || !course) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    fetch(`http://${window.location.hostname}:4000/learning/modules/${activeModuleId}/complete`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to mark completed');
      return res.json();
    })
    .then(() => {
      gainExp(50, "Completed a learning module!");
      
      // Update local progress
      setProgress(prev => {
        const exist = prev.find(p => p.moduleId === activeModuleId);
        if (exist) {
          return prev.map(p => p.moduleId === activeModuleId ? { ...p, isCompleted: true } : p);
        }
        return [...prev, { moduleId: activeModuleId, isCompleted: true }];
      });

      // Find next module
      const currentIndex = course.modules.findIndex((m: any) => m.id === activeModuleId);
      if (currentIndex !== -1 && currentIndex + 1 < course.modules.length) {
        setActiveModuleId(course.modules[currentIndex + 1].id);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-blue-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return <div className="text-white p-6">Course not found.</div>;
  }

  return (
    <div className="flex h-full overflow-hidden bg-black/20 rounded-2xl border border-white/5 relative">
      
      {/* Sidebar - Syllabus */}
      <div className="w-80 shrink-0 border-r border-white/10 flex flex-col h-full bg-black/40 backdrop-blur-xl">
        <div className="p-4 border-b border-white/10 shrink-0">
          <button 
            onClick={() => router.push('/dashboard/learning')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </button>
          <h2 className="font-bold text-white text-lg leading-tight">{course.title}</h2>
          <p className="text-xs text-gray-400 mt-2 line-clamp-2">{course.description}</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {course.modules.map((mod: any, idx: number) => {
            const isCompleted = progress.some(p => p.moduleId === mod.id && p.isCompleted);
            const isActive = activeModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                  isActive ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : isActive ? (
                    <PlayCircle className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-400'}`}>
                    {idx + 1}. {mod.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{mod.duration}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content - Markdown Reader */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0A0A0A]">
        {contentLoading ? (
          <div className="flex-1 flex items-center justify-center text-blue-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : moduleContent ? (
          <>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-invert prose-blue max-w-none prose-pre:bg-[#111111] prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {moduleContent.contentMd}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
            
            {/* Bottom Bar Actions */}
            <div className="shrink-0 p-4 border-t border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center">
              <div className="max-w-3xl w-full flex justify-end">
                {progress.some(p => p.moduleId === activeModuleId && p.isCompleted) ? (
                  <button 
                    disabled
                    className="flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-2.5 rounded-full font-bold text-sm"
                  >
                    <CheckCircle className="w-4 h-4" /> Completed
                  </button>
                ) : (
                  <button 
                    onClick={handleMarkCompleted}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95"
                  >
                    Mark as Completed <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a module to start reading
          </div>
        )}
      </div>

    </div>
  );
}
