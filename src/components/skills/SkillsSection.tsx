import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { skillCategories } from '../../data/skills';
import { GlassContainer } from '../primitives/GlassContainer';
import { GhostWord } from '../primitives/GhostWord';

/* ─────────────────────────────────────────────────────────────────────────────
   Skills — scroll-driven technical showcase.

   Architecture (fixed): a tall scroll track maps scroll progress to exactly
   ONE active category index. The stage is pinned with `position: sticky` and
   swaps scenes through `AnimatePresence mode="wait"` — the outgoing scene
   fully exits BEFORE the next one mounts, so scenes can never overlap or
   stack. No percentages, no progress bars, no dashboard UI.

   Each category keeps its own accent color, used only on small details
   (index numbers, kicker rules, indicator bars). The panel background is a
   subtle code-editor-inspired texture in dark mode and a warm neutral in
   light mode. Reduced motion: no pinning — plain stacked blocks with a
   one-shot fade.
   ────────────────────────────────────────────────────────────────────────────*/

type Accent = { light: string; dark: string };

const CATEGORY_ACCENTS: Accent[] = [
  { light: '#0d9488', dark: '#2dd4bf' }, // Programming Languages — teal
  { light: '#ea580c', dark: '#fb923c' }, // Frontend & Backend — orange
  { light: '#dc2626', dark: '#f87171' }, // Databases — red
  { light: '#2563eb', dark: '#60a5fa' }, // Developer Tools & DevOps — blue
  { light: '#9333ea', dark: '#c084fc' }, // Machine Learning / Deep Learning — purple
  { light: '#0891b2', dark: '#22d3ee' }, // NLP / Generative AI — cyan
];

const SCENE_TRANSITION = { duration: 0.38, ease: [0.32, 0.72, 0, 1] as const };

/* hex → rgba with alpha, for faint accent tints on hairlines */
const withAlpha = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/* Muted syntax-highlight tones (from the reference photo, heavily dimmed).
   Used ONLY as blurred decorative streaks/washes in the dark backdrop —
   they evoke the photo's glowing code without readable glyphs or neon. */
const TOKEN_COLORS = [
  '#9d7bd8', // purple (keywords)
  '#d9b13b', // yellow (strings)
  '#d9824a', // orange
  '#5b8fd9', // blue
  '#4fb3c4', // cyan
  '#6fae6f', // green
  '#c96a6a', // red
  '#dcdfe6', // silver-white (plain text)
];

/* Blurred horizontal "lines of code" — staggered indents and widths like a
   macro shot of a screen. Heavily blurred so they read as atmosphere. */
const CODE_STREAKS: Array<{
  top: number; left: number; w: number; h: number; c: number; o: number;
}> = [
  { top: 5, left: 8, w: 300, h: 7, c: 0, o: 0.14 },
  { top: 10, left: 20, w: 180, h: 6, c: 1, o: 0.12 },
  { top: 16, left: 6, w: 250, h: 7, c: 7, o: 0.09 },
  { top: 23, left: 26, w: 150, h: 6, c: 4, o: 0.12 },
  { top: 30, left: 10, w: 330, h: 7, c: 0, o: 0.09 },
  { top: 37, left: 21, w: 210, h: 6, c: 6, o: 0.1 },
  { top: 44, left: 7, w: 270, h: 7, c: 7, o: 0.08 },
  { top: 51, left: 17, w: 190, h: 6, c: 1, o: 0.11 },
  { top: 58, left: 9, w: 290, h: 7, c: 3, o: 0.1 },
  { top: 66, left: 24, w: 160, h: 6, c: 4, o: 0.11 },
  { top: 73, left: 11, w: 310, h: 7, c: 0, o: 0.08 },
  { top: 81, left: 19, w: 200, h: 6, c: 5, o: 0.1 },
  { top: 89, left: 8, w: 240, h: 7, c: 3, o: 0.09 },
];

/* Large soft color washes — the photo's out-of-focus bright patches. */
const CODE_GLOWS: Array<{
  top: number; left: number; size: number; c: number; o: number;
}> = [
  { top: 6, left: 10, size: 340, c: 0, o: 0.07 },
  { top: 38, left: 72, size: 300, c: 4, o: 0.06 },
  { top: 68, left: 16, size: 320, c: 2, o: 0.05 },
  { top: 24, left: 46, size: 260, c: 3, o: 0.045 },
  { top: 84, left: 60, size: 280, c: 1, o: 0.045 },
];

/* ── One category's focused composition ─────────────────────────────────── */

const SceneContent: React.FC<{
  category: (typeof skillCategories)[number];
  idx: number;
  total: number;
  accent: string;
}> = ({ category, idx, total, accent }) => (
  <div className="flex h-full flex-col justify-center py-6 sm:py-8">
    {/* Kicker row: accent index + rule + editor-style breadcrumb + position */}
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-semibold sm:text-sm" style={{ color: accent }}>
        {String(idx + 1).padStart(2, '0')}
      </span>
      <span
        aria-hidden
        className="h-px w-10 shrink-0 sm:w-14"
        style={{ backgroundColor: accent, opacity: 0.55 }}
      />
      <span className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-neutral-500 sm:text-[11px]">
        ~/stack/{category.id}
      </span>
      <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-slate-400 dark:text-neutral-600 sm:block">
        {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>

    {/* Title block with a thin accent spine */}
    <div className="mt-4 flex items-stretch gap-3 sm:mt-5 sm:gap-4">
      <span
        aria-hidden
        className="w-1 shrink-0 rounded-full"
        style={{ backgroundColor: accent, opacity: 0.85 }}
      />
      <div className="min-w-0">
        <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
          {category.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base dark:text-neutral-400">
          {category.description}
        </p>
      </div>
    </div>

    {/* Technology index — numbered list, thin separators */}
    <ul className="mt-6 grid grid-cols-2 gap-x-5 sm:mt-8 sm:gap-x-10 lg:grid-cols-3">
      {category.skills.map((skill, i) => (
        <li
          key={skill}
          className="flex items-baseline gap-2.5 border-b py-2 sm:gap-3 sm:py-2.5"
          style={{ borderBottomColor: withAlpha(accent, 0.22) }}
        >
          <span
            className="font-mono text-[10px] sm:text-xs"
            style={{ color: accent, opacity: 0.9 }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 text-sm font-medium text-slate-800 sm:text-lg dark:text-neutral-200">
            {skill}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/* ── Desktop chapter rail: persistent orientation, passive indicator ─────── */

const CategoryRail: React.FC<{
  active: number;
  isDark: boolean;
  onSelect: (i: number) => void;
}> = ({ active, isDark, onSelect }) => (
  <nav aria-label="Technical categories" className="hidden self-center lg:block">
    <ul className="space-y-1">
      {skillCategories.map((c, i) => {
        const isActive = i === active;
        const accent = isDark ? CATEGORY_ACCENTS[i].dark : CATEGORY_ACCENTS[i].light;
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? 'true' : undefined}
              title={c.title}
              className={`group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors ${
                isActive
                  ? 'bg-slate-900/[0.04] dark:bg-white/[0.04]'
                  : 'hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              <span
                aria-hidden
                className="h-3.5 w-[2px] shrink-0 rounded-full transition-opacity duration-200"
                style={{ backgroundColor: accent, opacity: isActive ? 1 : 0.25 }}
              />
              <span
                className={`truncate font-mono text-[11px] tracking-wide transition-colors ${
                  isActive
                    ? 'font-semibold text-slate-900 dark:text-white'
                    : 'text-slate-500 group-hover:text-slate-700 dark:text-neutral-500 dark:group-hover:text-neutral-300'
                }`}
              >
                {c.title}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

/* ── Section ─────────────────────────────────────────────────────────────── */

export const SkillsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const total = skillCategories.length;

  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  );

  // Track theme flips (ThemeContext toggles root classes / data-theme).
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Active category index (0..total-1). Primary driver: rAF-throttled scroll/
  // resize listener computing the index from geometry. Safety net:
  // IntersectionObserver over one sentinel segment per category (compositor-
  // driven, catches cases where scroll events are missed). Both compute the
  // identical index, so whichever fires first wins with the same result.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const computeIdx = () => {
      const el = trackRef.current;
      if (!el) return -1;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      return Math.min(total - 1, Math.floor(p * total));
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const idx = computeIdx();
        if (idx >= 0) setActive((prev) => (prev === idx ? prev : idx));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const el = trackRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      const segments = el.querySelectorAll<HTMLElement>('[data-segment]');
      // Align sentinel geometry with the listener's mapping: scene i owns
      // scrollable/6 px of scroll, so segment i spans that exact track range
      // and the IO band sits at the viewport's top edge — both drivers then
      // switch scenes at the same instants by construction.
      const position = () => {
        const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
        const segH = scrollable / total;
        segments.forEach((s, i) => {
          s.style.top = `${i * segH}px`;
          s.style.height = `${segH}px`;
        });
      };
      position();
      window.addEventListener('resize', position);
      io = new IntersectionObserver(
        (entries) => {
          let best = -1;
          let bestDist = Infinity;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const i = Number((entry.target as HTMLElement).dataset.segment);
            const rect = entry.boundingClientRect;
            const dist = Math.abs(rect.top + rect.height / 2);
            if (dist < bestDist) {
              bestDist = dist;
              best = i;
            }
          }
          if (best >= 0) setActive((prev) => (prev === best ? prev : best));
        },
        // Thin detection band hugging the viewport's top edge — the same
        // reference line the listener's progress math uses.
        { rootMargin: '0px 0px -98% 0px', threshold: 0 },
      );
      segments.forEach((s) => io!.observe(s));
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io?.disconnect();
    };
  }, [shouldReduceMotion, total]);

  const jumpToCategory = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const step = el.offsetHeight / total;
      const top =
        window.scrollY + el.getBoundingClientRect().top + i * step + step * 0.4;
      window.scrollTo({ top, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    },
    [shouldReduceMotion, total],
  );

  const accentFor = (i: number) =>
    isDark ? CATEGORY_ACCENTS[i].dark : CATEGORY_ACCENTS[i].light;

  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24">
      <GlassContainer size="lg">
        <div className="relative overflow-clip rounded-2xl border border-slate-200 bg-[#faf9f7] shadow-sm dark:border-white/[0.06] dark:bg-[#0a0c10]">
          {/* Code-editor backdrop — decorative, behind content, never
              interfering with readability: faint editor line-rules, indentation
              guides, near-invisible abstract "syntax tokens" (dark only), and a
              soft vignette for depth. All masked at the edges. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: isDark
                  ? 'repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(148,163,184,0.055) 23px, rgba(148,163,184,0.055) 24px)'
                  : 'repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(15,23,42,0.035) 23px, rgba(15,23,42,0.035) 24px)',
                maskImage:
                  'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
              }}
            />
            {/* Blurred code atmosphere — the reference photo's feel: glowing
                syntax streaks + out-of-focus color washes on near-black, no
                readable glyphs. Dark theme only; light stays clean. */}
            {isDark && (
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, transparent, black 9%, black 91%, transparent)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent, black 9%, black 91%, transparent)',
                }}
              >
                {CODE_GLOWS.map((g, i) => (
                  <span
                    key={`glow-${i}`}
                    className="absolute rounded-full"
                    style={{
                      top: `${g.top}%`,
                      left: `${g.left}%`,
                      width: `${g.size}px`,
                      height: `${g.size}px`,
                      backgroundColor: TOKEN_COLORS[g.c],
                      opacity: g.o,
                      filter: 'blur(72px)',
                    }}
                  />
                ))}
                {CODE_STREAKS.map((t, i) => (
                  <span
                    key={`streak-${i}`}
                    className="absolute rounded-full"
                    style={{
                      top: `${t.top}%`,
                      left: `${t.left}%`,
                      width: `${t.w}px`,
                      height: `${t.h}px`,
                      backgroundColor: TOKEN_COLORS[t.c],
                      opacity: t.o,
                      filter: 'blur(13px)',
                    }}
                  />
                ))}
                {/* Focus scrim — gently deepens the black behind the content
                    column so the atmosphere never competes with the text. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(56% 50% at 40% 47%, rgba(8,10,14,0.5) 0%, rgba(8,10,14,0.16) 58%, transparent 80%)',
                  }}
                />
              </div>
            )}
            {/* Indentation guides */}
            <div className="absolute inset-y-0 left-5 w-px bg-slate-900/[0.05] dark:bg-white/[0.05]" />
            <div className="absolute inset-y-0 left-12 w-px bg-slate-900/[0.03] dark:bg-white/[0.03]" />
            {/* Soft vignette for depth (dark only) — darkens edges, never the
                content area's contrast. */}
            {isDark && (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 90% at 50% 38%, transparent 40%, rgba(0,0,0,0.46) 100%)',
                }}
              />
            )}
          </div>

          {/* Section header — pill badge + ghost word, unified with contact */}
          <div className="relative mb-12 sm:mb-16">
            <GhostWord text="SKILLS" />
            <div className="relative">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <span aria-hidden className="relative flex size-2.5 items-center justify-center">
                    <span className="absolute inline-flex size-2.5 rounded-full border border-slate-500 dark:border-neutral-300" />
                    <span className="size-1 rounded-full bg-slate-600 dark:bg-neutral-200" />
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">
                    Technical Matrix
                  </span>
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                Categorized Technical Architecture
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-neutral-400">
                A verified inventory of programming languages, frameworks, database engines, and
                developer pipelines.
              </p>
            </div>
          </div>

          {/* Showcase body */}
          <div className="relative px-5 py-4 sm:px-10 sm:py-6">
            {shouldReduceMotion ? (
              // Reduced motion: no pinning — readable stacked blocks, one-shot fade.
              <div className="divide-y divide-slate-200 dark:divide-slate-800/70">
                {skillCategories.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.25 }}
                    className="py-10 sm:py-12"
                  >
                    <SceneContent
                      category={c}
                      idx={i}
                      total={total}
                      accent={accentFor(i)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                ref={trackRef}
                className="relative"
                style={{ height: `${total * 100}vh` }}
              >
                {/* One invisible sentinel per category — IO safety net uses
                    these to pick the single active scene (geometry is set to
                    match the scroll mapping at runtime). */}
                {skillCategories.map((c, i) => (
                  <div
                    key={c.id}
                    data-segment={i}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0"
                    style={{
                      top: `${(i * 100) / total}%`,
                      height: `${100 / total}%`,
                    }}
                  />
                ))}
                <div className="sticky top-[calc(4.5rem+env(safe-area-inset-top,0px))] h-[calc(100vh-7rem)]">
                  <div className="grid h-full grid-cols-1 items-center lg:grid-cols-[minmax(0,1fr)_180px] lg:gap-10">
                    {/* Exactly one scene mounted at a time. mode="wait" forces
                        the outgoing scene to finish exiting before the next
                        enters — overlap is structurally impossible. */}
                    <div className="h-full min-h-0 min-w-0">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={skillCategories[active].id}
                          data-skill-scene={skillCategories[active].id}
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -18 }}
                          transition={SCENE_TRANSITION}
                          className="h-full"
                        >
                          <SceneContent
                            category={skillCategories[active]}
                            idx={active}
                            total={total}
                            accent={accentFor(active)}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <CategoryRail
                      active={active}
                      isDark={isDark}
                      onSelect={jumpToCategory}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassContainer>
    </section>
  );
};
