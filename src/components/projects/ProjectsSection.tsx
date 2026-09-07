import React, { useState } from 'react';
import {
  Eye,
  Activity,
  Layers,
  Sparkles,
  Building2,
  ShoppingCart,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Radio,
  FileText,
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { GlassCard } from '../primitives/GlassCard';
import { GlassPill } from '../primitives/GlassPill';
import { GlassButton } from '../primitives/GlassButton';
import { GlassSection } from '../primitives/GlassSection';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProject = projectsData.find((p) => p.isFeatured) || projectsData[0];
  const secondaryProjects = projectsData.filter((p) => p.id !== featuredProject.id);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <GlassSection
      id="projects"
      badge="Engineering Showcase"
      badgeIcon={<Layers className="w-3.5 h-3.5" />}
      title="Featured AI & Full-Stack Systems"
      subtitle="Production-grade implementations spanning real-time computer vision, zero-interaction IoT telemetry, private RAG pipelines, and enterprise multi-tenancy."
    >
      {/* 1. Visually Dominant Featured Project: Accident Detection System */}
      <div className="mb-12">
        <GlassCard
          id="featured-project-card"
          material="primary"
          variant="glow"
          specular={true}
          className="p-6 sm:p-8 lg:p-10 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group cursor-pointer"
          onClick={() => handleOpenProject(featuredProject)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Project Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Eye className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                    FLAGSHIP SYSTEM · COMPUTER VISION & AI
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Real-Time Pipeline
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-700 dark:group-hover:text-cyan-200 transition-colors mb-3">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-cyan-700 dark:text-cyan-300/90 mb-4">
                  {featuredProject.subtitle}
                </p>

                <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Key Features Pill list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {featuredProject.keyFeatures.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featuredProject.technologies.map((tech) => (
                    <GlassPill key={tech} variant="default" className="text-xs group-hover:border-cyan-500/30">
                      {tech}
                    </GlassPill>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                  <GlassButton
                    variant="primary"
                    size="sm"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    iconPosition="right"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProject(featuredProject);
                    }}
                  >
                    View System Architecture
                  </GlassButton>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                    YOLOv8 + ByteTrack + Geolocation
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual HUD Simulation Container */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#060a14] border border-cyan-500/30 p-4 sm:p-5 overflow-hidden shadow-2xl">
                {/* Background radar grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(#06b6d415_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
                />

                {/* HUD Top Bar */}
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-cyan-500/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>SURVEILLANCE NODE: CCTV_LIVE_08</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-[10px] text-cyan-300 border border-cyan-500/40">
                    60 FPS
                  </span>
                </div>

                {/* Telemetry Tracking Visual */}
                <div className="space-y-3 py-2">
                  <div className="border border-dashed border-cyan-400/60 bg-cyan-500/5 rounded-lg p-3 relative">
                    <div className="absolute -top-2.5 right-3 bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/40 rounded">
                      ByteTrack ID: #4092
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-200">
                      <span>Target: Sedan_Vehicle</span>
                      <span className="text-emerald-400">Confidence: 99.1%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mt-1">
                      <span>Vector Anomaly: 0.04 (Nominal)</span>
                      <span>Speed: 52 km/h</span>
                    </div>
                  </div>

                  <div className="border border-red-500/60 bg-red-500/10 rounded-lg p-3 relative shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <div className="absolute -top-2.5 right-3 bg-red-950 px-2 py-0.5 text-[10px] font-mono text-red-300 border border-red-500/50 rounded flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-red-400 animate-bounce" />
                      EVENT TRIGGER
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-white font-bold">
                      <span className="text-red-300">COLLISION DETECTED</span>
                      <span className="text-red-400">Decel: -8.4g</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono text-neutral-300 mt-1">
                      <span>LSTM Confidence: 96.8%</span>
                      <span className="text-amber-300">Geo Broadcast: Sent</span>
                    </div>
                  </div>
                </div>

                {/* Live Geolocation Coordinates */}
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>GPS: 19.8762° N, 75.3433° E</span>
                  <span className="text-cyan-400">MDP Filtering: Active</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 2. Secondary 4 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondaryProjects.map((project) => {
          const isDocuMind = project.id === 'documind-ai';
          const isZeroUI = project.id === 'zero-ui-emergency-system';
          const isCommerce = project.id === 'karma-ecommerce';
          const isMultiFirm = project.id === 'multi-firm-management';

          return (
            <GlassCard
              key={project.id}
              id={`project-card-${project.id}`}
              material="secondary"
              variant="interactive"
              specular={true}
              className={`p-6 sm:p-7 flex flex-col justify-between group cursor-pointer ${
                isDocuMind ? 'border-purple-500/25 hover:border-purple-400/50' : ''
              }`}
              onClick={() => handleOpenProject(project)}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${
                      isDocuMind
                        ? 'bg-purple-100/90 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300/80 dark:border-purple-500/30'
                        : isZeroUI
                        ? 'bg-amber-100/90 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/80 dark:border-amber-500/30'
                        : isMultiFirm
                        ? 'bg-emerald-100/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-500/30'
                        : 'bg-blue-100/90 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300/80 dark:border-blue-500/30'
                    }`}
                  >
                    {isDocuMind && <Sparkles className="w-3 h-3 text-purple-500" />}
                    {isZeroUI && <Activity className="w-3 h-3 text-amber-500" />}
                    {isMultiFirm && <Building2 className="w-3 h-3 text-emerald-500" />}
                    {isCommerce && <ShoppingCart className="w-3 h-3 text-blue-500" />}
                    <span>{project.badge}</span>
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-700 dark:group-hover:text-cyan-200 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400/90 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Key feature preview */}
                <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                    Core Capability:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-neutral-200">
                    {project.keyFeatures[0]}
                  </p>
                </div>
              </div>

              {/* Technologies & Footer */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <GlassPill key={tech} variant="default" className="text-[11px]">
                      {tech}
                    </GlassPill>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 self-center px-1">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                  <span className="font-mono">{project.category}</span>
                  <span className="text-cyan-600 dark:text-cyan-400 group-hover:underline flex items-center gap-1 font-medium">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </GlassSection>
  );
};
