import React from 'react';
import { achievementsData } from '../../data/achievements';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const AchievementsSection: React.FC = () => {
  return (
    <GlassSection
      id="achievements"
      badge="Honors & Recognition"
      title="Hackathon Accolades & Competitions"
      subtitle="Competitive achievements across national smart city hackathons, sensor-driven design challenges, and algorithmic programming contests."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {achievementsData.map((item) => (
          <GlassCard
            key={item.id}
            id={`achievement-card-${item.id}`}
            className="p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-2">
                {item.title}
              </h3>

              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">
                {item.organization}
              </span>

              {item.description && (
                <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-500 font-mono">
              <span>National & Collegiate Level</span>
              <span className="font-medium text-slate-700 dark:text-neutral-400">Competitive Result</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassSection>
  );
};
