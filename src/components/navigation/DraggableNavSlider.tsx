import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { NavItem } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

export interface DraggableNavSliderProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  className?: string;
}

export const DraggableNavSlider: React.FC<DraggableNavSliderProps> = ({
  activeSection,
  onSelectSection,
  className = '',
}) => {
  const { isLight } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Find index of current active section
  const currentActiveIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeSection)
  );

  // Dragging and animation state
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgressIndex, setDragProgressIndex] = useState<number | null>(null);
  const [reflectionPos, setReflectionPos] = useState<{ x: number; y: number } | null>(null);

  // Pill coordinates (left, width)
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Refs for tracking drag physics
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

  // Wheel accumulation for trackpads
  const wheelAccumulatorRef = useRef(0);
  const wheelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure and update the liquid glass pill position
  const updatePillPosition = useCallback(
    (fractionalIndex: number) => {
      const items = itemRefs.current;
      const track = trackRef.current;
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

      // Ensure active item is scrolled into view in compact containers
      if (items[Math.round(clampedIndex)]) {
        const activeEl = items[Math.round(clampedIndex)];
        if (activeEl) {
          const trackScrollLeft = track.scrollLeft;
          const trackWidth = track.clientWidth;
          const elLeft = activeEl.offsetLeft;
          const elWidth = activeEl.offsetWidth;

          if (elLeft < trackScrollLeft + 20) {
            track.scrollTo({ left: Math.max(0, elLeft - 20), behavior: 'smooth' });
          } else if (elLeft + elWidth > trackScrollLeft + trackWidth - 20) {
            track.scrollTo({ left: elLeft + elWidth - trackWidth + 20, behavior: 'smooth' });
          }
        }
      }
    },
    []
  );

  // Update pill position when activeSection changes and not dragging
  useEffect(() => {
    if (!isDragging) {
      updatePillPosition(currentActiveIndex);
    }
  }, [currentActiveIndex, isDragging, updatePillPosition]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      updatePillPosition(isDragging && dragProgressIndex !== null ? dragProgressIndex : currentActiveIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentActiveIndex, dragProgressIndex, isDragging, updatePillPosition]);

  // Pointer Down Handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button
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

    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      setReflectionPos({ x: startX - rect.left, y: startY - rect.top });
    }
  };

  // Pointer Move & Drag Handling
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragStartRef.current;
      if (!drag) return;

      const currentX = e.clientX;
      const currentY = e.clientY;
      const now = performance.now();

      const deltaX = currentX - drag.startX;
      const deltaY = currentY - drag.startY;

      // Track velocity
      const dt = now - drag.lastTime;
      if (dt > 0) {
        drag.velocity = (currentX - drag.lastX) / dt;
      }
      drag.lastX = currentX;
      drag.lastTime = now;

      // Check drag threshold (6px) to distinguish click vs drag
      if (!drag.hasExceededThreshold) {
        if (Math.abs(deltaX) > 6) {
          drag.hasExceededThreshold = true;
          setIsDragging(true);
        } else if (Math.abs(deltaY) > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
          // User is attempting vertical page scroll, cancel horizontal hijack
          dragStartRef.current = null;
          setIsDragging(false);
          return;
        }
      }

      if (drag.hasExceededThreshold) {
        // Prevent default text selection during active drag
        e.preventDefault();

        // Calculate step sensitivity based on track item widths (~55px per section)
        const stepPx = 52;
        // User request specification:
        // "Home -> drag toward the right -> moves through Home -> About -> Experience -> Skills..."
        // Right drag (deltaX > 0) advances index forward!
        const rawOffset = deltaX / stepPx;
        let virtualIndex = drag.startIndex + rawOffset;

        // Subtle elastic resistance at bounds
        const maxIndex = NAV_ITEMS.length - 1;
        if (virtualIndex < 0) {
          virtualIndex = -Math.pow(Math.abs(virtualIndex), 0.7) * 0.35;
        } else if (virtualIndex > maxIndex) {
          virtualIndex = maxIndex + Math.pow(virtualIndex - maxIndex, 0.7) * 0.35;
        }

        const clampedVirtual = Math.max(0, Math.min(maxIndex, virtualIndex));
        setDragProgressIndex(clampedVirtual);
        updatePillPosition(clampedVirtual);

        // Reflection highlight position
        if (trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          setReflectionPos({ x: currentX - rect.left, y: currentY - rect.top });
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const drag = dragStartRef.current;
      if (!drag) return;

      if (drag.hasExceededThreshold) {
        // Momentum calculation
        let targetIndex = drag.startIndex + (e.clientX - drag.startX) / 52;

        // Add momentum flick if velocity is high
        if (Math.abs(drag.velocity) > 0.4) {
          targetIndex += drag.velocity > 0 ? 0.7 : -0.7;
        }

        const snappedIndex = Math.max(0, Math.min(NAV_ITEMS.length - 1, Math.round(targetIndex)));
        const targetItem = NAV_ITEMS[snappedIndex];

        // Smoothly snap to final section
        setDragProgressIndex(null);
        setIsDragging(false);
        updatePillPosition(snappedIndex);

        if (targetItem) {
          onSelectSection(targetItem.id);
        }
      } else {
        // Was a simple click/tap - reset dragging states
        setIsDragging(false);
        setDragProgressIndex(null);
      }

      dragStartRef.current = null;
      setReflectionPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [onSelectSection, updatePillPosition]);

  // Trackpad / Horizontal Wheel Support
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Check if horizontal delta exists (trackpad swipe or shift+wheel)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
      e.preventDefault();
      wheelAccumulatorRef.current += e.deltaX;

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);

      wheelTimerRef.current = setTimeout(() => {
        const threshold = 40;
        if (Math.abs(wheelAccumulatorRef.current) > threshold) {
          const step = wheelAccumulatorRef.current > 0 ? 1 : -1;
          const nextIndex = Math.max(0, Math.min(NAV_ITEMS.length - 1, currentActiveIndex + step));
          onSelectSection(NAV_ITEMS[nextIndex].id);
        }
        wheelAccumulatorRef.current = 0;
      }, 60);
    }
  };

  // Normal Click on Item
  const handleItemClick = (e: React.MouseEvent, item: NavItem, idx: number) => {
    // If we just finished a drag, ignore click
    if (dragStartRef.current?.hasExceededThreshold) {
      e.preventDefault();
      return;
    }
    onSelectSection(item.id);
  };

  const displayedActiveIndex =
    isDragging && dragProgressIndex !== null ? Math.round(dragProgressIndex) : currentActiveIndex;

  return (
    <div
      id="draggable-section-slider-wrapper"
      className={`relative select-none touch-pan-y ${className}`}
    >
      {/* Outer Tactile Glass Slider Track */}
      <div
        ref={trackRef}
        id="draggable-nav-track"
        onPointerDown={handlePointerDown}
        onWheel={handleWheel}
        className={`relative flex items-center gap-1 p-1 rounded-2xl overflow-x-auto scrollbar-none transition-all duration-300 ${
          isDragging
            ? 'cursor-grabbing scale-[0.99] shadow-inner'
            : 'cursor-grab hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
        } ${
          isLight
            ? 'bg-slate-200/65 border border-slate-300/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]'
            : 'bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
        }`}
        style={{
          touchAction: 'pan-y',
        }}
        title="Click or drag horizontally to navigate between portfolio sections"
      >
        {/* Dynamic Specular Light Reflection following the pointer during drag */}
        {reflectionPos && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-150"
            style={{
              background: `radial-gradient(circle 90px at ${reflectionPos.x}px ${reflectionPos.y}px, ${
                isLight ? 'rgba(2, 132, 199, 0.18)' : 'rgba(56, 189, 248, 0.22)'
              }, transparent 70%)`,
            }}
          />
        )}

        {/* Sliding Liquid Glass Indicator Pill */}
        <div
          id="liquid-glass-nav-pill"
          aria-hidden="true"
          className={`absolute top-1 bottom-1 rounded-xl pointer-events-none transition-all ${
            isDragging ? 'duration-75 scale-[1.02]' : 'duration-300 ease-out'
          } ${
            isLight
              ? 'bg-white text-sky-700 border border-sky-400/40 shadow-[0_4px_16px_rgba(2,132,199,0.18),0_1px_2px_rgba(0,0,0,0.06)]'
              : 'bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
          }`}
          style={{
            transform: `translateX(${pillStyle.left}px)`,
            width: `${pillStyle.width}px`,
            left: 0,
          }}
        >
          {/* Specular Top Glimmer Line on Pill */}
          <div
            aria-hidden="true"
            className={`absolute top-0 inset-x-0 h-[1px] rounded-t-xl bg-gradient-to-r from-transparent via-white/80 dark:via-cyan-300/80 to-transparent pointer-events-none`}
          />
        </div>

        {/* Navigation Items (Buttons) */}
        {NAV_ITEMS.map((item, idx) => {
          const isItemActive = displayedActiveIndex === idx;
          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              id={`nav-slider-btn-${item.id}`}
              type="button"
              onClick={(e) => handleItemClick(e, item, idx)}
              className={`relative z-10 px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isItemActive
                  ? isLight
                    ? 'text-sky-700 font-bold'
                    : 'text-cyan-200 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.03]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subtle tactile drag affordance cues on the sides */}
      <div
        aria-hidden="true"
        className="hidden md:flex items-center justify-between px-2 pt-1 text-[9px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 light:text-slate-400 pointer-events-none opacity-60"
      >
        <span className="flex items-center gap-0.5">
          <span>◀</span> Drag or click
        </span>
        <span className="text-[10px] font-bold text-cyan-500/80 dark:text-cyan-400 light:text-sky-600">
          {NAV_ITEMS[displayedActiveIndex]?.label}
        </span>
        <span className="flex items-center gap-0.5">
          Release to snap <span>▶</span>
        </span>
      </div>
    </div>
  );
};
