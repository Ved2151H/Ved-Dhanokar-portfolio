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
  specular = true,
  className = '',
  children,
  ...props
}) => {
  const getMaterialOrVariantStyles = () => {
    // If explicit material is given, apply material tier
    if (material === 'primary') {
      return 'bg-slate-900/40 dark:bg-slate-900/40 bg-white/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.12] shadow-[0_16px_40px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]';
    }
    if (material === 'secondary') {
      return 'bg-white/55 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]';
    }
    if (material === 'tertiary') {
      return 'bg-white/45 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/50 dark:border-white/[0.06] shadow-xs dark:shadow-none';
    }

    // Otherwise apply semantic variant mapped to Liquid Glass tiers
    switch (variant) {
      case 'subtle':
        // Tertiary glass
        return 'bg-white/45 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200/50 dark:border-white/[0.05] shadow-xs';
      case 'interactive':
        // Interactive Secondary glass with physical spring hover
        return 'bg-white/55 hover:bg-white/75 dark:bg-slate-900/28 dark:hover:bg-slate-900/45 backdrop-blur-md border border-slate-200/70 hover:border-sky-400/50 dark:border-white/[0.08] dark:hover:border-cyan-400/45 transition-all duration-300 shadow-sm hover:shadow-[0_14px_36px_-8px_rgba(2,132,199,0.16)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_14px_40px_-8px_rgba(6,182,212,0.25)] hover:-translate-y-1';
      case 'elevated':
        // Primary glass for prominent focal surfaces
        return 'bg-white/70 dark:bg-slate-900/45 backdrop-blur-xl border border-white/90 dark:border-white/[0.12] shadow-[0_20px_45px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]';
      case 'glow':
        // Accented Secondary glass
        return 'bg-white/60 dark:bg-slate-900/35 backdrop-blur-md border border-sky-400/50 dark:border-cyan-500/35 shadow-[0_12px_35px_-5px_rgba(2,132,199,0.18)] dark:shadow-[0_0_35px_-5px_rgba(6,182,212,0.22)]';
      case 'default':
      default:
        // Secondary glass
        return 'bg-white/55 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]';
    }
  };

  const getAccentStyles = () => {
    switch (accent) {
      case 'cyan':
        return 'before:absolute before:inset-0 before:bg-radial-cyan before:opacity-10 before:pointer-events-none';
      case 'purple':
        return 'before:absolute before:inset-0 before:bg-radial-purple before:opacity-10 before:pointer-events-none';
      case 'blue':
        return 'before:absolute before:inset-0 before:bg-radial-blue before:opacity-10 before:pointer-events-none';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div
      id={id}
      className={`relative rounded-2xl overflow-hidden glass-card-${variant} ${getMaterialOrVariantStyles()} ${getAccentStyles()} ${className}`}
      {...props}
    >
      {specular && (
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none"
        />
      )}
      {children}
    </div>
  );
};

