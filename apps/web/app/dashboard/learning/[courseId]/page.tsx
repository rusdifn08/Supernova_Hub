"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Loader2, ChevronRight, HelpCircle, X, Lock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useGamificationStore } from "@/store/useGamificationStore";

const InlineQuiz = ({ data }: { data: string }) => {
  const [state, setState] = useState<{selected: number | null, isCorrect: boolean | null}>({selected: null, isCorrect: null});
  
  let parsed: any = null;
  try {
    parsed = JSON.parse(data);
  } catch(e) {
    return <div className="text-red-500">Invalid Quiz JSON</div>;
  }

  return (
    <div className="my-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] not-prose">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-blue-400" />
        <h4 className="text-lg font-bold text-blue-300 m-0">Cek Pemahaman Konsep</h4>
      </div>
      <p className="text-white text-base mb-4 font-medium leading-relaxed">{parsed.question}</p>
      <div className="space-y-2 mt-4">
        {parsed.options.map((opt: string, idx: number) => {
          const isSelected = state.selected === idx;
          const isRight = parsed.answer === idx;
          const showSuccess = state.isCorrect !== null && isRight;
          const showError = isSelected && !isRight;

          return (
            <button
              key={idx}
              onClick={() => {
                if (state.isCorrect) return; // lock if already correct
                setState({ selected: idx, isCorrect: isRight });
              }}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                showSuccess ? 'bg-green-500/20 border-green-500 text-green-200' :
                showError ? 'bg-red-500/20 border-red-500 text-red-200' :
                isSelected ? 'bg-blue-500/20 border-blue-500 text-white' :
                'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{opt}</span>
                {showSuccess && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            </button>
          );
        })}
      </div>
      {state.selected !== null && (
        <div className={`mt-4 p-4 rounded-lg text-sm ${state.isCorrect ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-red-500/10 text-red-300 border border-red-500/20'}`}>
          <div className="flex items-start gap-3">
            {state.isCorrect ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <X className="w-5 h-5 shrink-0 mt-0.5" />}
            <div>
              <p className="font-bold mb-1 text-base">{state.isCorrect ? 'Tepat Sekali!' : 'Masih Kurang Tepat!'}</p>
              <p className="leading-relaxed opacity-90">{parsed.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [quizState, setQuizState] = useState<Record<number, {selected: number | null, isCorrect: boolean | null}>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

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
        if (activeModObj && activeModObj.chapterTitle) {
          setExpandedChapters({ [activeModObj.chapterTitle]: true });
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
      setQuizState({});
      // Scroll will be handled by a separate useEffect
    })
    .catch(err => {
      console.error(err);
      setContentLoading(false);
    });
  }, [activeModuleId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [moduleContent]);

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

            const chapterTitles = Object.keys(grouped);
            const chapterCompletion: Record<string, boolean> = {};
            
            chapterTitles.forEach(chap => {
              const allModsInChap: any[] = [];
              Object.values(grouped[chap]).forEach(secMods => allModsInChap.push(...secMods));
              const isCompleted = allModsInChap.every(m => progress.some(p => p.moduleId === m.id && p.isCompleted));
              chapterCompletion[chap] = isCompleted;
            });

            return chapterTitles.map((chap, idx) => {
              const isLocked = idx > 0 && !chapterCompletion[chapterTitles[idx - 1]];
              const isChapExpanded = expandedChapters[chap] ?? false;
              const toggleChap = () => setExpandedChapters(prev => ({ ...prev, [chap]: !prev[chap] }));
              
              return (
              <div key={chap} className={`space-y-2 ${isLocked ? 'opacity-50' : ''}`}>
                <button 
                  onClick={toggleChap}
                  disabled={isLocked}
                  className="w-full flex justify-between items-center px-2 py-1.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 text-left">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{chap}</h3>
                    {isLocked && <Lock className="w-3 h-3 text-red-400 shrink-0" />}
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${isChapExpanded ? 'rotate-90' : ''}`} />
                </button>
                {isChapExpanded && (
                <div className={`space-y-2 ${isLocked ? 'pointer-events-none' : ''}`}>
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
                )}
              </div>
              );
            });
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
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match && match[1] === 'inlinequiz') {
                          return <InlineQuiz data={String(children).replace(/\n$/, '')} />;
                        }
                        return <code className={className} {...props}>{children}</code>;
                      }
                    }}
                  >
                    {moduleContent.contentMd}
                  </ReactMarkdown>
                </article>

                {/* Interactive Quiz Section */}
                {(() => {
                  let parsedQuiz: any[] = [];
                  try {
                    if (moduleContent.quizJson) {
                      const p = JSON.parse(moduleContent.quizJson);
                      parsedQuiz = Array.isArray(p) ? p : [p];
                    }
                  } catch(e) {}
                  
                  const isCompleted = progress.some(p => p.moduleId === activeModuleId && p.isCompleted);
                  
                  if (parsedQuiz.length > 0 && !isCompleted) {
                    return (
                      <div className="mt-12 space-y-6">
                        {parsedQuiz.map((q, qIdx) => {
                          const state = quizState[qIdx] || { selected: null, isCorrect: null };
                          return (
                            <div key={qIdx} className="bg-black/40 border border-blue-500/30 rounded-2xl p-6 md:p-8">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                  <HelpCircle className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Knowledge Check {parsedQuiz.length > 1 ? qIdx + 1 : ''}</h3>
                              </div>
                              <p className="text-gray-200 text-lg mb-6">{q.question}</p>
                              <div className="space-y-3">
                                {q.options.map((opt: string, idx: number) => {
                                  const isSelected = state.selected === idx;
                                  const isRight = q.answer === idx;
                                  const showSuccess = isSelected && isRight;
                                  const showError = isSelected && !isRight;

                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        if (state.isCorrect) return;
                                        setQuizState(prev => ({ ...prev, [qIdx]: { selected: idx, isCorrect: isRight } }));
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
                              {state.selected !== null && !state.isCorrect && (
                                <p className="text-red-400 mt-4 text-sm flex items-center gap-2">
                                  <X className="w-4 h-4" /> Jawaban belum tepat. Coba lagi!
                                </p>
                              )}
                              {state.isCorrect && (
                                <p className="text-green-400 mt-4 text-sm flex items-center gap-2 font-bold">
                                  <CheckCircle className="w-4 h-4" /> Tepat sekali!
                                </p>
                              )}
                            </div>
                          );
                        })}
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
                  let parsedQuiz: any[] = [];
                  try {
                    if (moduleContent.quizJson) {
                      const p = JSON.parse(moduleContent.quizJson);
                      parsedQuiz = Array.isArray(p) ? p : [p];
                    }
                  } catch(e) {}
                  
                  const isCompleted = progress.some(p => p.moduleId === activeModuleId && p.isCompleted);
                  const allQuizzesCorrect = parsedQuiz.length === 0 || parsedQuiz.every((_, i) => quizState[i]?.isCorrect);
                  const canComplete = isCompleted || allQuizzesCorrect;

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
