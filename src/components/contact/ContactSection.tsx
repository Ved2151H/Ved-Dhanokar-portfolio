import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Code,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassCard } from '../primitives/GlassCard';
import { GlassButton } from '../primitives/GlassButton';
import { GlassSection } from '../primitives/GlassSection';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
    }
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
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Provide immediate client-side delivery feedback and generate mailto link for direct transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Open default email client after brief confirmation
      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <GlassSection
      id="contact"
      badge="Get In Touch"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title="Let's Build Something Intelligent."
      subtitle="Open for discussions on full-stack development, applied machine learning systems, real-time computer vision applications, and intelligent software engineering."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column: Direct Contact & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard
            id="contact-info-card"
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Communication</h3>
                <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Verified Channels</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
              Whether you have an inquiry regarding full-stack development, AI model integration, computer vision architectures, or recruitment opportunities, feel free to reach out directly.
            </p>

            {/* Email Copy Card */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-3 mb-6">
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                  Primary Email
                </span>
                <span className="text-xs sm:text-sm font-mono text-cyan-700 dark:text-cyan-300 truncate block font-medium">
                  {profileData.email}
                </span>
              </div>
              <button
                id="copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.1] transition-colors cursor-pointer shrink-0 shadow-xs"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* External Profiles & Platforms */}
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">
                Social & Developer Profiles:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  id="contact-social-github"
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/30 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
                >
                  <Github className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>

                <a
                  id="contact-social-linkedin"
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/30 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>

                <a
                  id="contact-social-leetcode"
                  href={profileData.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] hover:border-amber-500/30 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all group"
                >
                  <Code className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-xs font-medium">LeetCode</span>
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <GlassCard
            id="contact-form-card"
            material="primary"
            variant="elevated"
            specular={true}
            className="p-6 sm:p-8 border border-slate-200 dark:border-white/[0.12]"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Send Direct Message
              </h3>
            </div>

            {submitSuccess ? (
              <div
                id="contact-success-notice"
                className="p-6 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 text-center space-y-3 animate-in fade-in"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-400/40 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Message Prepared!</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-md mx-auto">
                  Thank you, {formData.name}. Your email client has been opened with your inquiry directly addressed to {profileData.email}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-mono cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-input-name"
                      className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-input-name"
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#0c1220] border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-xs ${
                        formErrors.name
                          ? 'border-red-500/70 focus:border-red-500'
                          : 'border-slate-200 dark:border-white/[0.1] focus:border-cyan-500 dark:focus:border-cyan-400/60'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-input-email"
                      className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5"
                    >
                      Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-input-email"
                      type="email"
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#0c1220] border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-xs ${
                        formErrors.email
                          ? 'border-red-500/70 focus:border-red-500'
                          : 'border-slate-200 dark:border-white/[0.1] focus:border-cyan-500 dark:focus:border-cyan-400/60'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-input-subject"
                    className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5"
                  >
                    Subject / Project Domain
                  </label>
                  <input
                    id="contact-input-subject"
                    type="text"
                    placeholder="e.g. AI / Full-Stack Project Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#0c1220] border border-slate-200 dark:border-white/[0.1] focus:border-cyan-500 dark:focus:border-cyan-400/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-xs"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-input-message"
                    className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5"
                  >
                    Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-input-message"
                    rows={4}
                    placeholder="Describe your technical requirements or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-white/[0.04] focus:bg-white dark:focus:bg-[#0c1220] border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-all resize-y shadow-xs ${
                      formErrors.message
                        ? 'border-red-500/70 focus:border-red-500'
                        : 'border-slate-200 dark:border-white/[0.1] focus:border-cyan-500 dark:focus:border-cyan-400/60'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <GlassButton
                    id="contact-submit-btn"
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full"
                  >
                    {isSubmitting ? 'Preparing Transmission...' : 'Send Message'}
                  </GlassButton>
                  <span className="text-[11px] text-slate-500 dark:text-neutral-500 text-center block mt-2 font-mono">
                    Direct routing to {profileData.email}
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
