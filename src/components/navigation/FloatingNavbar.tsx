import React, { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { Menu, Moon, Sun, X, Frame } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../constants/navigation';
import { profileData } from '../../data/profile';

/* ─────────────────────────────────────────────────────────────────────────────
   Floating Navbar (Aceternity-style), adapted to this portfolio:
   - Full-width bar at rest; past 100px of scroll it springs into a centered
     pill (shrinks, drops 20px, gains backdrop blur + soft shadow).
   - Nav items share a sliding `layoutId` pill: it follows the hovered item
     and springs back to the active section when the pointer leaves.
   - Mobile collapses to a compact bar with an animated hamburger menu.
   ────────────────────────────────────────────────────────────────────────────*/

const DESKTOP_ITEM_IDS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];

const desktopItems = NAV_ITEMS.filter((item) => DESKTOP_ITEM_IDS.includes(item.id)).map(
  (item) => ({ name: item.label, href: `#${item.id}` }),
);

interface FloatingNavbarProps {
  activeSection: string;
  onSelectSection: (targetId: string) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { theme, toggleTheme, isLight } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (targetId: string) => {
    setMenuOpen(false);
    onSelectSection(targetId);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        /* Safe fallback */
      }
    }
  };

  const themeToggle = (
    <button
      id="floating-navbar-theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
      className="p-2 rounded-full border border-slate-200 bg-slate-100 text-slate-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
    >
      {isLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );

  return (
    <Navbar className="fixed inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top,0px))] z-40 px-4">
      {/* ── Desktop floating pill ── */}
      <NavBody>
        <NavbarLogo onSelect={() => go('hero')} />
        <NavItems
          items={desktopItems}
          activeHref={`#${activeSection}`}
          onItemClick={(item) => go(item.href.slice(1))}
        />
        <div className="relative z-20 flex items-center gap-2">
          {themeToggle}
          <NavbarButton
            id="floating-navbar-contact-cta"
            variant="primary"
            onClick={() => go('contact')}
          >
            Get in Touch
          </NavbarButton>
        </div>
      </NavBody>

      {/* ── Mobile compact bar + hamburger menu ── */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo onSelect={() => go('hero')} />
          <div className="flex items-center gap-1.5">
            {themeToggle}
            <MobileNavToggle
              isOpen={menuOpen}
              onClick={() => {
                setMenuOpen((open) => !open);
                if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                  try {
                    navigator.vibrate(10);
                  } catch {
                    /* Safe fallback */
                  }
                }
              }}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
              className="text-sm text-neutral-600 dark:text-neutral-300 transition-all duration-300 hover:translate-x-1 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <NavbarButton variant="primary" onClick={() => go('contact')} className="mt-2">
            Get in Touch
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

/* ──────────────────────────── Primitives ──────────────────────────────────── */

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    href: string;
  }[];
  className?: string;
  activeHref?: string;
  onItemClick?: (item: { name: string; href: string }) => void;
}

interface MobileNavProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top,0px))] z-40 w-full',
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '40%' : '100%',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: '800px',
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, activeHref, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = activeHref ? items.findIndex((item) => item.href === activeHref) : -1;
  const pillIndex = hovered !== null ? hovered : activeIndex;

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex',
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => {
            e.preventDefault();
            onItemClick?.(item);
          }}
          className={cn(
            'relative cursor-pointer px-4 py-2 transition-colors duration-200',
            pillIndex === idx
              ? 'text-slate-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-300',
          )}
          key={`link-${idx}`}
          href={item.href}
        >
          {pillIndex === idx && (
            <motion.div
              layoutId="navbar-hover-pill"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="absolute inset-0 h-full w-full rounded-full bg-slate-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '90%' : '100%',
        paddingRight: visible ? '12px' : '0px',
        paddingLeft: visible ? '12px' : '0px',
        borderRadius: visible ? '4px' : '2rem',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent py-2 lg:hidden',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      onClick={onClick}
      className="p-2 rounded-full border border-slate-200 bg-slate-100 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
    >
      {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
    </button>
  );
};

export const NavbarLogo = ({ onSelect }: { onSelect: () => void }) => {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
      aria-label="Ved Dhanokar - Return to top of portfolio"
      className="relative z-20 mr-4 flex items-center gap-2 px-2 py-1 text-sm"
    >
      <Frame className="size-6 shrink-0 text-slate-900 dark:text-white" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-bold tracking-tight text-black dark:text-white">
          {profileData.displayName}
        </span>
        <span className="mt-0.5 hidden text-[10px] uppercase tracking-wider font-mono text-neutral-500 dark:text-neutral-500 sm:block">
          AI/ML & Full-Stack
        </span>
      </span>
    </a>
  );
};

type NavbarButtonProps = React.ComponentPropsWithoutRef<'a'> & {
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient';
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = 'primary',
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    'px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center';

  const variantStyles = {
    primary:
      'bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    secondary: 'bg-transparent shadow-none text-black dark:text-white',
    dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    gradient:
      'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
  };

  return (
    <a
      href={href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
};
