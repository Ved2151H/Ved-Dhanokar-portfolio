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
  variant = 'secondary',
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
        return 'px-3 py-1.5 text-xs font-medium gap-1.5 rounded-md';
      case 'lg':
        return 'px-6 py-3 text-base font-medium gap-2.5 rounded-md';
      case 'md':
      default:
        return 'px-4 py-2 text-sm font-medium gap-2 rounded-md';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-900 dark:border-white active:opacity-80';
      case 'secondary':
        return 'bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-neutral-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700';
      case 'outline':
        return 'bg-transparent text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-600';
      case 'ghost':
        return 'bg-transparent text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent';
      case 'glass':
      default:
        return 'bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-neutral-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700';
    }
  };

  const combinedClasses = `inline-flex items-center justify-center whitespace-nowrap select-none transition-colors duration-200 cursor-pointer ${getSizeStyles()} ${getVariantStyles()} ${className}`;

  if (asAnchor && href) {
    return (
      <a id={id} href={href} target={target} rel={rel} className={combinedClasses}>
        {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button id={id} className={combinedClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
