import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   GhostWord — giant faded display text behind a section (contact-section
   style decorative depth). Font size is computed from the word length so the
   word ALWAYS fits within the viewport: ~0.62em average glyph width for
   extrabold uppercase, capped at 90vw with a floor/ceiling clamp.
   ────────────────────────────────────────────────────────────────────────────*/

export const GhostWord: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  // Extrabold uppercase averages ≈0.68em per glyph; target ~84vw so the word
  // always fits the viewport with a margin at every width (phone → 4K).
  const vw = (84 / (0.68 * Math.max(1, text.length))).toFixed(2);
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap text-center font-extrabold leading-none tracking-tight text-slate-900/[0.04] dark:text-white/[0.045] ${className}`}
      style={{ fontSize: `clamp(2rem, ${vw}vw, 11rem)` }}
    >
      {text}
    </span>
  );
};
