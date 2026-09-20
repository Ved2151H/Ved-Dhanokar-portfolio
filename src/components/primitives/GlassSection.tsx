import React from 'react';
import { GlassContainer } from './GlassContainer';
import { GhostWord } from './GhostWord';

export interface GlassSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  /** Giant faded backdrop word behind the section header (contact style). */
  ghostWord?: string;
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'full';
}

export const GlassSection: React.FC<GlassSectionProps> = ({
  id,
  title,
  subtitle,
  badge,
  ghostWord,
  children,
  className = '',
  containerSize = 'lg',
}) => {
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden ${className}`}>
      {ghostWord && <GhostWord text={ghostWord} />}
      <GlassContainer size={containerSize}>
        {(title || subtitle || badge) && (
          <div className="max-w-2xl mb-12 sm:mb-16">
            {badge && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
                  <span
                    aria-hidden
                    className="relative flex size-2.5 items-center justify-center"
                  >
                    <span className="absolute inline-flex size-2.5 rounded-full border border-slate-500 dark:border-neutral-300" />
                    <span className="size-1 rounded-full bg-slate-600 dark:bg-neutral-200" />
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">
                    {badge}
                  </span>
                </span>
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </GlassContainer>
    </section>
  );
};
