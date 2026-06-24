"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MagneticButton } from '../atoms/MagneticButton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <Image src="/icon.png" width={32} height={32} alt="Supernova Labs Logo" className="drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          Supernova Labs
        </div>
        
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Leaderboard</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <Link href="/sign-in">
            <MagneticButton className="px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20">
              Get Started
            </MagneticButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <a href="#features" className="text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#leaderboard" className="text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Leaderboard</a>
          <a href="#pricing" className="text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Pricing</a>
          <Link href="/sign-in" className="w-full">
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-bold mt-2">Get Started</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
