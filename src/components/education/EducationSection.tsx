import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { educationData } from '../../data/education';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const EducationSection: React.FC = () => {
  return (
    <GlassSection
      id="education"
      badge="Academic Foundation"
      badgeIcon={<GraduationCap className="w-3.5 h-3.5" />}
      title="Education & Engineering Degree"
      subtitle="Rigorous foundational coursework in Information Technology, Software Architectures, Algorithms, and Artificial Intelligence."
    >
      <div className="max-w-3xl mx-auto">
        <GlassCard
          id="education-main-card"
          material="secondary"
          variant="interactive"
          specular={true}
          className="p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] hover:border-cyan-500/40"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mt-1">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block mb-1 font-semibold">
                  Undergraduate Engineering Degree
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {educationData.degree} in {educationData.field}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-neutral-300 mt-1">
                  {educationData.institutionFull}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 bg-slate-100/80 sm:bg-transparent dark:bg-white/[0.03] p-3 sm:p-0 rounded-xl sm:rounded-none">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-300/80 dark:border-cyan-500/40 px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-bold">CGPA: {educationData.cgpa}</span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {educationData.period}
              </span>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200 dark:border-white/[0.08] space-y-2.5">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
              Academic Focus & Key Highlights:
            </span>
            {educationData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </GlassSection>
  );
};
