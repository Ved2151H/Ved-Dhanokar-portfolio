import React from 'react';
import { experienceData } from '../../data/experience';
import { GlowCard } from '../primitives/GlowCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassContainer } from '../primitives/GlassContainer';
import { GhostWord } from '../primitives/GhostWord';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 lg:py-24">
      <GhostWord text="EXPERIENCE" />
      <GlassContainer size="lg">
        <div className="relative mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
              <span aria-hidden className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-2.5 rounded-full border border-slate-500 dark:border-neutral-300" />
                <span className="size-1 rounded-full bg-slate-600 dark:bg-neutral-200" />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">
                Work Experience
              </span>
            </span>
          </div>
          <h2 id="experience-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering Experience
          </h2>
        </div>

        <div className="max-w-3xl space-y-6">
          {experienceData.map((exp) => (
            <GlowCard
              id={`experience-card-${exp.id}`}
              key={exp.id}
              accent="blue"
              meta={
                <span className="flex flex-wrap items-center gap-2">
                  <span>{exp.period}</span>
                  {exp.isCurrent && (
                    <GlassPill variant="accent" dot={true} dotColor="bg-emerald-500">
                      Present
                    </GlassPill>
                  )}
                </span>
              }
              title={exp.role}
              subtitle={exp.company}
              footerLeft={
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500">
                  {exp.technologies.length} technologies
                </span>
              }
              footerRight={exp.location}
            >
              <ul className="space-y-2.5 mb-6">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                    <span className="text-slate-400 mt-1 shrink-0">—</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-2.5">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </GlassContainer>
    </section>
  );
};
