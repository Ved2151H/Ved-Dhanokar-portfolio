import React from 'react';
import { certificationsData } from '../../data/certifications';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const CertificationsSection: React.FC = () => {
  return (
    <GlassSection
      id="certifications"
      badge="Verified Credentials"
      title="Certifications & AI Specializations"
      subtitle="Industry and institutional accreditations validating machine learning foundations, prompt engineering, and cloud AI architecture."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <GlassCard
            key={cert.id}
            id={`cert-card-${cert.id}`}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4 gap-3">
                <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                  {cert.issuer}
                </span>
                {cert.year && (
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-500 shrink-0">
                    {cert.year}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
                {cert.title}
              </h3>

              {cert.description && (
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-500">
                Verified Credential
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassSection>
  );
};
