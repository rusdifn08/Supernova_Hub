"use client";

import React, { useCallback, useEffect, useRef } from "react";

type Pixel = { x: number; y: number; color: string; ctx: CanvasRenderingContext2D; speed: number; size: number; sizeStep: number; minSize: number; maxSizeInt: number; maxSize: number; delay: number; counter: number; counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean; draw: () => void; appear: () => void; disappear: () => void; shimmer: () => void; };

function createPixel(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number, y: number, color: string, baseSpeed: number, delay: number): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const p: Pixel = {
    x, y, color, ctx, speed: rand(0.1, 0.5) * baseSpeed, size: 0, sizeStep: rand(0.2, 0.5), minSize: 0.5, maxSizeInt: 2, maxSize: rand(0.5, 2), delay, counter: 0, counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008, isIdle: false, isReverse: false, isShimmer: false,
    draw() { const offset = p.maxSizeInt * 0.5 - p.size * 0.5; ctx.fillStyle = p.color; ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size); },
    appear() { p.isIdle = false; if (p.counter <= p.delay) { p.counter += p.counterStep; return; } if (p.size >= p.maxSize) p.isShimmer = true; if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep; p.draw(); },
    disappear() { p.isShimmer = false; p.counter = 0; if (p.size <= 0) { p.isIdle = true; return; } p.size -= 0.1; p.draw(); },
    shimmer() { if (p.size >= p.maxSize) p.isReverse = true; else if (p.size <= p.minSize) p.isReverse = false; if (p.isReverse) p.size -= p.speed; else p.size += p.speed; }
  };
  return p;
}

export function PixelBackground({ colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"], gap = 6, speed = 80 }: { colors?: string[]; gap?: number; speed?: number; }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);

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
        // Make the animation start across the screen randomly instead of just radiating from center
        pixels.push(createPixel(ctx, canvas, x, y, color, speed * 0.002, Math.random() * 50));
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
    <div ref={wrapRef} className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none overflow-hidden bg-background">
      <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)] pointer-events-none opacity-90" />
    </div>
  );
}
