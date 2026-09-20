import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Grid3X3,
  Cpu,
  GraduationCap,
  Award,
  Trophy,
  Mail,
  X,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { profileData } from '../../data/profile';

interface MobileBottomNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

interface PrimaryNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string;
}

const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: 'hero', label: 'Home', icon: Home, targetId: 'hero' },
  { id: 'about', label: 'About', icon: User, targetId: 'about' },
  { id: 'experience', label: 'Exp', icon: Briefcase, targetId: 'experience' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, targetId: 'projects' },
  { id: 'more', label: 'More', icon: Grid3X3, targetId: 'more' },
];

interface MoreNavItem {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MORE_NAV_ITEMS: MoreNavItem[] = [
  {
    id: 'skills',
    label: 'Skills',
    sublabel: 'Technical Matrix & Competencies',
    icon: Cpu,
    badge: '18+ Skills',
  },
  {
    id: 'education',
    label: 'Education',
    sublabel: 'B.Tech IT, MGM University',
    icon: GraduationCap,
    badge: '8.45 CGPA',
  },
  {
    id: 'certifications',
    label: 'Certifications',
    sublabel: 'NPTEL & Deep Learning AI',
    icon: Award,
    badge: 'Verified',
  },
  {
    id: 'achievements',
    label: 'Achievements',
    sublabel: 'Smart City Hackathons & Awards',
    icon: Trophy,
    badge: 'National',
  },
  {
    id: 'contact',
    label: 'Contact',
    sublabel: 'Direct Inquiry & Collaboration',
    icon: Mail,
    badge: 'Active',
  },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { isLight } = useTheme();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgressIndex, setDragProgressIndex] = useState<number | null>(null);
  const [reflectionPos, setReflectionPos] = useState<{ x: number; y: number } | null>(null);

  // Check if current active section is inside the "More" items
  const isMoreItemActive = MORE_NAV_ITEMS.some((item) => item.id === activeSection);
  const activeMoreItem = MORE_NAV_ITEMS.find((item) => item.id === activeSection);

  // Map activeSection into target item index (0 to 4)
  const getActiveIndex = useCallback((): number => {
    if (isMoreOpen || isMoreItemActive) {
      return 4; // More item
    }
    const idx = PRIMARY_NAV_ITEMS.findIndex((item) => item.targetId === activeSection);
    return idx >= 0 ? idx : 0;
  }, [activeSection, isMoreItemActive, isMoreOpen]);

  const currentActiveIndex = getActiveIndex();

  // Container and Button Element References
  const dockTrackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sliding Liquid Glass Pill State
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Drag physics tracking
  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    startTime: number;
    startIndex: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    hasExceededThreshold: boolean;
  } | null>(null);

  // Calculate and smoothly position the liquid glass slider pill
  const updatePillPosition = useCallback(
    (fractionalIndex: number) => {
      const items = itemRefs.current;
      const track = dockTrackRef.current;
      if (!track || items.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(items.length - 1, fractionalIndex));
      const floorIdx = Math.floor(clampedIndex);
      const ceilIdx = Math.min(items.length - 1, Math.ceil(clampedIndex));
      const ratio = clampedIndex - floorIdx;

      const floorEl = items[floorIdx];
      const ceilEl = items[ceilIdx];

      if (!floorEl) return;

      const floorLeft = floorEl.offsetLeft;
      const floorWidth = floorEl.offsetWidth;

      if (floorIdx === ceilIdx || !ceilEl) {
        setPillStyle({ left: floorLeft, width: floorWidth });
      } else {
        const ceilLeft = ceilEl.offsetLeft;
        const ceilWidth = ceilEl.offsetWidth;
        const interpolatedLeft = floorLeft + (ceilLeft - floorLeft) * ratio;
        const interpolatedWidth = floorWidth + (ceilWidth - floorWidth) * ratio;
        setPillStyle({ left: interpolatedLeft, width: interpolatedWidth });
      }
    },
    []
  );

  // Synchronize pill position with activeSection changes when not dragging
  useEffect(() => {
    if (!isDragging) {
      updatePillPosition(currentActiveIndex);
    }
  }, [currentActiveIndex, isDragging, updatePillPosition]);

  // Recalculate on window resize / orientation change
  useEffect(() => {
    const handleResize = () => {
      updatePillPosition(isDragging && dragProgressIndex !== null ? dragProgressIndex : currentActiveIndex);
    };
    window.addEventListener('resize', handleResize);
    // Initial mount calculation
    const timer = setTimeout(handleResize, 50);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [currentActiveIndex, dragProgressIndex, isDragging, updatePillPosition]);

  // Close "More" sheet on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle tap on item
  const handleSelect = (targetId: string) => {
    if (targetId === 'more') {
      setIsMoreOpen((prev) => !prev);
    } else {
      setIsMoreOpen(false);
      onSelectSection(targetId);
    }

    // Gentle tactile feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Safe fallback
      }
    }
  };

  // POINTER / TOUCH DRAGGING ENGINE
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startTime = performance.now();

    dragStartRef.current = {
      startX,
      startY,
      startTime,
      startIndex: currentActiveIndex,
      lastX: startX,
      lastTime: startTime,
      velocity: 0,
      hasExceededThreshold: false,
    };

    if (dockTrackRef.current) {
      const rect = dockTrackRef.current.getBoundingClientRect();
      setReflectionPos({ x: startX - rect.left, y: startY - rect.top });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !dockTrackRef.current) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const currentTime = performance.now();

    const deltaX = currentX - dragStartRef.current.startX;
    const deltaY = currentY - dragStartRef.current.startY;

    // Check drag threshold
    if (!dragStartRef.current.hasExceededThreshold) {
      // Must be predominantly horizontal swipe to trigger slider drag
      if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        dragStartRef.current.hasExceededThreshold = true;
        setIsDragging(true);
        window.dispatchEvent(new CustomEvent('portfolio:navigation-drag', { detail: true }));

        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          // Fallback
        }
      } else {
        return;
      }
    }

    // Calculate instantaneous velocity for inertia
    const dt = Math.max(1, currentTime - dragStartRef.current.lastTime);
    const dx = currentX - dragStartRef.current.lastX;
    dragStartRef.current.velocity = dx / dt;
    dragStartRef.current.lastX = currentX;
    dragStartRef.current.lastTime = currentTime;

    // Determine fractional index based on pointer position within the track
    const rect = dockTrackRef.current.getBoundingClientRect();
    const relativeX = currentX - rect.left;
    setReflectionPos({ x: relativeX, y: currentY - rect.top });

    const items = itemRefs.current;
    if (items.length === 0) return;

    // Find closest item centers and interpolate smoothly
    let calculatedIndex = 0;
    const itemCenters = items.map((item) => {
      if (!item) return 0;
      return item.offsetLeft + item.offsetWidth / 2;
    });

    if (relativeX <= itemCenters[0]) {
      calculatedIndex = 0;
    } else if (relativeX >= itemCenters[itemCenters.length - 1]) {
      calculatedIndex = itemCenters.length - 1;
    } else {
      for (let i = 0; i < itemCenters.length - 1; i++) {
        const c1 = itemCenters[i];
        const c2 = itemCenters[i + 1];
        if (relativeX >= c1 && relativeX <= c2) {
          const ratio = (relativeX - c1) / (c2 - c1);
          calculatedIndex = i + ratio;
          break;
        }
      }
    }

    const clampedFractional = Math.max(0, Math.min(PRIMARY_NAV_ITEMS.length - 1, calculatedIndex));
    setDragProgressIndex(clampedFractional);
    updatePillPosition(clampedFractional);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    try {
      if (dockTrackRef.current && dockTrackRef.current.hasPointerCapture(e.pointerId)) {
        dockTrackRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Safe fallback
    }

    const hadExceededThreshold = dragStartRef.current.hasExceededThreshold;
    const velocity = dragStartRef.current.velocity;
    const finalDragIndex = dragProgressIndex !== null ? dragProgressIndex : currentActiveIndex;

    dragStartRef.current = null;
    setIsDragging(false);
    window.dispatchEvent(new CustomEvent('portfolio:navigation-drag', { detail: false }));
    setDragProgressIndex(null);
    setReflectionPos(null);

    // If it was a drag gesture, apply velocity inertia & snap
    if (hadExceededThreshold) {
      let projectedIndex = finalDragIndex + velocity * 0.18;
      projectedIndex = Math.max(0, Math.min(PRIMARY_NAV_ITEMS.length - 1, projectedIndex));
      const snapIndex = Math.round(projectedIndex);

      updatePillPosition(snapIndex);

      if (snapIndex >= 0 && snapIndex < PRIMARY_NAV_ITEMS.length) {
        const target = PRIMARY_NAV_ITEMS[snapIndex];
        handleSelect(target.targetId);
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    try {
      if (dockTrackRef.current && dockTrackRef.current.hasPointerCapture(e.pointerId)) {
        dockTrackRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Safe fallback
    }
    dragStartRef.current = null;
    setIsDragging(false);
    window.dispatchEvent(new CustomEvent('portfolio:navigation-drag', { detail: false }));
    setDragProgressIndex(null);
    setReflectionPos(null);
    updatePillPosition(currentActiveIndex);
  };

  return (
    <>
      {/* "MORE" SHEET / FLOATING LIQUID GLASS PANEL */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            {/* Ambient Backdrop Overlay with Gaussian Blur */}
            <motion.div
              id="mobile-more-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMoreOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
              style={{ touchAction: 'none' }}
              aria-hidden="true"
            />

            {/* Floating Liquid Glass Sheet */}
            <motion.div
              id="mobile-more-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="More Portfolio Sections"
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className={`md:hidden fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-6 mx-auto max-w-md z-50 rounded-xl overflow-hidden transition-colors duration-300 ${
                isLight
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-lg'
                  : 'bg-slate-950/95 text-white border border-slate-800 shadow-lg'
              }`}
              style={{
                
              }}
            >
              {/* Specular Top Glimmer Line */}
              <div
                aria-hidden="true"
                className={`absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent ${
                  isLight ? 'via-white/90' : 'via-cyan-300/80'
                } to-transparent`}
              />

              {/* Sheet Header */}
              <div className="px-5 pt-4 pb-3 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isLight
                        ? 'bg-sky-50 text-sky-600 border border-sky-200'
                        : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">More Destinations</h3>
                    <p
                      className={`text-[11px] font-mono -mt-0.5 ${
                        isLight ? 'text-slate-500' : 'text-neutral-400'
                      }`}
                    >
                      Secondary Portfolio Sections
                    </p>
                  </div>
                </div>

                <button
                  id="close-more-sheet-btn"
                  type="button"
                  onClick={() => setIsMoreOpen(false)}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300'
                  }`}
                  aria-label="Close navigation sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Items List */}
              <div className="p-3 space-y-1.5 max-h-[50vh] overflow-y-auto overscroll-contain">
                {MORE_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      id={`mobile-more-item-${item.id}`}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer text-left active:scale-[0.98] ${
                        isActive
                          ? isLight
                            ? 'bg-slate-50 border border-slate-300'
                            : 'bg-cyan-500/15 border border-cyan-500/40 '
                          : isLight
                          ? 'bg-white/50 hover:bg-white/80 border border-slate-200/60'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? isLight
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-900 text-white'
                              : isLight
                              ? 'bg-white text-slate-700 border border-slate-200 shadow-xs'
                              : 'bg-white/[0.06] text-neutral-300 border border-white/[0.08]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold tracking-tight truncate ${
                                isActive
                                  ? isLight
                                    ? 'text-slate-900'
                                    : 'text-white'
                                  : isLight
                                  ? 'text-slate-800'
                                  : 'text-neutral-200'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                                  isActive
                                    ? isLight
                                      ? 'bg-sky-200/70 text-sky-800'
                                      : 'bg-cyan-500/30 text-cyan-200'
                                    : isLight
                                    ? 'bg-slate-200/70 text-slate-600'
                                    : 'bg-white/[0.08] text-neutral-400'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs truncate ${
                              isLight ? 'text-slate-500' : 'text-neutral-400'
                            }`}
                          >
                            {item.sublabel}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? isLight
                              ? 'text-sky-600 translate-x-0.5'
                              : 'text-cyan-400 translate-x-0.5'
                            : isLight
                            ? 'text-slate-400'
                            : 'text-neutral-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Actions: Resume & Social Links */}
              <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-2">
                <a
                  id="mobile-more-resume-btn"
                  href="/Ved_Dhanokar_Resume1.pdf"
                  download="Ved_Dhanokar_Resume1.pdf"
                  onClick={() => setIsMoreOpen(false)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    isLight
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume (ATS PDF)</span>
                </a>

                <a
                  id="mobile-more-direct-email-btn"
                  href={profileData.socials.email}
                  className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 border-white/[0.08]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FIXED FLOATING LIQUID GLASS MOBILE BOTTOM NAVIGATION DOCK (SLIDER) */}
      <nav
        id="mobile-bottom-navigation-dock"
        aria-label="Mobile portfolio navigation slider"
        className="md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-0 right-0 mx-auto w-[calc(100%-1.5rem)] max-w-md z-40 select-none"
        style={{
          touchAction: 'none',
        }}
      >
        {/* Outer Liquid Glass Dock Container (Tier 1 Primary Glass) */}
        <div
          ref={dockTrackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="relative rounded-3xl p-1.5 glass-struct glass-specular glass-mobile-surface cursor-grab active:cursor-grabbing touch-none"
          style={{
            
          }}
        >

          {/* Dynamic Light Refraction Glow while dragging */}
          {isDragging && reflectionPos && (
            <div
              aria-hidden="true"
              className="absolute pointer-events-none rounded-full w-24 h-12 -translate-x-1/2 -translate-y-1/2 blur-lg opacity-70 transition-opacity"
              style={{
                left: `${reflectionPos.x}px`,
                top: `${reflectionPos.y}px`,
                background: isLight
                  ? 'none'
                  : 'none',
              }}
            />
          )}

          {/* Micro Top Notch / Affordance Pill */}
          <div
            aria-hidden="true"
            className="flex justify-center -mt-0.5 mb-1 pointer-events-none"
          >
            <div
              className={`w-7 h-1 rounded-full transition-all duration-200 ${
                isDragging
                  ? isLight ? 'bg-slate-400 scale-x-125' : 'bg-slate-500 scale-x-125'
                  : isLight
                  ? 'bg-slate-300/80'
                  : 'bg-white/20'
              }`}
            />
          </div>

          {/* THE PHYSICAL SLIDING LIQUID GLASS PILL (Moves smoothly between all 5 items) */}
          <div
            id="mobile-slider-active-pill"
            aria-hidden="true"
            className={`absolute top-1.5 bottom-1.5 rounded-2xl pointer-events-none z-0 transition-transform duration-200 ${
              isDragging ? 'scale-105 shadow-lg' : ''
            } ${
              isLight
                ? 'bg-white border border-slate-300 shadow-sm'
                : 'bg-slate-700 border border-slate-600'
            }`}
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: isDragging
                ? 'none'
                : 'left 0.32s cubic-bezier(0.16, 1, 0.3, 1), width 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease',
            }}
          >
            {/* Specular Rim Highlight on Top of Active Pill */}
            <div
              className={`absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent ${
                isLight ? 'via-white/95' : 'via-cyan-200/90'
              } to-transparent pointer-events-none`}
            />
          </div>

          {/* Navigation Items Track (Grid of 5 items) */}
          <div className="relative z-10 grid grid-cols-5 items-center gap-0 w-full h-[52px]">
            {PRIMARY_NAV_ITEMS.map((item, index) => {
              const isTargetActive =
                index === 4
                  ? isMoreOpen || isMoreItemActive
                  : activeSection === item.targetId;
              // Dragging only moves the pill. Keep the selected item active
              // until release so intermediate destinations never flash.
              const isItemVisualActive = isTargetActive;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  id={`mobile-nav-tab-${item.id}`}
                  type="button"
                  onClick={() => handleSelect(item.targetId)}
                  className={`relative flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-200 cursor-pointer ${
                    isItemVisualActive
                      ? isLight
                        ? 'text-slate-900'
                        : 'text-white'
                      : isLight
                      ? 'text-slate-500 hover:text-slate-800'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label={
                    index === 4
                      ? 'Open more portfolio sections'
                      : `Navigate to ${item.label}`
                  }
                  aria-current={isTargetActive ? 'page' : undefined}
                >
                  {/* Icon with active glow */}
                  <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
                    <Icon
                      strokeWidth={2.2}
                      className={`w-[22px] h-[22px] transition-transform duration-200 ${
                        isItemVisualActive
                          ? 'scale-110'
                          : ''
                      }`}
                    />
                    {/* Active dot for "More" item when a secondary section is active */}
                    {index === 4 && isMoreItemActive && !isMoreOpen && (
                      <span
                        className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ${
                          isLight
                            ? 'bg-slate-900 ring-white'
                            : 'bg-slate-900 dark:bg-white ring-white dark:ring-slate-950'
                        } animate-pulse`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] leading-none tracking-tight mt-1 mb-0.5 transition-all duration-200 whitespace-nowrap text-center ${
                      isItemVisualActive ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {index === 4 && isMoreItemActive && !isMoreOpen
                      ? activeMoreItem?.label || 'More'
                      : item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

