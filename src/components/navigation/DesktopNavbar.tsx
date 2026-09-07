import React from 'react';
import { Terminal, Sun, Moon, Send } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../context/ThemeContext';
import { GlassButton } from '../primitives/GlassButton';
import { DraggableNavSlider } from './DraggableNavSlider';

interface DesktopNavbarProps {
  activeSection: string;
  onSelectSection: (targetId: string) => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { isScrolled } = useScrollPosition(25);
  const { theme, toggleTheme, isLight } = useTheme();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectSection('hero');
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectSection('contact');
  };

  return (
    <header
      id="desktop-navigation-header"
      className="hidden md:block fixed top-0 left-0 right-0 z-40 px-6 py-3 transition-all duration-300"
    >
      <nav
        id="desktop-navbar-glass-container"
        className={`relative overflow-hidden max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? isLight
              ? 'bg-white/70 backdrop-blur-2xl border border-slate-200/85 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.1)] px-5 py-2.5'
              : 'bg-[#080d1a]/65 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)] px-5 py-2.5'
            : isLight
            ? 'bg-white/55 backdrop-blur-xl border border-slate-200/60 shadow-xs px-5 py-3'
            : 'bg-[#080d1a]/40 backdrop-blur-xl border border-white/[0.08] px-5 py-3'
        }`}
      >
        {/* Subtle Specular Top Highlight Line */}
        <div
          aria-hidden="true"
          className={`absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent ${
            isLight ? 'via-white/90' : 'via-cyan-300/60'
          } to-transparent pointer-events-none`}
        />

        <div className="flex items-center justify-between gap-4">
          {/* Logo / Personal Brand */}
          <a
            id="desktop-nav-logo-link"
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isLight
                  ? 'bg-sky-50 border border-sky-300 text-sky-600 group-hover:border-sky-500 shadow-xs'
                  : 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400 group-hover:border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              }`}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-bold text-sm tracking-tight transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-sky-600'
                      : 'text-neutral-100 group-hover:text-cyan-300'
                  }`}
                >
                  Ved Dhanokar
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  title="Available for opportunities"
                />
              </div>
              <span
                className={`text-[10px] -mt-0.5 tracking-wider uppercase font-mono ${
                  isLight ? 'text-slate-500' : 'text-neutral-400'
                }`}
              >
                AI/ML & Full-Stack
              </span>
            </div>
          </a>

          {/* Draggable Section Slider for Desktop Navigation */}
          <div className="flex-1 max-w-2xl mx-auto">
            <DraggableNavSlider
              activeSection={activeSection}
              onSelectSection={onSelectSection}
            />
          </div>

          {/* Right Action Controls: Theme Toggle & Get in Touch CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              id="desktop-theme-toggle-button"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isLight
                  ? 'bg-slate-100/80 hover:bg-slate-200/80 border-slate-300/80 text-amber-500 shadow-xs hover:scale-105'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:scale-105'
              }`}
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Get in Touch CTA */}
            <GlassButton
              id="desktop-nav-contact-cta"
              variant="primary"
              size="sm"
              asAnchor
              href="#contact"
              onClick={handleContactClick}
              className="inline-flex text-xs py-1.5 px-3"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>Get in Touch</span>
            </GlassButton>
          </div>
        </div>
      </nav>
    </header>
  );
};
