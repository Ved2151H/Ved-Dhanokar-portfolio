import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profileData } from '../../data/profile';
import { GlassButton } from '../primitives/GlassButton';
import { GlassContainer } from '../primitives/GlassContainer';
import { GlassPill } from '../primitives/GlassPill';
import { GlassCard } from '../primitives/GlassCard';
import { HeroPortrait } from './HeroPortrait';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { isLight } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pt-28 pb-12 lg:pb-16 overflow-hidden"
    >
      <GlassContainer size="lg" className="relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <GlassPill variant="accent" className="px-3 py-1">
                <span className="font-mono text-[11px] tracking-wide">Building Intelligent Solutions</span>
              </GlassPill>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium tracking-tight text-slate-600 dark:text-neutral-400 mb-1"
            >
              Hey, I'm
            </motion.span>

            <motion.h1
              variants={itemVariants}
              id="hero-main-title"
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Ved Dhanokar
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              id="hero-supporting-title"
              className="text-xl sm:text-2xl lg:text-2.5xl font-semibold tracking-tight text-slate-800 dark:text-neutral-200 mb-5"
            >
              {profileData.subheadline}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              {profileData.bio}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto"
            >
              <GlassButton
                id="hero-cta-projects"
                variant="primary"
                size="lg"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto"
              >
                View Projects
              </GlassButton>

              <GlassButton
                id="hero-cta-contact"
                variant="secondary"
                size="lg"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto"
              >
                Contact Me
              </GlassButton>
            </motion.div>

            {/* Social Links (Clean, text-only) */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 flex-wrap pt-2 text-sm font-medium"
            >
              <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">GitHub</a>
              <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">LinkedIn</a>
              <a href={profileData.socials.leetcode} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">LeetCode</a>
              <a href={profileData.socials.email} className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">Email</a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Portrait */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
            <HeroPortrait />
          </div>
        </div>

        {/* Bottom Quick Stats */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 lg:mt-16 rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Degree</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">B.Tech IT (2023–27)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">CGPA</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">8.45 / 10</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Internship</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">SURE Trust</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">Focus</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">AI/ML & Full-Stack</span>
            </div>
          </div>
        </motion.div>
      </GlassContainer>
    </section>
  );
};
