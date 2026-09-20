import React from 'react';
import { MoreVertical } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   GlowCard — dark project-style card with a colored gradient bloom in the
   top-right corner (border edge strongest there, fading to transparent).

   Slots (all optional):
   - meta         top-left mono caption (e.g. a date)
   - action       top-right node (defaults to a decorative kebab icon)
   - title        big centered headline
   - subtitle     muted centered line under the title
   - progress     { value: 0-100, label? } → colored bar + % under it
   - children     free body content (lists, tags, descriptions)
   - footerLeft   footer-left node (tags, captions)
   - footerRight  footer-right rounded pill (e.g. "3 weeks left")

   Accents: teal | amber | red | blue | violet | cyan (theme-aware shades).
   ────────────────────────────────────────────────────────────────────────────*/

export type GlowAccent = 'teal' | 'amber' | 'red' | 'blue' | 'violet' | 'cyan';

const ACCENT_VARS: Record<GlowAccent, string> = {
  teal: '[--glow:#0d9488] dark:[--glow:#2dd4bf]',
  amber: '[--glow:#d97706] dark:[--glow:#fbbf24]',
  red: '[--glow:#dc2626] dark:[--glow:#f87171]',
  blue: '[--glow:#2563eb] dark:[--glow:#60a5fa]',
  violet: '[--glow:#7c3aed] dark:[--glow:#a78bfa]',
  cyan: '[--glow:#0891b2] dark:[--glow:#22d3ee]',
};

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: GlowAccent;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  progress?: { value: number; label?: string };
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
  children?: React.ReactNode;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  accent = 'blue',
  meta,
  action,
  title,
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  progress,
  footerLeft,
  footerRight,
  children,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`relative rounded-3xl p-px transition-all duration-300 hover:-translate-y-0.5 ${ACCENT_VARS[accent]} ${className}`}
      style={{
        background: 'linear-gradient(to bottom left, var(--glow), transparent 55%)',
      }}
      {...rest}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0d0f14]">
        {/* Gradient wash + blurred bloom, both anchored to the top-right corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10] dark:opacity-[0.16]"
          style={{ background: 'linear-gradient(215deg, var(--glow) 0%, transparent 48%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-14 -right-14 h-52 w-52 rounded-full opacity-20 blur-3xl dark:opacity-25"
          style={{ background: 'var(--glow)' }}
        />

        <div className="relative flex grow flex-col p-6">
          {(meta || action !== undefined) && (
            <div className="mb-6 flex items-start justify-between gap-3">
              <div className="min-w-0 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                {meta}
              </div>
              {action !== undefined ? (
                action
              ) : (
                <MoreVertical
                  aria-hidden
                  className="size-4 shrink-0 text-slate-400 dark:text-neutral-500"
                />
              )}
            </div>
          )}

          {(title || subtitle) && (
            <div className="mb-6 text-center">
              {title && (
                <h3
                  className={`text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white ${titleClassName}`}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className={`mt-1 text-sm text-slate-600 dark:text-neutral-400 ${subtitleClassName}`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {progress && (
            <div className="mb-6">
              <div className="mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {progress.label ?? 'Progress'}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--glow)]"
                  style={{ width: `${Math.min(100, Math.max(0, progress.value))}%` }}
                />
              </div>
              <div className="mt-1.5 text-right text-sm font-bold text-[var(--glow)]">
                {Math.round(progress.value)}%
              </div>
            </div>
          )}

          {children}
        </div>

        {(footerLeft || footerRight) && (
          <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-slate-200/70 px-6 py-4 dark:border-white/[0.06]">
            <div className="min-w-0">{footerLeft}</div>
            {footerRight && (
              <div className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold whitespace-nowrap text-slate-700 dark:bg-white/[0.06] dark:text-neutral-200">
                {footerRight}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** Shared accent rotation so card grids get varied colors deterministically. */
export const GLOW_ACCENT_ROTATION: GlowAccent[] = ['teal', 'amber', 'red', 'blue', 'violet', 'cyan'];

export const glowAccentFor = (index: number): GlowAccent =>
  GLOW_ACCENT_ROTATION[index % GLOW_ACCENT_ROTATION.length];
