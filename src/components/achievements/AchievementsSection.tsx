import React from 'react';
import { achievementsData } from '../../data/achievements';
import { GlowCard, glowAccentFor } from '../primitives/GlowCard';
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
        {achievementsData.map((item, index) => (
          <GlowCard
            key={item.id}
            id={`achievement-card-${item.id}`}
            accent={glowAccentFor(index)}
            className="h-full"
            meta={item.badge}
            title={item.title}
            titleClassName="text-lg! sm:text-xl!"
            subtitle={item.organization}
            subtitleClassName="font-mono text-xs uppercase tracking-wider"
            footerLeft={
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500">
                National & Collegiate Level
              </span>
            }
            footerRight="Competitive Result"
          >
            {item.description && (
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed text-center">
                {item.description}
              </p>
            )}
          </GlowCard>
        ))}
      </div>
    </GlassSection>
  );
};
