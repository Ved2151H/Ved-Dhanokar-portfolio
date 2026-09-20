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
import { GlassSection } from '../primitives/GlassSection';

/* ─────────────────────────────────────────────────────────────────────────────
   Contact — two-column editorial layout.
   Left: heading support, direct email + profiles as scannable rows.
   Right: dedicated form panel. All original data & form logic preserved.
   Subtle whileInView reveals; reduced-motion aware.
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

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-colors ${
      hasError
        ? 'border-red-400 dark:border-red-500 focus:border-red-500'
        : 'border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500'
    }`;

  // Shared reveal variants (fade + 16px rise; no y-motion if reduced motion)
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const profiles = [
    { href: profileData.socials.github, label: 'GitHub', icon: Github },
    { href: profileData.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: profileData.socials.leetcode, label: 'LeetCode', icon: Code },
  ];

  return (
    <GlassSection
      id="contact"
      badge="Get In Touch"
      title="Let's Build Something Together."
      subtitle="Open for discussions on full-stack development, applied machine learning systems, real-time computer vision, and intelligent software engineering."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl">
        {/* ── Left: direct contact information ── */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="lg:col-span-5"
        >
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Direct Contact
          </h3>
          <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-8">
            Whether you have an inquiry about full-stack development, AI integration, computer
            vision, or a recruitment opportunity, feel free to reach out directly.
          </p>

          {/* Email row */}
          <div className="py-5 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider block mb-2">
              Primary Email
            </span>
            <div className="flex items-center justify-between gap-3">
              <a
                href={profileData.socials.email}
                className="flex items-center gap-2.5 text-sm font-mono font-medium text-slate-900 dark:text-white min-w-0 hover:text-slate-600 dark:hover:text-neutral-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
                <span className="truncate">{profileData.email}</span>
              </a>
              <button
                id="copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-600 dark:text-neutral-300" />
                )}
              </button>
            </div>
          </div>

          {/* Profiles rows */}
          <div className="border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider block pt-5 mb-2">
              Profiles
            </span>
            {profiles.map(({ href, label, icon: Icon }, idx) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-3 py-3.5 group ${
                  idx < profiles.length - 1
                    ? 'border-b border-slate-100 dark:border-slate-800/60'
                    : ''
                }`}
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-neutral-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4 text-slate-400 dark:text-neutral-500" />
                  {label}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 dark:text-neutral-600 group-hover:text-slate-600 dark:group-hover:text-neutral-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right: dedicated form panel ── */}
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
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#0d0f14]"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
              Send a Message
            </h3>

            {submitSuccess ? (
              <div
                id="contact-success-notice"
                className="p-6 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 text-slate-700 dark:text-neutral-300" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Message Prepared
                </h4>
                <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md mx-auto">
                  Thank you, {formData.name}. Your email client has been opened with your inquiry
                  addressed to {profileData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-input-name"
                      className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5"
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
                      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-input-email"
                      className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5"
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
                      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-input-subject"
                    className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5"
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
                    className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-input-message"
                    rows={5}
                    placeholder="Describe your technical requirements or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass(!!formErrors.message)} resize-y`}
                  />
                  {formErrors.message && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
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
                  <span className="text-[11px] text-slate-500 dark:text-neutral-500 text-center block mt-3 font-mono">
                    Routed to {profileData.email}
                  </span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </GlassSection>
  );
};
