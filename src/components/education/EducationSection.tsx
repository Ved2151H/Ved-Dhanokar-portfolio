import React from 'react';
import { educationData } from '../../data/education';
import { GlowCard } from '../primitives/GlowCard';
import { GlassSection } from '../primitives/GlassSection';

export const EducationSection: React.FC = () => {
  return (
    <GlassSection
      id="education"
      badge="Academic Foundation"
      title="Education & Engineering Degree"
      subtitle="Rigorous foundational coursework in Information Technology, Software Architectures, Algorithms, and Artificial Intelligence."
    >
      <div className="max-w-3xl">
        <GlowCard
          id="education-main-card"
          accent="cyan"
          meta={educationData.period}
          title={`${educationData.degree} in ${educationData.field}`}
          subtitle={educationData.institutionFull}
          progress={{
            value: (parseFloat(educationData.cgpa) / 10) * 100,
            label: `CGPA ${educationData.cgpa} / 10`,
          }}
          footerLeft={
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500">
              Undergraduate Engineering Degree
            </span>
          }
        >
          <div>
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">
              Academic Focus & Key Highlights
            </span>
            <ul className="space-y-2">
              {educationData.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-neutral-300">
                  <span className="text-slate-400 mt-0.5 shrink-0">—</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlowCard>
      </div>
    </GlassSection>
  );
};
