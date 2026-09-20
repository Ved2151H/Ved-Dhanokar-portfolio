import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export const HeroPortrait: React.FC = () => {
  const { isLight } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] mx-auto select-none">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        <div className={`relative rounded-[24px] p-2 transition-all duration-300 ${isLight ? 'bg-white border border-slate-200 shadow-sm' : 'bg-slate-900 border border-slate-800 shadow-md'}`}>
          <div className="relative z-10 rounded-[18px] overflow-hidden aspect-[4/5] w-full bg-slate-100 dark:bg-slate-800">
            <img
              id="hero-portrait-image"
              src="/me.jpg"
              alt="Ved Dhanokar - Full-Stack Developer & AI/ML Enthusiast"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top filter contrast-[1.03]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = '/src/assets/me.jpg';
                }
              }}
            />
            {/* Subtle overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[18px] pointer-events-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
