/**
 * Premium Personal Portfolio - Ved Devanand Dhanokar
 * Full-Stack Developer | AI/ML Enthusiast
 * Built with a clean, responsive, and modern architecture, Theme Switcher & Draggable Navigation.
 */

import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FloatingNavbar } from './components/navigation/FloatingNavbar';
import { StarfieldBackground } from './components/background/StarfieldBackground';
import { NAV_ITEMS } from './constants/navigation';
import { useActiveSection } from './hooks/useActiveSection';
import { HomeScreen } from './screens/HomeScreen';
import { Footer } from './components/footer/Footer';

const AppContent: React.FC = () => {
  const { isLight } = useTheme();
  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds, 'hero');

  const scrollToId = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      id="app-root-container"
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${
        isLight
          ? 'bg-[#fafafa] text-slate-800 selection:bg-slate-200 selection:text-slate-900'
          : 'bg-[#05070c] text-neutral-100 selection:bg-slate-800 selection:text-neutral-200'
      }`}
    >
      {/* 0. DARK-THEME STARFIELD: fixed falling-star canvas behind everything
          (renders nothing in light theme) */}
      <StarfieldBackground />

      {/* 1. FLOATING NAVBAR: Desktop pill that shrinks on scroll + mobile hamburger menu (fixed at top) */}
      <FloatingNavbar activeSection={activeSection} onSelectSection={scrollToId} />

      {/* 2. SCROLLABLE PORTFOLIO CONTENT (Scrolls continuously underneath the floating navbar) */}
      <div id="scrollable-portfolio-content" className="relative z-10">
        <HomeScreen />
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
