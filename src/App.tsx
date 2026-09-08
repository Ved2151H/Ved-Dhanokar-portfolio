/**
 * Premium Personal Portfolio - Ved Devanand Dhanokar
 * Full-Stack Developer | AI/ML Enthusiast
 * Built with Liquid Glass Architecture, Responsive Glassmorphism, Theme Switcher & Draggable Navigation.
 */

import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FixedMobileHeader } from './components/navigation/FixedMobileHeader';
import { DesktopNavbar } from './components/navigation/DesktopNavbar';
import { MobileBottomNav } from './components/navigation/MobileBottomNav';
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
      className={`min-h-screen transition-colors duration-300 ${
        isLight
          ? 'bg-[#f8fafc] text-slate-800 selection:bg-sky-500/20 selection:text-sky-900'
          : 'bg-[#05070c] text-neutral-100 selection:bg-cyan-500/25 selection:text-cyan-200'
      }`}
    >
      {/* Theme Background Layer: Ambient Canvas Liquid Refraction Glows (Tailored for both Dark and Light Themes) */}
      <div
        id="theme-background-layer"
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
      >
        {isLight ? (
          <>
            {/* Two restrained ambient lights keep the pale canvas calm beneath the glass. */}
            <div className="absolute -top-48 left-[18%] w-[620px] h-[620px] bg-sky-300/28 rounded-full blur-[150px]" />
            <div className="absolute top-[48%] -right-48 w-[560px] h-[560px] bg-cyan-200/22 rounded-full blur-[160px]" />
          </>
        ) : (
          <>
            {/* Two restrained cyan ambient lights keep the navy canvas atmospheric. */}
            <div className="absolute -top-52 left-[16%] w-[650px] h-[650px] bg-cyan-500/14 rounded-full blur-[170px]" />
            <div className="absolute top-[52%] -right-52 w-[620px] h-[620px] bg-blue-500/10 rounded-full blur-[180px]" />
          </>
        )}
      </div>

      {/* 1. FIXED VIEWPORT COMPONENT: Mobile Top Glass Header (Always stationary at top of screen) */}
      <FixedMobileHeader onSelectSection={scrollToId} />

      {/* 2. FIXED VIEWPORT COMPONENT: Desktop Top Navigation Bar (Always stationary on desktop) */}
      <DesktopNavbar activeSection={activeSection} onSelectSection={scrollToId} />

      {/* 3. SCROLLABLE PORTFOLIO CONTENT (Scrolls continuously underneath both fixed glass headers) */}
      <div id="scrollable-portfolio-content" className="relative z-10">
        <HomeScreen />
        <Footer />
      </div>

      {/* 4. FIXED VIEWPORT COMPONENT: Mobile Bottom Navigation Dock (Always stationary at bottom of screen) */}
      <MobileBottomNav activeSection={activeSection} onSelectSection={scrollToId} />
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

