import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Code,
  GraduationCap,
  Award,
  Briefcase,
  Cpu,
  Sparkles,
  BarChart3,
  Activity,
  User,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassButton } from '../primitives/GlassButton';
import { GlassContainer } from '../primitives/GlassContainer';
import { GlassPill } from '../primitives/GlassPill';
import { GlassCard } from '../primitives/GlassCard';
import { HeroPortrait } from './HeroPortrait';
import { HeroVisual } from './HeroVisual';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { isLight } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [showTelemetry, setShowTelemetry] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
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
      {/* Dynamic Background Refraction Lights */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/10 blur-[130px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-purple-500/10 blur-[120px] pointer-events-none rounded-full"
      />

      {/* Desktop Vertical Section Indicator dots on far right edge */}
      <div
        aria-hidden="true"
        className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3.5 pointer-events-none"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40 dark:bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40 dark:bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40 dark:bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40 dark:bg-white/20" />
      </div>

      <GlassContainer size="lg" className="relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Staggered Content Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants} className="mb-4">
              <GlassPill variant="accent" dot={true} dotColor="bg-emerald-400" className="px-3 py-1">
                <span className="font-mono text-[11px] tracking-wide">Building Intelligent Solutions</span>
              </GlassPill>
            </motion.div>

            {/* Intro Greeting */}
            <motion.span
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium tracking-tight text-slate-600 dark:text-neutral-400 mb-1"
            >
              Hey, I'm
            </motion.span>

            {/* Large Main Headline */}
            <motion.h1
              variants={itemVariants}
              id="hero-main-title"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7.5xl font-extrabold tracking-tight leading-[1.05] mb-3"
            >
              <span className="text-slate-900 dark:text-white">Ved </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                Dhanokar
              </span>
            </motion.h1>

            {/* Supporting Headline */}
            <motion.h2
              variants={itemVariants}
              id="hero-supporting-title"
              className="text-xl sm:text-2xl lg:text-2.5xl font-semibold tracking-tight text-slate-800 dark:text-neutral-200 mb-5"
            >
              {profileData.subheadline}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              {profileData.bio}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto"
            >
              <GlassButton
                id="hero-cta-projects"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto shadow-[0_8px_25px_rgba(2,132,199,0.3)] dark:shadow-[0_0_30px_rgba(6,182,212,0.45)]"
              >
                View Projects
              </GlassButton>

              <GlassButton
                id="hero-cta-contact"
                variant="secondary"
                size="lg"
                icon={<Mail className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto"
              >
                Contact Me
              </GlassButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 flex-wrap pt-2"
            >
              <a
                id="hero-link-github"
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.1] shadow-xs transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
                aria-label="Ved Dhanokar on GitHub"
              >
                <Github className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                id="hero-link-linkedin"
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.1] shadow-xs transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
                aria-label="Ved Dhanokar on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                id="hero-link-leetcode"
                href={profileData.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.1] shadow-xs transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
                aria-label="Ved Dhanokar on LeetCode"
              >
                <Code className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>LeetCode</span>
              </a>

              <a
                id="hero-link-email"
                href={profileData.socials.email}
                className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.1] shadow-xs transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
                aria-label="Email Ved Dhanokar"
              >
                <Mail className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Email</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Portrait in Liquid Glass Frame */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
            {showTelemetry ? (
              <div className="w-full">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setShowTelemetry(false)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Back to Portrait</span>
                  </button>
                </div>
                <HeroVisual />
              </div>
            ) : (
              <HeroPortrait
                onToggleTelemetry={() => setShowTelemetry(true)}
                isTelemetryActive={showTelemetry}
              />
            )}
          </div>
        </div>

        {/* 4. Bottom Quick Stats Dock (Horizontal Liquid Glass Cards) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 lg:mt-16 pt-8 border-t border-slate-200/80 dark:border-white/[0.08]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Stat 1: Degree */}
            <GlassCard
              id="hero-stat-degree"
              material="secondary"
              variant="interactive"
              specular={true}
              className="p-4 flex items-center gap-3.5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block truncate">
                  B.Tech IT
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">
                  2023 – 2027
                </span>
              </div>
            </GlassCard>

            {/* Stat 2: CGPA */}
            <GlassCard
              id="hero-stat-cgpa"
              material="secondary"
              variant="interactive"
              specular={true}
              className="p-4 flex items-center gap-3.5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block truncate">
                  CGPA
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">
                  8.45 / 10
                </span>
              </div>
            </GlassCard>

            {/* Stat 3: Internship */}
            <GlassCard
              id="hero-stat-intern"
              material="secondary"
              variant="interactive"
              specular={true}
              className="p-4 flex items-center gap-3.5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block truncate">
                  AI/ML Intern
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">
                  SURE Trust
                </span>
              </div>
            </GlassCard>

            {/* Stat 4: Specialization */}
            <GlassCard
              id="hero-stat-focus"
              material="secondary"
              variant="interactive"
              specular={true}
              className="p-4 flex items-center gap-3.5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 block truncate">
                  Focus
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">
                  AI/ML & Full-Stack
                </span>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </GlassContainer>
    </section>
  );
};
