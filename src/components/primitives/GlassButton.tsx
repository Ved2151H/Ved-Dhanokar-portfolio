import React from 'react';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  id,
  variant = 'glass',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  children,
  ...props
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs font-medium gap-1.5 rounded-lg';
      case 'lg':
        return 'px-6 py-3 text-base font-medium gap-2.5 rounded-xl';
      case 'md':
      default:
        return 'px-4.5 py-2.25 text-sm font-medium gap-2 rounded-lg';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white font-semibold shadow-[0_4px_20px_rgba(2,132,199,0.25)] dark:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_25px_rgba(2,132,199,0.4)] dark:hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/40';
      case 'secondary':
        return 'bg-white/55 dark:bg-white/[0.06] hover:bg-white/80 dark:hover:bg-white/[0.12] text-slate-800 dark:text-neutral-100 border border-slate-200/70 dark:border-white/[0.12] backdrop-blur-md active:scale-[0.98] shadow-xs';
      case 'outline':
        return 'bg-transparent hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-cyan-500/40 dark:border-cyan-500/30 hover:border-cyan-500/70 active:scale-[0.98]';
      case 'ghost':
        return 'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-transparent';
      case 'glass':
      default:
        return 'bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/60 text-slate-800 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/[0.12] hover:border-sky-400/50 dark:hover:border-cyan-400/40 backdrop-blur-lg shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] active:scale-[0.98]';
    }
  };

  const combinedClasses = `inline-flex items-center justify-center whitespace-nowrap select-none transition-all duration-200 cursor-pointer ${getSizeStyles()} ${getVariantStyles()} ${className}`;

  if (asAnchor && href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
      >
        {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      id={id}
      className={combinedClasses}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
