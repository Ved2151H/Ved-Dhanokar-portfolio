import React from 'react';
import { certificationsData } from '../../data/certifications';
import { GlowCard, glowAccentFor } from '../primitives/GlowCard';
import { GlassSection } from '../primitives/GlassSection';

export const CertificationsSection: React.FC = () => {
  return (
    <GlassSection
      id="certifications"
      ghostWord="CERTIFICATIONS"
      badge="Verified Credentials"
      title="Certifications & AI Specializations"
      subtitle="Industry and institutional accreditations validating machine learning foundations, prompt engineering, and cloud AI architecture."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert, index) => (
          <GlowCard
            key={cert.id}
            id={`cert-card-${cert.id}`}
            accent={glowAccentFor(index)}
            className="h-full"
            meta={cert.year}
            title={cert.title}
            titleClassName="text-base! sm:text-lg!"
            subtitle={cert.issuer}
            subtitleClassName="font-mono text-xs uppercase tracking-wider"
            footerRight="Verified Credential"
          >
            {cert.description && (
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed text-center">
                {cert.description}
              </p>
            )}
          </GlowCard>
        ))}
      </div>
    </GlassSection>
  );
};
