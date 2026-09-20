import React from 'react';
import { experienceData } from '../../data/experience';
import { GlowCard } from '../primitives/GlowCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassContainer } from '../primitives/GlassContainer';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 lg:py-24">
      <GlassContainer size="lg">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[2px] bg-slate-900 dark:bg-white" />
            <span className="text-xs font-mono tracking-widest text-slate-700 dark:text-neutral-300 uppercase font-semibold">
              Work Experience
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
