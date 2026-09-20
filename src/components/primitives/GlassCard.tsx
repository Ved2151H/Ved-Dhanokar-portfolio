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
      className={`relative rounded-2xl overflow-hidden bg-white/85 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 backdrop-blur-xl transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
