import React from 'react';
import Image from 'next/image';

export function CinematicFooter() {
  return (
    <footer className="relative bg-background pt-20 pb-10 border-t border-border overflow-hidden mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.1)_0%,transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">Ready to level up?</h2>
            <p className="text-muted-foreground text-lg">Join thousands of learners today.</p>
          </div>
          <button className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform text-lg">
            Create Free Account
          </button>
        </div>
        
        <div className="h-px w-full bg-border/50 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Image src="/icon.png" width={24} height={24} alt="Supernova Labs Logo" className="drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
            Supernova Labs
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
          <div>© {new Date().getFullYear()} Supernova Labs. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
