import React from 'react';
import { Sun, Moon } from 'lucide-react';
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
        id="desktop-navbar-container"
        className={`relative max-w-7xl mx-auto rounded-lg transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm px-5 py-2.5'
            : 'bg-white/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm px-5 py-3'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            id="desktop-nav-logo-link"
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                Ved Dhanokar
              </span>
              <span className="text-[10px] -mt-0.5 tracking-wider uppercase font-mono text-slate-500 dark:text-neutral-500">
                AI/ML & Full-Stack
              </span>
            </div>
          </a>

          {/* Draggable Section Slider */}
          <div className="flex-1 max-w-2xl mx-auto">
            <DraggableNavSlider
              activeSection={activeSection}
              onSelectSection={onSelectSection}
            />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="desktop-theme-toggle-button"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={toggleTheme}
              className="p-2 rounded-md border transition-colors duration-200 cursor-pointer flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-neutral-300"
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-slate-600" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-300" />
              )}
            </button>

            <GlassButton
              id="desktop-nav-contact-cta"
              variant="primary"
              size="sm"
              asAnchor
              href="#contact"
              onClick={handleContactClick}
            >
              Get in Touch
            </GlassButton>
          </div>
        </div>
      </nav>
    </header>
  );
};
