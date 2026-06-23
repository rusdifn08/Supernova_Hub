import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { CinematicFooter } from '../organisms/CinematicFooter';
import { PixelBackground } from '../ui/pixel-background';

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-foreground overflow-x-hidden selection:bg-primary/20 relative">
      <PixelBackground />
      <Navbar />
      <main className="flex-1 bg-transparent z-10">
        {children}
      </main>
      <CinematicFooter />
    </div>
  );
}
