import React from 'react';
import { profileData } from '../../data/profile';

// Re-write Footer: remove Terminal icon, specular lines, gradient backgrounds
export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'About', id: '#about' },
    { label: 'Experience', id: '#experience' },
    { label: 'Skills', id: '#skills' },
    { label: 'Projects', id: '#projects' },
    { label: 'Education', id: '#education' },
    { label: 'Certifications', id: '#certifications' },
    { label: 'Achievements', id: '#achievements' },
    { label: 'Contact', id: '#contact' },
  ];

  return (
    <footer
      id="portfolio-footer"
      className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-14 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          {/* Brand */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {profileData.displayName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-neutral-400 font-medium mt-0.5">
                {profileData.subheadline}
              </p>
            </div>

            <p className="text-sm text-slate-500 dark:text-neutral-500 max-w-sm leading-relaxed">
              Building scalable full-stack software architectures with modern computer vision, deep neural networks, and generative AI.
            </p>

            <div className="flex items-center gap-4 pt-1 text-sm font-medium">
              <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                GitHub
              </a>
              <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={profileData.socials.leetcode} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                LeetCode
              </a>
              <a href={profileData.socials.email} className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                Email
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider block mb-3">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Back to top
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500 font-mono">
          <p>© 2026 Ved Dhanokar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>IICT, MGM University</span>
            <span>·</span>
            <span>B.Tech IT (2023-2027)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
