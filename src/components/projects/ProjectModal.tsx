import React from 'react';
import { ExternalLink, Github, CheckCircle2, Cpu, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { GlassModal } from '../primitives/GlassModal';
import { GlassButton } from '../primitives/GlassButton';
import { GlassPill } from '../primitives/GlassPill';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <GlassModal
      id={`project-modal-${project.id}`}
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      badge={project.badge}
    >
      {/* Subtitle */}
      <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
        {project.subtitle}
      </p>

      {/* Description */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-sm text-slate-700 dark:text-neutral-200 leading-relaxed">
        {project.description}
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem */}
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Problem Addressed</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-cyan-950/20 border border-sky-200 dark:border-cyan-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-cyan-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Engineering Solution</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Key Architectural Features */}
      <div>
        <h4 className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
          Key System Capabilities & Technical Innovations:
        </h4>
        <div className="space-y-2">
          {project.keyFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] text-xs text-slate-700 dark:text-neutral-200"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      <div>
        <h4 className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
          Full Technology & Tooling Stack:
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <GlassPill key={tech} variant="default" className="text-xs">
              {tech}
            </GlassPill>
          ))}
        </div>
      </div>

      {/* Modal Actions */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
          Category: {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <GlassButton
              variant="outline"
              size="sm"
              icon={<Github className="w-4 h-4" />}
              asAnchor
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </GlassButton>
          ) : (
            <GlassButton
              variant="outline"
              size="sm"
              icon={<Github className="w-4 h-4" />}
              asAnchor
              href="https://github.com/veddhanokar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </GlassButton>
          )}
          <GlassButton
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Close Details
          </GlassButton>
        </div>
      </div>
    </GlassModal>
  );
};
