import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { GlowCard, glowAccentFor } from '../primitives/GlowCard';
import { GlassSection } from '../primitives/GlassSection';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  const filteredCategories = skillCategories
    .map((cat) => {
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }
      if (!searchQuery.trim()) {
        return cat;
      }
      const matchingSkills = cat.skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingSkills.length > 0 || cat.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return {
          ...cat,
          skills: matchingSkills.length > 0 ? matchingSkills : cat.skills,
        };
      }
      return null;
    })
    .filter(Boolean) as typeof skillCategories;

  return (
    <GlassSection
      id="skills"
      badge="Technical Matrix"
      title="Categorized Technical Architecture"
      subtitle="A verified inventory of programming languages, frameworks, database engines, and developer pipelines."
    >
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => {
          const stableIndex = skillCategories.findIndex((cat) => cat.id === category.id);
          return (
            <GlowCard
              key={category.id}
              id={`skill-card-${category.id}`}
              accent={glowAccentFor(stableIndex)}
              className="h-full"
              meta={`${category.skills.length} technologies`}
              title={category.title}
              subtitle={category.description}
              progress={{
                value: (category.skills.length / totalSkills) * 100,
                label: 'Stack share',
              }}
            >
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800/50 dark:text-neutral-300 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlowCard>
          );
        })}
      </div>
    </GlassSection>
  );
};
