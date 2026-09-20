import React from 'react';
import { educationData } from '../../data/education';
import { GlassCard } from '../primitives/GlassCard';
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
        <GlassCard id="education-main-card" className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                Undergraduate Engineering Degree
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                {educationData.degree} in {educationData.field}
              </h3>
              <p className="text-sm font-medium text-slate-600 dark:text-neutral-400">
                {educationData.institutionFull}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <div className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                CGPA: {educationData.cgpa}
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                {educationData.period}
              </span>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
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
        </GlassCard>
      </div>
    </GlassSection>
  );
};
