import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { GlassCard } from '../primitives/GlassCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassSection } from '../primitives/GlassSection';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('sure-trust');

  return (
    <GlassSection
      id="experience"
      badge="Professional Experience"
      badgeIcon={<Briefcase className="w-3.5 h-3.5" />}
      title="Engineering & Applied Machine Learning Roles"
      subtitle="Hands-on experience developing deep learning models, training neural architectures, and preprocessing data for real-world intelligence applications."
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Timeline Vertical Track Line */}
        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500/40 to-transparent pointer-events-none"
        />

        <div className="space-y-8">
          {experienceData.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="relative pl-10 sm:pl-20">
                {/* Timeline Node Point */}
                <div
                  className="absolute left-2 sm:left-6 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-white dark:bg-[#05070c] border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)] z-10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300 animate-pulse" />
                </div>

                {/* Interactive Experience Glass Card */}
                <GlassCard
                  id={`experience-card-${exp.id}`}
                  material="secondary"
                  variant="interactive"
                  specular={true}
                  className="p-6 sm:p-7 border border-slate-200 dark:border-white/[0.1] hover:border-cyan-500/40 cursor-pointer transition-all duration-300"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                          {exp.company}
                        </span>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            Present Role
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities list directly from resume */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                      Core Responsibilities & Technical Deliverables:
                    </span>
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Utilized */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2.5">
                      Tooling & Frameworks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <GlassPill key={tech} variant="default" className="text-xs">
                          {tech}
                        </GlassPill>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </GlassSection>
  );
};
