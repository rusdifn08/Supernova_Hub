"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Loader2, ChevronRight, HelpCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [quizState, setQuizState] = useState<{selected: number | null, isCorrect: boolean | null}>({selected: null, isCorrect: null});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/learning/courses/${courseId}`, {
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

        // Auto-expand the section containing the active module
        const activeModObj = data.course.modules.find((m: any) => m.id === nextMod);
        if (activeModObj && activeModObj.sectionTitle) {
          setExpandedSections({ [activeModObj.sectionTitle]: true });
        }
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/learning/modules/${activeModuleId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch module');
      return res.json();
    })
    .then(data => {
      setModuleContent(data.module);
      setContentLoading(false);
      setQuizState({selected: null, isCorrect: null});
      // Reset scroll position to top
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/learning/modules/${activeModuleId}/complete`, {
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
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
          {(() => {
            const grouped: Record<string, Record<string, any[]>> = {};
            course.modules.forEach((mod: any) => {
              const chap = mod.chapterTitle || "Modules";
              const sec = mod.sectionTitle || "General";
              if (!grouped[chap]) grouped[chap] = {};
              if (!grouped[chap][sec]) grouped[chap][sec] = [];
              grouped[chap][sec].push(mod);
            });

            return Object.keys(grouped).map((chap) => (
              <div key={chap} className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">{chap}</h3>
                <div className="space-y-2">
                  {Object.keys(grouped[chap]).map((sec) => {
                    const isExpanded = expandedSections[sec] ?? false; // default collapsed unless active
                    const toggleSec = () => setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
                    
                    return (
                      <div key={sec} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden transition-all">
                        <button 
                          onClick={toggleSec}
                          className="w-full text-left p-3 flex justify-between items-center bg-black/40 hover:bg-white/5 transition-colors"
                        >
                          <h4 className="text-xs font-bold text-blue-400 line-clamp-2 pr-2">{sec}</h4>
                          <ChevronRight className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {isExpanded && (
                          <div className="p-1.5 space-y-0.5 border-t border-white/5">
                            {grouped[chap][sec].map((mod: any) => {
                              const isCompleted = progress.some(p => p.moduleId === mod.id && p.isCompleted);
                              const isActive = activeModuleId === mod.id;
                              return (
                                <button
                                  key={mod.id}
                                  onClick={() => setActiveModuleId(mod.id)}
                                  className={`w-full text-left p-2.5 rounded-lg flex items-start gap-3 transition-colors ${
                                    isActive ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                    ) : isActive ? (
                                      <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
                                    ) : (
                                      <Circle className="w-3.5 h-3.5 text-gray-600" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-[12px] leading-snug font-medium line-clamp-2 ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-400'}`}>
                                      {mod.title}
                                    </div>
                                    <div className="text-[9px] text-gray-500 mt-1">{mod.duration}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
              <div className="max-w-3xl mx-auto">
                <article className="prose prose-invert prose-blue max-w-none prose-pre:bg-[#111111] prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {moduleContent.contentMd}
                  </ReactMarkdown>
                </article>

                {/* Interactive Quiz Section */}
                {(() => {
                  let parsedQuiz = null;
                  try {
                    if (moduleContent.quizJson) parsedQuiz = JSON.parse(moduleContent.quizJson);
                  } catch(e) {}
                  
                  const isCompleted = progress.some(p => p.moduleId === activeModuleId && p.isCompleted);
                  
                  if (parsedQuiz && !isCompleted) {
                    return (
                      <div className="mt-12 bg-black/40 border border-blue-500/30 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Knowledge Check</h3>
                        </div>
                        <p className="text-gray-200 text-lg mb-6">{parsedQuiz.question}</p>
                        <div className="space-y-3">
                          {parsedQuiz.options.map((opt: string, idx: number) => {
                            const isSelected = quizState.selected === idx;
                            const isRight = parsedQuiz.answer === idx;
                            const showSuccess = isSelected && isRight;
                            const showError = isSelected && !isRight;

                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (quizState.isCorrect) return;
                                  setQuizState({ selected: idx, isCorrect: isRight });
                                }}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${
                                  showSuccess ? 'bg-green-500/20 border-green-500 text-green-200' :
                                  showError ? 'bg-red-500/20 border-red-500 text-red-200' :
                                  isSelected ? 'bg-blue-500/20 border-blue-500 text-white' :
                                  'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{opt}</span>
                                  {showSuccess && <CheckCircle className="w-5 h-5 text-green-400" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {quizState.selected !== null && !quizState.isCorrect && (
                          <p className="text-red-400 mt-4 text-sm flex items-center gap-2">
                            <X className="w-4 h-4" /> Jawaban belum tepat. Coba lagi!
                          </p>
                        )}
                        {quizState.isCorrect && (
                          <p className="text-green-400 mt-4 text-sm flex items-center gap-2 font-bold">
                            <CheckCircle className="w-4 h-4" /> Tepat sekali! Anda bisa melanjutkan.
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}

              </div>
            </div>
            
            {/* Bottom Bar Actions */}
            <div className="shrink-0 p-4 border-t border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center">
              <div className="max-w-3xl w-full flex justify-end">
                {(() => {
                  let parsedQuiz = null;
                  try {
                    if (moduleContent.quizJson) parsedQuiz = JSON.parse(moduleContent.quizJson);
                  } catch(e) {}
                  
                  const isCompleted = progress.some(p => p.moduleId === activeModuleId && p.isCompleted);
                  const canComplete = isCompleted || !parsedQuiz || quizState.isCorrect;

                  if (isCompleted) {
                    return (
                      <button 
                        disabled
                        className="flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-2.5 rounded-full font-bold text-sm"
                      >
                        <CheckCircle className="w-4 h-4" /> Completed
                      </button>
                    )
                  } else {
                    return (
                      <button 
                        onClick={handleMarkCompleted}
                        disabled={!canComplete}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                          canComplete 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95' 
                            : 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Mark as Completed <ChevronRight className="w-4 h-4" />
                      </button>
                    )
                  }
                })()}
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
