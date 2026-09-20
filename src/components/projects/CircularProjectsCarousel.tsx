import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { cn } from '../../lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
   CircularProjectsCarousel
   Cards sit on an arc around a bright center card (badge · title · subtitle).
   Auto-advances every second: 1 → 2 → … → n → 1, looping forever.
   Auto-advance pauses while hovering the stage and is disabled entirely for
   users who prefer reduced motion (arrows/dots still work).
   ────────────────────────────────────────────────────────────────────────────*/

const AUTO_ADVANCE_MS = 1000;

interface CircularProjectsCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CircularProjectsCarousel: React.FC<CircularProjectsCarouselProps> = ({
  projects,
  onSelectProject,
}) => {
  const count = projects.length;
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spacing, setSpacing] = useState(240);

  // Responsive arc spacing (clamped so the fan never drives page overflow)
  useEffect(() => {
    const update = () =>
      setSpacing(Math.round(Math.min(300, Math.max(130, window.innerWidth * 0.24))));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-advance loop. `active` in deps resets the timer after manual jumps.
  useEffect(() => {
    if (paused || shouldReduceMotion || count < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, shouldReduceMotion, active, count]);

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count],
  );

  // Shortest signed distance on the ring, e.g. count=5 → offsets in [-2..2]
  const offsetOf = (i: number) => {
    const raw = (i - active + count) % count;
    return raw > count / 2 ? raw - count : raw;
  };

  const depthStyle = (absOffset: number) => {
    if (absOffset === 0) return { opacity: 1, scale: 1, zIndex: 30 };
    if (absOffset === 1) return { opacity: 0.55, scale: 0.92, zIndex: 20 };
    return { opacity: 0.28, scale: 0.85, zIndex: 10 };
  };

  const activeProject = projects[active];

  return (
    <div className="flex flex-col items-center">
      {/* ── Arc stage ── */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects carousel"
        className="relative h-[350px] w-full sm:h-[330px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {projects.map((project, i) => {
          const offset = offsetOf(i);
          const abs = Math.abs(offset);
          const depth = depthStyle(abs);
          const isActive = offset === 0;

          return (
            <div
              key={project.id}
              className="absolute top-0 left-1/2 w-[min(86vw,400px)] -translate-x-1/2"
              style={{ zIndex: depth.zIndex, pointerEvents: abs > 2 ? 'none' : 'auto' }}
            >
              <motion.div
                initial={false}
                animate={{
                  x: offset * spacing,
                  y: abs * 26,
                  rotate: offset * 7,
                  scale: depth.scale,
                  opacity: depth.opacity,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30, opacity: { duration: 0.35 } }}
                onClick={() => !isActive && goTo(i)}
                className={cn(
                  'flex h-[290px] cursor-pointer flex-col rounded-2xl border bg-white p-6 shadow-lg dark:bg-[#16181d] sm:h-[270px]',
                  isActive
                    ? 'border-slate-200 dark:border-white/10'
                    : 'border-slate-200/70 dark:border-white/[0.06]',
                )}
                aria-hidden={!isActive}
              >
                <span className="self-start rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-slate-600 uppercase dark:bg-white/10 dark:text-neutral-300">
                  {project.badge}
                </span>

                <h3 className="mt-4 text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-center text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
                  {project.subtitle}
                </p>

                {isActive && (
                  <div className="mt-auto flex items-center justify-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="rounded-md border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 cursor-pointer"
                    >
                      View Details
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} source code on GitHub`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Counter ── */}
      <div className="mt-6 flex flex-col items-center" aria-live="polite">
        <div className="relative h-14 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.28 }}
              className="block text-5xl font-extrabold tracking-tight text-slate-900 tabular-nums sm:text-6xl dark:text-white"
            >
              {String(active + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
          of {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="mt-6 flex items-center gap-5">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => goTo(active - 1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to project ${i + 1}: ${p.title}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={cn(
                'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                i === active
                  ? 'w-6 bg-slate-900 dark:bg-white'
                  : 'w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-white/25 dark:hover:bg-white/40',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={() => goTo(active + 1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="sr-only">
        Showing project {active + 1} of {count}: {activeProject.title}
      </p>
    </div>
  );
};
