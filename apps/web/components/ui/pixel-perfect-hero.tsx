"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { NeonButton } from "./neon-button";

const BRAND_LOGOS = [
  () => (
    <svg className="h-[22px] sm:h-[28px] w-auto select-none opacity-60 hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 262 33">
      <path className="fill-cyan-500" fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" />
    </svg>
  ),
  () => (
    <div className="flex items-center justify-start font-bold text-sm md:text-base gap-2 text-foreground/75 dark:text-foreground/80 opacity-60 hover:opacity-100 transition-opacity duration-300">
      <svg viewBox="0 0 14 21" role="presentation" className="h-[22px] md:h-[26px] fill-current">
        <path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" fill="currentColor"></path>
      </svg>
      Motion
    </div>
  )
];

type Pixel = { x: number; y: number; color: string; ctx: CanvasRenderingContext2D; speed: number; size: number; sizeStep: number; minSize: number; maxSizeInt: number; maxSize: number; delay: number; counter: number; counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean; draw: () => void; appear: () => void; disappear: () => void; shimmer: () => void; };

function createPixel(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number, y: number, color: string, baseSpeed: number, delay: number): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const p: Pixel = {
    x, y, color, ctx, speed: rand(0.08, 0.4) * baseSpeed, size: 0, sizeStep: rand(0.12, 0.28), minSize: 0.5, maxSizeInt: 2, maxSize: rand(0.5, 2), delay, counter: 0, counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008, isIdle: false, isReverse: false, isShimmer: false,
    draw() { const offset = p.maxSizeInt * 0.5 - p.size * 0.5; ctx.fillStyle = p.color; ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size); },
    appear() { p.isIdle = false; if (p.counter <= p.delay) { p.counter += p.counterStep; return; } if (p.size >= p.maxSize) p.isShimmer = true; if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep; p.draw(); },
    disappear() { p.isShimmer = false; p.counter = 0; if (p.size <= 0) { p.isIdle = true; return; } p.size -= 0.1; p.draw(); },
    shimmer() { if (p.size >= p.maxSize) p.isReverse = true; else if (p.size <= p.minSize) p.isReverse = false; if (p.isReverse) p.size -= p.speed; else p.size += p.speed; }
  };
  return p;
}

function PixelCanvas({ colors, gap = 5, speed = 30 }: { colors: string[]; gap?: number; speed?: number; }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    const pixels: Pixel[] = [];
    for (let x = 0; x < canvas.width; x += gap) {
      for (let y = 0; y < canvas.height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        pixels.push(createPixel(ctx, canvas, x, y, color, speed * 0.001, Math.sqrt(dx * dx + dy * dy) * 0.65));
      }
    }
    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();
      if (pixels.every((p) => p.isIdle)) cancelAnimationFrame(animationRef.current);
    };
    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    init();
    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);
    animate("appear");
    return () => { resizeObserver.disconnect(); cancelAnimationFrame(animationRef.current); };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export function PixelHero({
  word1 = "Silent", word2 = "Precision.", description = "Minimalist interfaces driven by refined motion.", primaryCta = "Explore", secondaryCta = "GitHub", onPrimaryClick, onSecondaryClick
}: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    setThemeColors(["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]); // Fallback bright colors
    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="relative w-full min-h-[100dvh] bg-transparent flex flex-col justify-center py-8 px-6 overflow-hidden select-none isolate">

      <div className="flex flex-col items-center justify-center text-center z-10 w-full">
        <h1 className="flex flex-row items-center justify-center gap-4 flex-wrap text-6xl md:text-9xl leading-none font-bold">
          <span className="font-serif italic text-primary">{word1}</span>
          <span className="font-sans tracking-tighter text-foreground">{word2}</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light text-muted-foreground max-w-xl leading-relaxed">{description}</p>
        <div className={cn("flex flex-row gap-4 mt-10 transition-all duration-1000 transform", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <Link href="/sign-in">
            <NeonButton variant="solid" size="lg" className="flex items-center gap-2 text-sm font-semibold h-12">
              {primaryCta} <ArrowRight className="w-4 h-4"/>
            </NeonButton>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <NeonButton variant="default" neon={true} size="lg" className="flex items-center gap-2 text-sm font-semibold h-12">
              <Code className="w-4 h-4"/> {secondaryCta}
            </NeonButton>
          </a>
        </div>
      </div>
    </div>
  );
}
