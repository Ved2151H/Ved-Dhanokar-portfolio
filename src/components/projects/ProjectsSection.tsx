import React, { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';
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

  const techTag =
    'px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-medium text-slate-600 dark:text-neutral-300';

  return (
    <GlassSection
      id="projects"
      badge="Engineering Showcase"
      title="Featured AI & Full-Stack Systems"
      subtitle="Production-grade implementations spanning real-time computer vision, zero-interaction IoT telemetry, private RAG pipelines, and enterprise multi-tenancy."
    >
      {/* ── Featured project: large editorial block ── */}
      <article
        id="featured-project-card"
        className="group cursor-pointer"
        onClick={() => handleOpenProject(featuredProject)}
      >
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-4">
          {featuredProject.badge}
        </p>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          {featuredProject.title}
        </h3>

        <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-neutral-300 max-w-3xl mb-3">
          {featuredProject.subtitle}
        </p>

        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl mb-6">
          {featuredProject.description}
        </p>

        <ul className="space-y-2 mb-8 max-w-3xl">
          {featuredProject.keyFeatures.slice(0, 3).map((feat, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed"
            >
              <span className="text-slate-400 dark:text-neutral-500 mt-1 shrink-0">—</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {featuredProject.technologies.map((tech) => (
            <span key={tech} className={techTag}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5 pb-12 border-b border-slate-200 dark:border-slate-800">
          <GlassButton
            variant="primary"
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenProject(featuredProject);
            }}
          >
            View Details
          </GlassButton>
          {featuredProject.githubUrl && (
            <a
              href={featuredProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </article>

      {/* ── Remaining projects: editorial two-column rows ── */}
      <div>
        {secondaryProjects.map((project) => (
          <article
            key={project.id}
            id={`project-card-${project.id}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
            onClick={() => handleOpenProject(project)}
          >
            {/* Left: narrative */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-3">
                {project.badge}
              </p>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 inline-flex items-center gap-1.5">
                {project.title}
                <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>

              <p className="text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">
                {project.subtitle}
              </p>

              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Right: stack + actions */}
            <div className="lg:col-span-5 flex flex-col lg:items-end lg:text-right gap-5 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-10">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className={techTag}>
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="self-center text-[11px] text-slate-500 dark:text-neutral-500 px-1">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:mt-auto">
                <GlassButton
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProject(project);
                  }}
                >
                  View Details
                </GlassButton>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </GlassSection>
  );
};
