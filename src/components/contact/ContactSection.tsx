import React, { useState } from 'react';
import { Mail, Github, Linkedin, Code, Copy, Check, AlertCircle } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassCard } from '../primitives/GlassCard';
import { GlassButton } from '../primitives/GlassButton';
import { GlassSection } from '../primitives/GlassSection';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    `w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-colors ${
      hasError
        ? 'border-red-400 dark:border-red-500 focus:border-red-500'
        : 'border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500'
    }`;

  return (
    <GlassSection
      id="contact"
      badge="Get In Touch"
      title="Let's Build Something Together."
      subtitle="Open for discussions on full-stack development, applied machine learning systems, real-time computer vision, and intelligent software engineering."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl">
        {/* Left: Direct contact info */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard id="contact-info-card" className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Direct Contact</h3>
            <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
              Whether you have an inquiry about full-stack development, AI integration, computer vision, or a recruitment opportunity, feel free to reach out directly.
            </p>

            <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 mb-6">
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider block">Primary Email</span>
                <span className="text-sm font-mono text-slate-900 dark:text-white truncate block font-medium">{profileData.email}</span>
              </div>
              <button
                id="copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer shrink-0"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-600 dark:text-neutral-300" />}
              </button>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider block mb-3">Profiles</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { href: profileData.socials.github, label: 'GitHub', icon: <Github className="w-4 h-4" /> },
                  { href: profileData.socials.linkedin, label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                  { href: profileData.socials.leetcode, label: 'LeetCode', icon: <Code className="w-4 h-4" /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-md bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {icon}
                    <span className="text-xs font-medium mt-1.5">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Contact form */}
        <div className="lg:col-span-7">
          <GlassCard id="contact-form-card" className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>

            {submitSuccess ? (
              <div id="contact-success-notice" className="p-6 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 text-slate-700 dark:text-neutral-300" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Message Prepared</h4>
                <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md mx-auto">
                  Thank you, {formData.name}. Your email client has been opened with your inquiry addressed to {profileData.email}.
                </p>
                <button
                  onClick={() => { setSubmitSuccess(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-input-name" className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input id="contact-input-name" type="text" placeholder="e.g. Sarah Connor" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass(!!formErrors.name)} />
                    {formErrors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-input-email" className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input id="contact-input-email" type="email" placeholder="e.g. sarah@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass(!!formErrors.email)} />
                    {formErrors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-input-subject" className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                    Subject
                  </label>
                  <input id="contact-input-subject" type="text" placeholder="e.g. AI / Full-Stack Project Discussion" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputClass(false)} />
                </div>

                <div>
                  <label htmlFor="contact-input-message" className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea id="contact-input-message" rows={4} placeholder="Describe your technical requirements or opportunity..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass(!!formErrors.message)} resize-y`} />
                  {formErrors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.message}</p>}
                </div>

                <div className="pt-2">
                  <GlassButton id="contact-submit-btn" variant="primary" size="lg" type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Preparing...' : 'Send Message'}
                  </GlassButton>
                  <span className="text-[11px] text-slate-500 dark:text-neutral-500 text-center block mt-2 font-mono">
                    Routed to {profileData.email}
                  </span>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </GlassSection>
  );
};
