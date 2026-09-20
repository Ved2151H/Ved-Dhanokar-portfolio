import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';

export interface GlassModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const GlassModal: React.FC<GlassModalProps> = ({
  id = 'glass-modal',
  isOpen,
  onClose,
  title,
  badge,
  children,
  maxWidth = 'xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-xl';
      case '2xl':
        return 'max-w-4xl';
      case 'lg':
      case 'xl':
      default:
        return 'max-w-3xl';
    }
  };

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 dark:bg-[#05070c]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className={`relative w-full ${getMaxWidthClass()} my-8 z-10 transition-all`}>
        <GlassCard
          className="rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-xl shadow-[0_24px_64px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200/80 dark:border-white/[0.08] shrink-0">
            <div>
              {badge && (
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-wide uppercase">
                  {badge}
                </span>
              )}
              <h3
                id={`${id}-title`}
                className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5"
              >
                {title}
              </h3>
            </div>
            <button
              id={`${id}-close-btn`}
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-neutral-300">
            {children}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
