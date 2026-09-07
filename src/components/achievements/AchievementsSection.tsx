import React from 'react';
import { Trophy, Medal, Star, Compass, Sparkles } from 'lucide-react';
import { achievementsData } from '../../data/achievements';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const AchievementsSection: React.FC = () => {
  const getAchievementIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 1:
        return <Star className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-emerald-400" />;
      case 3:
      default:
        return <Compass className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <GlassSection
      id="achievements"
      badge="Honors & Recognition"
      badgeIcon={<Trophy className="w-3.5 h-3.5" />}
      title="Hackathon Accolades & Competitions"
      subtitle="Competitive achievements across national smart city hackathons, sensor-driven design challenges, and algorithmic programming contests."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {achievementsData.map((item, idx) => (
          <GlassCard
            key={item.id}
            id={`achievement-card-${item.id}`}
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] flex items-center justify-center">
                  {getAchievementIcon(idx)}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-100 dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-300 border border-sky-300/80 dark:border-cyan-500/30 shadow-xs dark:shadow-[0_0_10px_rgba(6,182,212,0.15)]">
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
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 font-mono">
              <span>National & Collegiate Level</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Competitive Result</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassSection>
  );
};
