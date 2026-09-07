import React from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { FixedMobileHeader } from './FixedMobileHeader';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileBottomNav } from './MobileBottomNav';

export { FixedMobileHeader } from './FixedMobileHeader';
export { DesktopNavbar } from './DesktopNavbar';
export { MobileBottomNav } from './MobileBottomNav';

interface GlassNavbarProps {
  includeBottomNav?: boolean;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  includeBottomNav = true,
}) => {
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
    <>
      {/* Viewport-Fixed Mobile Top Glass Header */}
      <FixedMobileHeader onSelectSection={scrollToId} />

      {/* Viewport-Fixed Desktop Top Navigation Bar */}
      <DesktopNavbar
        activeSection={activeSection}
        onSelectSection={scrollToId}
      />

      {/* Viewport-Fixed Mobile Bottom Navigation Dock */}
      {includeBottomNav && (
        <MobileBottomNav
          activeSection={activeSection}
          onSelectSection={scrollToId}
        />
      )}
    </>
  );
};
