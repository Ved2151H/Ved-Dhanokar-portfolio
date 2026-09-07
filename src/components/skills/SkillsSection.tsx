import React, { useState } from 'react';
import {
  Code2,
  Layers,
  Database,
  Terminal,
  Cpu,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { GlassCard } from '../primitives/GlassCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassSection } from '../primitives/GlassSection';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

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
      badgeIcon={<Cpu className="w-3.5 h-3.5" />}
      title="Categorized Technical Architecture"
      subtitle="A strictly verified inventory of programming languages, deep learning frameworks, database engines, and developer pipelines."
    >
      {/* Category Filter & Search Bar */}
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.07] focus:bg-white dark:focus:bg-[#0c1220] border border-slate-200 dark:border-white/[0.1] focus:border-cyan-500 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-sm dark:shadow-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              id="filter-all-skills"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-white dark:bg-white/[0.03] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06]'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm dark:shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-white dark:bg-white/[0.03] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.06]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <GlassCard
            key={category.id}
            id={`skill-card-${category.id}`}
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-6 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  {getCategoryIcon(category.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    {category.skills.length} competencies
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-5">
                {category.description}
              </p>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100/80 dark:bg-white/[0.04] hover:bg-cyan-500/15 text-slate-700 dark:text-neutral-200 hover:text-cyan-700 dark:hover:text-cyan-200 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-400/40 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
              <span>Source: Resume</span>
              <span className="text-cyan-600 dark:text-cyan-400/80 font-medium">Production Ready</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassSection>
  );
};
