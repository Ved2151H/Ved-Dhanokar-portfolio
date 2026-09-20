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
  children,
  className = '',
  containerSize = 'lg',
}) => {
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden ${className}`}>
      <GlassContainer size={containerSize}>
        {(title || subtitle || badge) && (
          <div className="max-w-2xl mb-12 sm:mb-16">
            {badge && (
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-slate-900 dark:bg-white" />
                <span className="text-xs font-mono tracking-widest text-slate-700 dark:text-neutral-300 uppercase font-semibold">
                  {badge}
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
