import React from 'react';
import { Terminal, Github, Linkedin, Code, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profile';
import { NAV_ITEMS } from '../../constants/navigation';
import { GlassContainer } from '../primitives/GlassContainer';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer id="portfolio-footer" className="relative border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-[#030509] pt-16 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:pb-12 overflow-hidden transition-colors duration-300">
      {/* Specular line */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
      />

      <GlassContainer size="lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200 dark:border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {profileData.displayName}
              </h3>
            </div>

            <p className="text-sm text-slate-700 dark:text-neutral-300 font-medium">
              {profileData.subheadline}
            </p>

            <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Synthesizing scalable full-stack software architectures with modern computer vision, deep neural networks, and generative AI.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                id="footer-social-github"
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06] transition-colors shadow-xs"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="footer-social-linkedin"
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06] transition-colors shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="footer-social-leetcode"
                href={profileData.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06] transition-colors shadow-xs"
                aria-label="LeetCode"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                id="footer-social-email"
                href={profileData.socials.email}
                className="p-2 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06] transition-colors shadow-xs"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-slate-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors py-1 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Back to top Column */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500 font-mono">
          <p>© 2026 Ved Dhanokar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>IICT, MGM University</span>
            <span>·</span>
            <span>B.Tech IT (2023–2027)</span>
          </div>
        </div>
      </GlassContainer>
    </footer>
  );
};
