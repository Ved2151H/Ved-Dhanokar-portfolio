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
  dotColor = 'bg-emerald-500',
  icon,
  className = '',
  children,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-slate-700';
      case 'active':
        return 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white';
      case 'subtle':
        return 'bg-transparent text-slate-500 dark:text-neutral-500 border-slate-200 dark:border-slate-700';
      case 'outline':
        return 'bg-transparent text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-slate-600';
      case 'default':
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide rounded-full border whitespace-nowrap ${getVariantStyles()} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
