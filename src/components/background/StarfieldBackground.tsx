import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from 'motion/react';

/* ─────────────────────────────────────────────────────────────────────────────
   StarfieldBackground — dark-theme-only falling stars on a near-black field.

   Implementation: a single fixed full-viewport <canvas> rendered at device
   pixel ratio, driven by one rAF loop. Stars are tiny soft white dots with
   individual speeds/opacity/phases; a few twinkle. Deliberately sparse and
   slow — atmosphere, not spectacle. Sits behind all content (z-0, content
   wrapper is z-10) and is pointer-transparent.

   - Rendered ONLY in dark theme (light theme keeps its clean background).
   - `prefers-reduced-motion`: static star speckle, no animation at all.
   - Pauses when the tab is hidden (rAF throttles naturally; stars are also
     reset on resize to avoid streaking artifacts).
   ────────────────────────────────────────────────────────────────────────────*/

const STAR_COUNT = 70; // sparse
const MAX_ALPHA = 0.75;

interface Star {
  x: number; // 0..1 of width
  y: number; // 0..1 of height
  r: number; // radius px (CSS)
  speed: number; // px/s downward
  alpha: number; // base opacity
  phase: number; // twinkle phase
  twinkle: number; // twinkle amplitude (0 = steady)
}

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLight } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isLight) return; // light theme: clean background, no stars
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;
    let lastT = 0;
    let cssW = 0;
    let cssH = 0;

    const makeStar = (anywhere: boolean): Star => ({
      x: Math.random(),
      y: anywhere ? Math.random() : -0.02,
      r: 0.6 + Math.random() * 1.4,
      speed: 8 + Math.random() * 22, // slow drift, px/s
      alpha: 0.15 + Math.random() * (MAX_ALPHA - 0.15),
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() < 0.35 ? 0.2 + Math.random() * 0.25 : 0,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: STAR_COUNT }, () => makeStar(true));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      for (const s of stars) {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x * cssW, s.y * cssH, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#e6edf7';
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0.016;
      lastT = t;
      ctx.clearRect(0, 0, cssW, cssH);
      for (const s of stars) {
        s.y += (s.speed * dt) / cssH;
        if (s.y > 1.03) Object.assign(s, makeStar(false));
        const a = s.twinkle
          ? s.alpha + Math.sin(t / 1000 + s.phase) * s.twinkle
          : s.alpha;
        ctx.globalAlpha = Math.max(0.05, Math.min(MAX_ALPHA, a));
        ctx.beginPath();
        ctx.arc(s.x * cssW, s.y * cssH, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#e6edf7';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (shouldReduceMotion) {
      drawStatic(); // reduced motion: gentle static speckle, no animation
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      if (shouldReduceMotion) drawStatic();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [isLight, shouldReduceMotion]);

  if (isLight) return null; // light theme: clean background, nothing rendered

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};
