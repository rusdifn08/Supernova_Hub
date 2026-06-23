"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  Wallet, 
  Swords, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Learning", href: "/dashboard/learning", icon: BookOpen },
  { name: "Productivity", href: "/dashboard/productivity", icon: CheckSquare },
  { name: "Finance", href: "/dashboard/finance", icon: Wallet },
  { name: "Inventory", href: "/dashboard/inventory", icon: Swords },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/sign-in");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-lg md:hidden border border-white/20 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-40 backdrop-blur-xl bg-black/40 border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col shrink-0 h-full",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-[88px]"
        )}
      >
        {/* Desktop Toggle Button - Futuristic Handle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-50 w-5 h-16 bg-black/60 backdrop-blur-xl border-y border-r border-white/10 rounded-r-xl hidden md:flex items-center justify-center hover:bg-white/5 hover:border-cyan-500/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group overflow-hidden cursor-pointer"
        >
          {isOpen ? (
            <ChevronLeft size={16} className="text-gray-400 group-hover:text-cyan-400 group-hover:-translate-x-0.5 transition-all" />
          ) : (
            <ChevronRight size={16} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          )}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] transition-colors duration-300" />
        </button>

        {/* Logo / Brand */}
        <div className={cn("p-6 flex items-center overflow-hidden transition-all duration-300", isOpen ? "space-x-3" : "justify-center px-0")}>
          <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          {isOpen && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap">
              Supernova
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isOpen ? "px-4 py-3 space-x-3" : "p-3 justify-center mx-auto w-12 h-12",
                  isActive 
                    ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
                title={!isOpen ? item.name : undefined}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                )}
                <item.icon size={20} className={cn("shrink-0 transition-transform duration-200", isActive ? "scale-110 text-cyan-400" : "group-hover:scale-110")} />
                {isOpen && <span className="font-medium tracking-wide whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 overflow-hidden">
          <Link 
            href="/dashboard/settings" 
            className={cn(
              "flex items-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors",
              isOpen ? "px-4 py-3 space-x-3" : "p-3 justify-center mx-auto w-12 h-12"
            )}
            title={!isOpen ? "Settings" : undefined}
          >
            <Settings size={20} className="shrink-0" />
            {isOpen && <span className="font-medium whitespace-nowrap">Settings</span>}
          </Link>
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full",
              isOpen ? "px-4 py-3 space-x-3" : "p-3 justify-center mx-auto w-12 h-12"
            )}
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {isOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
