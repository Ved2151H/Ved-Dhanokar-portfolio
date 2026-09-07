import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  /**
   * Material tier:
   *  primary   → Glass 3 (Structural) — nav, hero frame, modal
   *  secondary → Glass 2 (Surface)    — project/experience/skill cards
   *  tertiary  → Glass 1 (Floating)   — badges, small pills
   */
  material?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Semantic variant aliases (mapped to tiers):
   *  default     → Surface glass
   *  subtle      → Floating glass
   *  interactive → Surface glass + hover lift
   *  elevated    → Structural glass
   *  glow        → Surface glass + accent border
   */
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
  // ── Material tier styles ────────────────────────────────────────────
  // All use CSS-variable-driven backgrounds defined in index.css so
  // dark/light themes automatically pick the correct alpha value.
  const getMaterialStyles = (): string => {
    if (material === 'primary') {
      // Glass 3 — Structural
      return 'glass-struct glass-specular';
    }
    if (material === 'tertiary') {
      // Glass 1 — Floating / highest transparency
      return 'glass-float glass-specular';
    }

    // material === 'secondary' OR no material (use variant)
    switch (variant) {
      case 'subtle':
        return 'glass-float glass-specular';

      case 'elevated':
        return 'glass-struct glass-specular';

      case 'interactive':
        // Surface glass + interactive hover physics
        return 'glass-surface glass-interactive glass-specular';

      case 'glow':
        // Surface glass + accent glow border
        return [
          'glass-surface glass-specular',
          // accent border + glow shadow (both themes via CSS variable accent)
          'border-[color:var(--glass-hover-border)]',
          'shadow-[0_12px_35px_-5px_var(--accent-glow)]',
        ].join(' ');

      case 'default':
      default:
        return 'glass-surface glass-specular';
    }
  };

  // ── Accent ambient overlay ──────────────────────────────────────────
  const getAccentOverlay = (): string => {
    if (accent === 'none') return '';
    const colorMap = {
      cyan:   'rgba(6,182,212,0.06)',
      blue:   'rgba(59,130,246,0.06)',
      purple: 'rgba(139,92,246,0.06)',
    };
    return colorMap[accent] ? `[--accent-overlay:${colorMap[accent]}]` : '';
  };

  return (
    <div
      id={id}
      className={`relative rounded-2xl overflow-hidden glass-card-${variant} ${getMaterialStyles()} ${getAccentOverlay()} ${className}`}
      {...props}
    >
      {/* Accent ambient radial behind content — only when accent is set */}
      {accent !== 'none' && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none z-0 rounded-2xl ${
            accent === 'cyan'   ? 'ambient-glow-cyan'   :
            accent === 'blue'   ? 'ambient-glow-blue'   :
            accent === 'purple' ? 'ambient-glow-purple'  : ''
          }`}
        />
      )}
      {children}
    </div>
  );
};
