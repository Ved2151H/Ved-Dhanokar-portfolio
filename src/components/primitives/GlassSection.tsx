import React from 'react';
import { GlassContainer } from './GlassContainer';

export interface GlassSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'full';
}

export const GlassSection: React.FC<GlassSectionProps> = ({
  id,
  title,
  subtitle,
  badge,
  badgeIcon,
  children,
  className = '',
  containerSize = 'lg',
}) => {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-28 overflow-hidden ${className}`}
    >
      <GlassContainer size={containerSize}>
        {(title || subtitle || badge) && (
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-semibold tracking-wide text-sky-700 dark:text-cyan-300 bg-sky-100/80 dark:bg-cyan-950/40 border border-sky-300/60 dark:border-cyan-500/20 backdrop-blur-md">
                {badgeIcon && <span className="text-sky-600 dark:text-cyan-400">{badgeIcon}</span>}
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
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
