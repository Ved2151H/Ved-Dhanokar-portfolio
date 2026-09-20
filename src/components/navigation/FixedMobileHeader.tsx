import React from 'react';
import { Sun, Moon } from 'lucide-react';
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
      try { navigator.vibrate(8); } catch { /* Safe fallback */ }
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(10); } catch { /* Safe fallback */ }
    }
  };

  return (
    <header
      id="fixed-mobile-header"
      role="banner"
      aria-label="Mobile top header"
      className="md:hidden fixed top-[calc(0.75rem+env(safe-area-inset-top,0px))] left-0 right-0 mx-auto w-[calc(100%-1.5rem)] max-w-md z-40 select-none pointer-events-auto"
    >
      <div
        id="fixed-mobile-header-glass"
        className={`relative rounded-lg px-3 sm:px-3.5 py-2 sm:py-2.5 border transition-colors duration-300 ${
          isLight
            ? 'bg-white/95 border-slate-200 shadow-sm'
            : 'bg-slate-950/95 border-slate-800 shadow-md'
        }`}
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between gap-2">
          <button
            id="mobile-header-brand-button"
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
            aria-label="Ved Dhanokar - Return to top of portfolio"
          >
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                Ved Dhanokar
              </span>
              <span className="text-[10px] -mt-0.5 tracking-wider uppercase font-mono text-slate-500 dark:text-neutral-500">
                AI/ML & Full-Stack
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="mobile-header-theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={handleThemeToggle}
              className="p-2 rounded-md border transition-colors cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-neutral-300"
            >
              {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <GlassButton
              id="mobile-header-contact-cta"
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </GlassButton>
          </div>
        </div>
      </div>
    </header>
  );
};
