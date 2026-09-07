import React from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { certificationsData } from '../../data/certifications';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const CertificationsSection: React.FC = () => {
  return (
    <GlassSection
      id="certifications"
      badge="Verified Credentials"
      badgeIcon={<ShieldCheck className="w-3.5 h-3.5" />}
      title="Certifications & AI Specializations"
      subtitle="Industry and institutional accreditations validating machine learning foundations, prompt engineering, and cloud AI architecture."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <GlassCard
            key={cert.id}
            id={`cert-card-${cert.id}`}
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                {cert.year && (
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] px-2 py-0.5 rounded-full">
                    {cert.year}
                  </span>
                )}
              </div>

              <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wider block mb-1.5">
                {cert.issuer}
              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
                {cert.title}
              </h3>

              {cert.description && (
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Credential</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassSection>
  );
};
