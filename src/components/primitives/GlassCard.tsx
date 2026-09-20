import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  material?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'subtle' | 'interactive' | 'elevated' | 'glow';
  accent?: 'cyan' | 'purple' | 'blue' | 'none';
  specular?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  id,
  material,
  variant = 'default',
  accent = 'none',
  specular,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      id={id}
      className={`relative rounded-lg overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
