import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  Github,
  Linkedin,
  Code,
  Copy,
  Check,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassButton } from '../primitives/GlassButton';
import { GhostWord } from '../primitives/GhostWord';

/* ─────────────────────────────────────────────────────────────────────────────
   Contact — reference layout:
   Left: pill badge, big heading, short paragraph, stacked dark info cards
         (icon tile · title · value · round arrow button).
   Right: dedicated form panel with large rounded inputs and a full-width
          white pill submit. Giant ghost "CONTACT" text behind the section.
   All of Ved's real data & form logic preserved (email + copy, GitHub,
   LinkedIn, LeetCode, 4 fields, validation, mailto flow).
   ────────────────────────────────────────────────────────────────────────────*/

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide a message';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    setFormErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Reference-style inputs: large rounded fields, subtle fill, hairline border
  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 text-sm rounded-xl border bg-white/60 dark:bg-white/[0.04] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-colors ${
      hasError
        ? 'border-red-400/70 dark:border-red-500/60 focus:border-red-500'
        : 'border-slate-300/80 dark:border-white/10 focus:border-slate-400 dark:focus:border-white/25'
    }`;

  // Shared reveal variants (fade + rise; reduced-motion safe)
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const infoCards = [
    {
      key: 'email',
      icon: Mail,
      title: 'Email us',
      value: profileData.email,
      href: profileData.socials.email,
      external: false,
      isEmail: true,
    },
    {
      key: 'github',
      icon: Github,
      title: 'GitHub',
      value: 'Ved2151H',
      href: profileData.socials.github,
      external: true,
      isEmail: false,
    },
    {
      key: 'linkedin',
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Ved Dhanokar',
      href: profileData.socials.linkedin,
      external: true,
      isEmail: false,
    },
    {
      key: 'leetcode',
      icon: Code,
      title: 'LeetCode',
      value: 'Ved_Dhanokar',
      href: profileData.socials.leetcode,
      external: true,
      isEmail: false,
    },
  ];

  return (
    <section id="contact" className="relative overflow-clip py-16 sm:py-20 lg:py-24">
      {/* Ghost "CONTACT" backdrop text — reference-style decorative depth */}
      <GhostWord text="CONTACT" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: badge + heading + info cards ── */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5"
          >
            {/* Pill badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
              <span aria-hidden className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-2.5 rounded-full border border-slate-500 dark:border-neutral-300" />
                <span className="size-1 rounded-full bg-slate-600 dark:bg-neutral-200" />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">
                Get In Touch
              </span>
            </span>

            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Let&apos;s Build Something Together.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
              Open for discussions on full-stack development, applied machine learning systems,
              real-time computer vision, and intelligent software engineering.
            </p>

            {/* Info cards */}
            <div className="mt-10 space-y-4">
              {infoCards.map(({ key, icon: Icon, title, value, href, external, isEmail }) => (
                <div
                  key={key}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-4 backdrop-blur-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p>
                      <p className="truncate font-mono text-xs text-slate-500 dark:text-neutral-400">
                        {value}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {isEmail && (
                      <button
                        id="copy-email-btn"
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/10"
                      >
                        {copiedEmail ? (
                          <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </button>
                    )}
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={
                        isEmail ? `Email ${profileData.displayName}` : `Open ${title} profile`
                      }
                      className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form panel ── */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.12 }}
            className="lg:col-span-7"
          >
            <div
              id="contact-form-card"
              className="rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-md sm:p-7 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              {submitSuccess ? (
                <div
                  id="contact-success-notice"
                  className="space-y-3 rounded-xl border border-slate-200/80 bg-white/50 p-6 text-center dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10">
                    <Check className="size-5 text-slate-700 dark:text-neutral-300" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Message Prepared
                  </h4>
                  <p className="mx-auto max-w-md text-sm text-slate-600 dark:text-neutral-400">
                    Thank you, {formData.name}. Your email client has been opened with your inquiry
                    addressed to {profileData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-2 cursor-pointer text-xs text-slate-600 underline hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-input-name"
                      className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-neutral-300"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-input-name"
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass(!!formErrors.name)}
                    />
                    {formErrors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="size-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-input-email"
                      className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-neutral-300"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-input-email"
                      type="email"
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass(!!formErrors.email)}
                    />
                    {formErrors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="size-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-input-subject"
                      className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-neutral-300"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-input-subject"
                      type="text"
                      placeholder="e.g. AI / Full-Stack Project Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={inputClass(false)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-input-message"
                      className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-neutral-300"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-input-message"
                      rows={7}
                      placeholder="Describe your technical requirements or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass(!!formErrors.message)} resize-y`}
                    />
                    {formErrors.message && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle className="size-3" /> {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <GlassButton
                      id="contact-submit-btn"
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Preparing...' : 'Send Message'}
                    </GlassButton>
                    <span className="mt-3 block text-center font-mono text-[11px] text-slate-500 dark:text-neutral-500">
                      Routed to {profileData.email}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
