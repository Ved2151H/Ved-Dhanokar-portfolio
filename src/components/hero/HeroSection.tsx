import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, Code, Sparkles, Terminal } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassButton } from '../primitives/GlassButton';
import { GlassContainer } from '../primitives/GlassContainer';
import { GlassPill } from '../primitives/GlassPill';
import { HeroVisual } from './HeroVisual';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:pt-28 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Subtle ambient lighting spots */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[380px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-purple-600/5 blur-[120px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full"
      />

      <GlassContainer size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <GlassPill variant="accent" dot={true} dotColor="bg-emerald-400">
                AI/ML Intern @ SURE Trust
              </GlassPill>
              <GlassPill variant="default">
                B.Tech IT · CGPA 8.45
              </GlassPill>
            </div>

            {/* Large Main Headline */}
            <h1
              id="hero-main-title"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4"
            >
              <span className="block text-slate-900 dark:text-neutral-100">{profileData.displayName}</span>
            </h1>

            {/* Supporting Headline */}
            <h2
              id="hero-supporting-title"
              className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-600 to-indigo-700 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 mb-6"
            >
              {profileData.subheadline}
            </h2>

            {/* Resume-backed Description */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              {profileData.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <GlassButton
                id="hero-cta-projects"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto"
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
            </div>

            {/* Secondary Social & Profile Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.08] w-full">
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                Connect / Code:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  id="hero-link-github"
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.09] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-none transition-all flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Ved Dhanokar on GitHub"
                >
                  <Github className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>GitHub</span>
                </a>

                <a
                  id="hero-link-linkedin"
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.09] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-none transition-all flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Ved Dhanokar on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  id="hero-link-leetcode"
                  href={profileData.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.09] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-none transition-all flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Ved Dhanokar on LeetCode"
                >
                  <Code className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>LeetCode</span>
                </a>

                <a
                  id="hero-link-email"
                  href={profileData.socials.email}
                  className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.09] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-none transition-all flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Email Ved Dhanokar"
                >
                  <Mail className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D-Style Glass Workspace Telemetry Visualizer */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </GlassContainer>
    </section>
  );
};
