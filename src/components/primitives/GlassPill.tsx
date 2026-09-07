import React from 'react';

export interface GlassPillProps {
  id?: string;
  variant?: 'default' | 'accent' | 'active' | 'subtle' | 'outline';
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const GlassPill: React.FC<GlassPillProps> = ({
  id,
  variant = 'default',
  dot = false,
  dotColor = 'bg-cyan-400',
  icon,
  className = '',
  children,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'bg-sky-100/60 dark:bg-cyan-500/10 text-sky-700 dark:text-cyan-300 border-sky-300/60 dark:border-cyan-500/30 backdrop-blur-sm';
      case 'active':
        return 'bg-sky-100/70 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-blue-500/20 text-sky-800 dark:text-cyan-200 border-sky-400/70 dark:border-cyan-400/50 shadow-xs dark:shadow-[0_0_12px_rgba(6,182,212,0.25)] backdrop-blur-sm';
      case 'subtle':
        return 'bg-white/30 dark:bg-white/[0.03] text-slate-600 dark:text-neutral-400 border-slate-200/50 dark:border-white/[0.05] backdrop-blur-xs';
      case 'outline':
        return 'bg-transparent text-slate-700 dark:text-neutral-300 border-slate-300/80 dark:border-white/20';
      case 'default':
      default:
        return 'bg-white/45 dark:bg-white/[0.05] text-slate-700 dark:text-neutral-300 border-slate-200/60 dark:border-white/[0.08] backdrop-blur-sm shadow-xs';
    }
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide rounded-full border whitespace-nowrap transition-colors duration-200 ${getVariantStyles()} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse shrink-0`} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
