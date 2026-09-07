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
            {/* Apple-Style Light Mode Ambient Refraction Glows */}
            <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-sky-300/40 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-indigo-300/35 rounded-full blur-[140px]" />
            <div className="absolute top-2/3 -left-20 w-[600px] h-[600px] bg-cyan-300/35 rounded-full blur-[150px]" />
            <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-blue-300/35 rounded-full blur-[140px]" />
            {/* Soft grid texture visible through glass in light canvas */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0d_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0d_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        ) : (
          <>
            {/* Deep Futuristic Dark Canvas Ambient Glows (Vibrant enough to refract through translucent glass) */}
            <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-cyan-500/18 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-indigo-500/15 rounded-full blur-[140px]" />
            <div className="absolute top-2/3 -left-20 w-[650px] h-[650px] bg-purple-500/14 rounded-full blur-[160px]" />
            <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-sky-500/16 rounded-full blur-[130px]" />
            {/* Subtle grid texture visible through glass in dark canvas */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
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

