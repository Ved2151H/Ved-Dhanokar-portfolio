import React from 'react';
import { Terminal, Sun, Moon, Send } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GlassButton } from '../primitives/GlassButton';

interface FixedMobileHeaderProps {
  onSelectSection?: (targetId: string) => void;
}

export const FixedMobileHeader: React.FC<FixedMobileHeaderProps> = ({
  onSelectSection,
}) => {
  const { theme, toggleTheme, isLight } = useTheme();

  const handleNavClick = (targetId: string) => {
    if (onSelectSection) {
      onSelectSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // Safe fallback
      }
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <header
      id="fixed-mobile-header"
      role="banner"
      aria-label="Mobile top header"
      className="md:hidden fixed top-[calc(0.75rem+env(safe-area-inset-top,0px))] left-0 right-0 mx-auto w-[calc(100%-1.5rem)] max-w-md z-40 select-none pointer-events-auto"
    >
      {/* Floating Liquid Glass Surface */}
      <div
        id="fixed-mobile-header-glass"
        className={`relative overflow-hidden rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 transition-colors duration-300 ${
          isLight
            ? 'bg-white/70 border border-slate-200/85 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12)]'
            : 'bg-[#080d1a]/65 border border-white/[0.12] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(6,182,212,0.14)]'
        }`}
        style={{
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        }}
      >
        {/* Specular Top Glimmer Line */}
        <div
          aria-hidden="true"
          className={`absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent ${
            isLight ? 'via-white/90' : 'via-cyan-300/70'
          } to-transparent pointer-events-none`}
        />

        <div className="flex items-center justify-between gap-2">
          {/* Personal Brand Identity Link (Scrolls to top / hero) */}
          <button
            id="mobile-header-brand-button"
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0 active:scale-95 transition-transform"
            aria-label="Ved Dhanokar - Return to top of portfolio"
          >
            {/* Terminal Monogram Icon */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                isLight
                  ? 'bg-sky-50 border border-sky-300 text-sky-600 group-hover:border-sky-500 shadow-xs'
                  : 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400 group-hover:border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              }`}
            >
              <Terminal className="w-4 h-4" />
            </div>

            {/* Name and Subtitle Stack */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-bold text-sm tracking-tight truncate transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-sky-600'
                      : 'text-neutral-100 group-hover:text-cyan-300'
                  }`}
                >
                  Ved Dhanokar
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"
                  title="Available for opportunities"
                />
              </div>
              <span
                className={`text-[10px] -mt-0.5 tracking-wider uppercase font-mono truncate ${
                  isLight ? 'text-slate-500' : 'text-neutral-400'
                }`}
              >
                AI/ML & FULL-STACK
              </span>
            </div>
          </button>

          {/* Right Action Controls: Theme Switcher & Contact CTA */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              id="mobile-header-theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={handleThemeToggle}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-90 ${
                isLight
                  ? 'bg-slate-100/80 hover:bg-slate-200/80 border-slate-300/80 text-amber-500 shadow-xs'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
              }`}
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Compact Contact CTA */}
            <GlassButton
              id="mobile-header-contact-cta"
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('contact')}
              className="inline-flex text-xs py-1.5 px-2.5 sm:px-3 active:scale-95"
            >
              <span className="inline-flex items-center gap-1.5">
                <Send className="w-3 h-3" />
                <span className="font-semibold">Contact</span>
              </span>
            </GlassButton>
          </div>
        </div>
      </div>
    </header>
  );
};
