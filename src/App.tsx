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
            {/* Light ambient refraction blobs — vivid enough to bleed through white glass */}
            <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-sky-300/50 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-indigo-300/42 rounded-full blur-[130px]" />
            <div className="absolute top-[55%] -left-20 w-[650px] h-[650px] bg-cyan-300/45 rounded-full blur-[140px]" />
            <div className="absolute bottom-10 right-1/4 w-[580px] h-[580px] bg-blue-300/42 rounded-full blur-[120px]" />
            {/* Mid-page supplementary blob for glass refraction variety */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[160px]" />
            {/* Fine dot grid — visible through glass */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#0f172a18_1px,transparent_1px)] bg-[size:36px_36px]" />
          </>
        ) : (
          <>
            {/* Dark ambient refraction blobs — vivid enough to glow through dark glass */}
            <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-cyan-500/22 rounded-full blur-[130px]" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-indigo-500/18 rounded-full blur-[130px]" />
            <div className="absolute top-[55%] -left-20 w-[700px] h-[700px] bg-purple-500/17 rounded-full blur-[150px]" />
            <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px]" />
            {/* Mid-page blob for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/12 rounded-full blur-[180px]" />
            {/* Fine dot grid visible through glass */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff0b_1px,transparent_1px)] bg-[size:36px_36px]" />
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

