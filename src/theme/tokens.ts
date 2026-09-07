/**
 * Liquid Glass & Cross-Platform Theme Design Tokens
 * Centralized design tokens and reusable materials for the Liquid Glass System.
 * Inspired by translucent layered UI with multi-tier material hierarchies.
 */

export interface GlassMaterialDefinition {
  background: string;
  backdropBlur: string;
  border: string;
  innerHighlight: string;
  shadow: string;
  opacity: number;
}

export const glassMaterials = {
  dark: {
    // Primary Glass: Used for major floating surfaces (Navbars, Header, Modals, Bottom Dock, Sheets)
    primary: {
      background: 'rgba(8, 14, 26, 0.45)',
      backdropBlur: '24px',
      border: 'rgba(255, 255, 255, 0.12)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%)',
      shadow: '0 16px 40px -8px rgba(0, 0, 0, 0.65), 0 0 24px -4px rgba(6, 182, 212, 0.14)',
      opacity: 0.45,
    },
    // Secondary Glass: Used for Content cards (Projects, Experience, Skills, Education, Achievements, Contact)
    secondary: {
      background: 'rgba(10, 16, 30, 0.32)',
      hoverBackground: 'rgba(14, 22, 42, 0.48)',
      backdropBlur: '16px',
      border: 'rgba(255, 255, 255, 0.08)',
      hoverBorder: 'rgba(56, 189, 248, 0.40)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.16) 50%, transparent 100%)',
      shadow: '0 10px 32px -4px rgba(0, 0, 0, 0.45)',
      hoverShadow: '0 16px 44px -8px rgba(6, 182, 212, 0.22)',
      opacity: 0.32,
    },
    // Tertiary Glass: Used for Pills, tags, small controls, badges
    tertiary: {
      background: 'rgba(255, 255, 255, 0.05)',
      hoverBackground: 'rgba(255, 255, 255, 0.09)',
      backdropBlur: '10px',
      border: 'rgba(255, 255, 255, 0.08)',
      shadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      opacity: 0.05,
    },
    // Active Floating Slider Pill (Physical liquid glass slider material)
    activeSlider: {
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.18) 100%)',
      border: 'rgba(56, 189, 248, 0.45)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
      shadow: '0 0 24px rgba(6, 182, 212, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    },
  },
  light: {
    // Primary Glass: Used for major floating surfaces (Navbars, Header, Modals, Bottom Dock, Sheets)
    primary: {
      background: 'rgba(255, 255, 255, 0.65)',
      backdropBlur: '24px',
      border: 'rgba(255, 255, 255, 0.85)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)',
      shadow: '0 16px 40px -10px rgba(15, 23, 42, 0.10), 0 0 20px -4px rgba(2, 132, 199, 0.08)',
      opacity: 0.65,
    },
    // Secondary Glass: Used for Content cards (Projects, Experience, Skills, Education, Achievements, Contact)
    secondary: {
      background: 'rgba(255, 255, 255, 0.52)',
      hoverBackground: 'rgba(255, 255, 255, 0.72)',
      backdropBlur: '16px',
      border: 'rgba(226, 232, 240, 0.8)',
      hoverBorder: 'rgba(2, 132, 199, 0.45)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)',
      shadow: '0 8px 24px -4px rgba(15, 23, 42, 0.05)',
      hoverShadow: '0 14px 36px -8px rgba(2, 132, 199, 0.15)',
      opacity: 0.52,
    },
    // Tertiary Glass: Used for Pills, tags, small controls, badges
    tertiary: {
      background: 'rgba(255, 255, 255, 0.45)',
      hoverBackground: 'rgba(255, 255, 255, 0.65)',
      backdropBlur: '10px',
      border: 'rgba(203, 213, 225, 0.6)',
      shadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
      opacity: 0.45,
    },
    // Active Floating Slider Pill (Physical liquid glass slider material)
    activeSlider: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 249, 255, 0.85) 100%)',
      border: 'rgba(2, 132, 199, 0.35)',
      innerHighlight: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
      shadow: '0 4px 20px rgba(2, 132, 199, 0.18), 0 1px 3px rgba(15, 23, 42, 0.06)',
    },
  },
} as const;

export const theme = {
  colors: {
    background: {
      primary: '#05070c',
      secondary: '#0a0e1a',
      tertiary: '#0e1526',
      elevated: '#121c32',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      muted: '#64748b',
      accent: '#38bdf8',
    },
    accents: {
      cyan: '#06b6d4',
      blue: '#3b82f6',
      sky: '#38bdf8',
      purple: '#8b5cf6',
      indigo: '#6366f1',
      emerald: '#10b981',
    },
    borders: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      default: 'rgba(255, 255, 255, 0.09)',
      active: 'rgba(56, 189, 248, 0.35)',
      highlight: 'rgba(255, 255, 255, 0.18)',
    },
  },
  glass: {
    materials: glassMaterials,
    blur: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    opacity: {
      ultraSubtle: 0.03,
      subtle: 0.06,
      tertiary: 0.12,
      secondary: 0.35,
      primary: 0.55,
      modal: 0.65,
    },
    borderOpacity: {
      default: 0.08,
      interactive: 0.16,
      highlight: 0.3,
    },
    shadows: {
      subtle: '0 4px 20px rgba(0, 0, 0, 0.25)',
      card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      elevated: '0 16px 48px -8px rgba(0, 0, 0, 0.5)',
      glowCyan: '0 0 35px -5px rgba(56, 189, 248, 0.25)',
      glowPurple: '0 0 35px -5px rgba(139, 92, 246, 0.2)',
    },
  },
  typography: {
    fontDisplay: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    fontBody: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },
  spacing: {
    containerMax: '1280px',
    sectionVertical: '6rem',
  },
  animation: {
    transitionFast: '0.15s ease-out',
    transitionDefault: '0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionSlow: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type Theme = typeof theme;

