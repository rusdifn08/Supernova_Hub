import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { GamificationToasts } from "@/components/dashboard/gamification-toasts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden relative selection:bg-cyan-500/30">
      {/* Global Background Elements for Dashboard */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      
      <GamificationToasts />
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative z-10 flex flex-col">
        <div className="p-4 md:px-6 md:py-4 lg:py-6 w-full h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
