import React from 'react';
import { cn } from "@/lib/utils";

export function SectionBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20", className)}>
      {children}
    </div>
  );
}
