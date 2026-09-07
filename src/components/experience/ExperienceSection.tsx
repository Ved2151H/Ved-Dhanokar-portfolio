import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { GlassCard } from '../primitives/GlassCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassContainer } from '../primitives/GlassContainer';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Refraction Light */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 blur-[140px] pointer-events-none rounded-full"
      />

      <GlassContainer size="lg">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[1.5px] bg-cyan-500" />
            <span className="text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              Work Experience
            </span>
          </div>
          <h2
            id="experience-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 dark:from-cyan-300 dark:to-sky-200">
              Experience
            </span>
          </h2>
        </div>

        {/* Liquid Glass Timeline Container */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Glowing Cyan Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-7 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500/50 to-transparent pointer-events-none"
          />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <div key={exp.id} className="relative pl-10 sm:pl-16">
                {/* Glowing Node Marker */}
                <div className="absolute left-2 sm:left-5 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-white dark:bg-[#05070c] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Primary Liquid Glass Experience Card */}
                <GlassCard
                  id={`experience-card-${exp.id}`}
                  material="secondary"
                  variant="interactive"
                  specular={true}
                  className="p-6 sm:p-7 border border-slate-200/80 dark:border-white/[0.1] hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                          {exp.company}
                        </span>
                        {exp.isCurrent && (
                          <GlassPill variant="accent" dot={true} dotColor="bg-emerald-400">
                            Present
                          </GlassPill>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {exp.period}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities list directly from resume */}
                  <div className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-1" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tooling and Framework Tags */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08]">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2.5">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white/60 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200/70 dark:border-white/[0.08] backdrop-blur-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </GlassContainer>
    </section>
  );
};
