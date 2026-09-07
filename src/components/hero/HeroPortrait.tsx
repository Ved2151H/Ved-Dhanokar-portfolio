import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeroPortraitProps {
  onToggleTelemetry?: () => void;
  isTelemetryActive?: boolean;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({
  onToggleTelemetry,
  isTelemetryActive = false,
}) => {
  const { isLight } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -4.5);
    setRotateY(((x - centerX) / centerX) * 4.5);
    setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  // ─── Floating card glass tokens ──────────────────────────────────────────
  // These use low-alpha values so the photograph remains clearly visible.
  // They DO NOT use solid black/white fills.

  // Dark theme: very subtle navy tint — photograph bleeds through
  // Light theme: very subtle white tint — photograph bleeds through
  const floatCard = isLight
    ? 'bg-white/38 backdrop-blur-[10px] saturate-[170%] border border-white/60 shadow-[0_4px_14px_rgba(15,23,42,0.10)]'
    : 'bg-slate-900/40 backdrop-blur-[10px] saturate-[160%] border border-white/[0.14] shadow-[0_4px_18px_rgba(0,0,0,0.45)]';

  // Inner gradient overlay (simulates refraction / brightness variation)
  const floatCardInner = isLight
    ? 'bg-gradient-to-br from-white/30 via-transparent to-sky-200/10'
    : 'bg-gradient-to-br from-white/[0.07] via-transparent to-cyan-500/[0.04]';

  // Text tokens
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSec     = isLight ? 'text-slate-500' : 'text-neutral-400';
  const textAccent  = isLight ? 'text-cyan-700'  : 'text-cyan-300';
  const textAccentB = isLight ? 'text-blue-700'  : 'text-blue-300';
  const textAccentG = isLight ? 'text-emerald-700' : 'text-emerald-400';

  // Status card — slightly stronger so text is always readable
  const statusCard = isLight
    ? 'bg-white/50 backdrop-blur-[12px] saturate-[170%] border border-cyan-300/50 shadow-[0_6px_20px_rgba(15,23,42,0.12)]'
    : 'bg-slate-900/52 backdrop-blur-[12px] saturate-[160%] border border-cyan-400/35 shadow-[0_6px_22px_rgba(0,0,0,0.50)]';

  // Quote strip — slightly stronger backdrop at bottom
  const quoteCard = isLight
    ? 'bg-white/55 backdrop-blur-[14px] saturate-[175%] border border-slate-200/70 shadow-[0_8px_24px_rgba(15,23,42,0.12)]'
    : 'bg-slate-900/55 backdrop-blur-[14px] saturate-[165%] border border-white/[0.13] shadow-[0_8px_26px_rgba(0,0,0,0.55)]';

  // Telemetry badge
  const telemetryBadge = isLight
    ? 'bg-white/45 backdrop-blur-[10px] border border-blue-200/60 hover:bg-white/65 text-blue-700'
    : 'bg-slate-900/45 backdrop-blur-[10px] border border-white/[0.16] hover:bg-slate-800/60 text-cyan-400';

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] mx-auto select-none">
      {/* Background Soft Ambient Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-4 rounded-[40px] blur-3xl opacity-60 transition-colors duration-500 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-tr from-sky-400/25 via-indigo-300/20 to-cyan-400/25'
            : 'bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/15'
        }`}
      />

      {/* 3D Tilt Wrapper — captures mouse events and drives the tilt numbers */}
      {/* NOTE: the 3D transform is applied to an inner visual shell, NOT to this
           wrapper, so text children always render in a normal 2D compositing layer. */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        {/* ── Visual-only 3D tilt shell (no text inside this layer) ────── */}
        {/* This div gets the perspective transform; it is purely decorative.
            Keeping text out of a rotated stacking context prevents blurry fonts. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* ── Outer Structural Glass Frame (2D, text-safe context) ─────── */}
        <div className="relative rounded-[32px] p-3 sm:p-3.5 glass-struct glass-specular transition-all duration-300">
          {/* Dynamic Light Glare follows cursor */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${
                isLight ? 'transparent' : 'rgba(6,182,212,0.14)'
              } 0%, transparent 55%)`,
            }}
          />

          {/* ── Image Container ──────────────────────────────────── */}
          <div className="relative z-10 rounded-[24px] overflow-hidden aspect-[4/5] w-full">
            {/* Portrait */}
            <img
              id="hero-portrait-image"
              src="/me.jpg"
              alt="Ved Dhanokar - Full-Stack Developer & AI/ML Enthusiast"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = '/src/assets/me.jpg';
                }
              }}
            />

            {/* Vignette — very light so it doesn't darken the photo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"
            />

            {/* ─── 1. Floating Card: Top-Left Handwriting ────────── */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-3.5 left-3.5 z-10 pointer-events-none"
            >
              {/* Card glass shell */}
              <div className={`relative px-3 py-2 rounded-2xl overflow-hidden ${floatCard}`}>
                {/* Inner refraction overlay */}
                <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${floatCardInner}`} />
                {/* Specular top edge */}
                <div aria-hidden="true" className={`absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'via-white/90' : 'via-white/25'} to-transparent pointer-events-none`} />
                <div className={`relative font-handwriting ${textAccent} text-lg sm:text-xl font-bold leading-tight tracking-wide`} style={{ textShadow: isLight ? '0 1px 3px rgba(255,255,255,0.7)' : '0 1px 6px rgba(0,0,0,0.6)' }}>
                  Build <br />
                  Learn <br />
                  Innovate <br />
                  Repeat
                </div>
              </div>
            </motion.div>

            {/* ─── 2. Floating Card: Top-Right Tech Equation ─────── */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-3.5 right-3.5 z-10 pointer-events-none"
            >
              <div className={`relative px-2.5 py-1.5 rounded-xl overflow-hidden ${floatCard} text-center font-mono text-[10px] sm:text-[11px] tracking-wider font-semibold`}>
                <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${floatCardInner}`} />
                <div aria-hidden="true" className={`absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'via-white/90' : 'via-white/25'} to-transparent pointer-events-none`} />
                <div className="relative">
                  <span className={textAccent}>AI</span> <br />
                  <span className={textSec}>+</span> <br />
                  <span className={textAccentB}>Code</span> <br />
                  <span className={textSec}>=</span> <br />
                  <span className={`${textAccentG} font-bold`}>Impact</span>
                </div>
              </div>
            </motion.div>

            {/* ─── 3. Floating Card: Currently @ SURE Trust ────────── */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-12 right-3.5 z-10"
            >
              <div className={`relative px-3 py-1.5 rounded-xl overflow-hidden ${statusCard} flex items-center gap-2`}>
                <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${floatCardInner}`} />
                <div aria-hidden="true" className={`absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'via-white/90' : 'via-white/20'} to-transparent pointer-events-none`} />
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <div className="relative flex flex-col">
                  <span className={`text-[9px] uppercase tracking-wider ${textAccent} font-mono`}>Currently</span>
                  <span className={`text-[11px] font-semibold ${textPrimary} whitespace-nowrap`} style={{ textShadow: isLight ? 'none' : '0 1px 4px rgba(0,0,0,0.5)' }}>
                    AI/ML Intern @ SURE Trust
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ─── 4. Quote Strip: Bottom ──────────────────────────── */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-1 inset-x-3 z-20"
            >
              <div className={`relative py-2 px-3 rounded-xl overflow-hidden ${quoteCard} text-center`}>
                <div aria-hidden="true" className={`absolute inset-0 pointer-events-none ${floatCardInner}`} />
                <div aria-hidden="true" className={`absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'via-white/95' : 'via-white/25'} to-transparent pointer-events-none`} />
                <p className={`relative text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 ${textPrimary}`}>
                  <Sparkles className={`w-3 h-3 ${textAccent} shrink-0`} />
                  <span>"Turning ideas into intelligent solutions."</span>
                </p>
              </div>
            </motion.div>

            {/* ─── Telemetry Badge ──────────────────────────────────── */}
            {onToggleTelemetry && (
              <button
                type="button"
                onClick={onToggleTelemetry}
                title="Toggle Interactive Live Telemetry Console"
                aria-label="Toggle Interactive Live Telemetry Console"
                className={`absolute bottom-3 left-3 z-30 p-1.5 rounded-lg ${telemetryBadge} transition-all cursor-pointer shadow-md flex items-center gap-1 text-[10px] font-mono`}
              >
                <Activity className="w-3 h-3" />
                <span className="hidden sm:inline">Telemetry</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
