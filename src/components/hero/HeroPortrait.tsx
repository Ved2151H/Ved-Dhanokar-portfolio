import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Terminal, Activity, Eye } from 'lucide-react';
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

  // Mouse tilt physics state
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

    // Subtle 3D tilt max 5 degrees
    const rX = ((y - centerY) / centerY) * -4.5;
    const rY = ((x - centerX) / centerX) * 4.5;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] mx-auto select-none">
      {/* Background Soft Glows */}
      <div
        aria-hidden="true"
        className={`absolute -inset-4 rounded-[40px] blur-3xl opacity-70 transition-colors duration-500 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-tr from-sky-400/30 via-indigo-300/25 to-cyan-400/30'
            : 'bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-600/20'
        }`}
      />

      {/* Floating 3D Tilt Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative group"
      >
        {/* Outer Liquid Glass Frame */}
        <div
          className={`relative rounded-[32px] p-3 sm:p-3.5 backdrop-blur-2xl transition-all duration-300 ${
            isLight
              ? 'bg-white/70 border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.14)]'
              : 'bg-slate-900/45 border border-white/[0.14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
          }`}
        >
          {/* Specular Edge Highlight */}
          <div
            aria-hidden="true"
            className={`absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent ${
              isLight ? 'via-white' : 'via-cyan-300/60'
            } to-transparent pointer-events-none rounded-t-[32px]`}
          />

          {/* Dynamic Light Glare follows cursor */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${
                isLight ? 'rgba(255,255,255,0.45)' : 'rgba(6,182,212,0.18)'
              } 0%, transparent 60%)`,
            }}
          />

          {/* Inner Image Container */}
          <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] w-full bg-slate-950/20">
            {/* The Real Portrait Photograph */}
            <img
              id="hero-portrait-image"
              src="/me.jpg"
              alt="Ved Dhanokar - Full-Stack Developer & AI/ML Enthusiast"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.025]"
              onError={(e) => {
                // Fallback to src/assets/me.jpg if root fails
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = '/src/assets/me.jpg';
                }
              }}
            />

            {/* Subtle Gradient vignette on the photograph to blend with glass */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none"
            />

            {/* 1. FLOATING CARD: Top Left Handwriting Notes */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-3.5 left-3.5 z-10 pointer-events-none"
            >
              <div className="px-3 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-left shadow-lg">
                <div className="font-handwriting text-cyan-300 text-lg sm:text-xl font-bold leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Build <br />
                  Learn <br />
                  Innovate <br />
                  Repeat
                </div>
              </div>
            </motion.div>

            {/* 2. FLOATING CARD: Top Right Tech Equation Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-3.5 right-3.5 z-10 pointer-events-none"
            >
              <div className="px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-center font-mono text-[10px] sm:text-[11px] text-white/90 shadow-lg tracking-wider font-semibold">
                <span className="text-cyan-400">AI</span> <br />
                <span className="text-white/60">+</span> <br />
                <span className="text-blue-400">Code</span> <br />
                <span className="text-white/60">=</span> <br />
                <span className="text-emerald-400 font-bold">Impact</span>
              </div>
            </motion.div>

            {/* 3. FLOATING CARD: Bottom Right Status Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-12 right-3.5 z-10"
            >
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-cyan-400/40 text-left shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-cyan-300 font-mono">
                    Currently
                  </span>
                  <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                    AI/ML Intern @ SURE Trust
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 4. OVERLAPPING BOTTOM QUOTE PILL */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-1 inset-x-3 z-20"
            >
              <div
                className={`py-2 px-3 rounded-xl backdrop-blur-xl border text-center transition-all ${
                  isLight
                    ? 'bg-white/85 border-slate-200 text-slate-800 shadow-[0_8px_20px_rgba(15,23,42,0.12)]'
                    : 'bg-slate-900/80 border-white/[0.18] text-neutral-200 shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                }`}
              >
                <p className="text-xs sm:text-xs font-medium tracking-wide flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>"Turning ideas into intelligent solutions."</span>
                </p>
              </div>
            </motion.div>

            {/* Corner telemetry toggle badge */}
            {onToggleTelemetry && (
              <button
                type="button"
                onClick={onToggleTelemetry}
                title="Toggle Interactive Live Telemetry Console"
                aria-label="Toggle Interactive Live Telemetry Console"
                className="absolute bottom-3 left-3 z-30 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/20 text-cyan-400 hover:text-cyan-300 backdrop-blur-md transition-all cursor-pointer shadow-md flex items-center gap-1 text-[10px] font-mono"
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
