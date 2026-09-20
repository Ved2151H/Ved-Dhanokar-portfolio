import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, Github } from 'lucide-react';
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
      title="Featured AI & Full-Stack Systems"
      subtitle="Production-grade implementations spanning real-time computer vision, zero-interaction IoT telemetry, private RAG pipelines, and enterprise multi-tenancy."
    >
      {/* Featured Project */}
      <div className="mb-12">
        <GlassCard
          id="featured-project-card"
          className="p-6 sm:p-8 lg:p-10 transition-all duration-300 group cursor-pointer"
          onClick={() => handleOpenProject(featuredProject)}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    FLAGSHIP SYSTEM
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                    {featuredProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-neutral-300 mb-4">
                  {featuredProject.subtitle}
                </p>

                <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Key Features */}
                <ul className="space-y-2 mb-6">
                  {featuredProject.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-neutral-300">
                      <span className="text-slate-400 mt-1">-</span>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.technologies.map((tech) => (
                    <GlassPill key={tech} className="text-xs">
                      {tech}
                    </GlassPill>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <GlassButton
                    variant="primary"
                    size="sm"
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
                      className="text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Secondary Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondaryProjects.map((project) => (
          <GlassCard
            key={project.id}
            id={`project-card-${project.id}`}
            className="p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
            onClick={() => handleOpenProject(project)}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {project.badge}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-xs font-medium text-slate-600 dark:text-neutral-400 mb-3">
                {project.subtitle}
              </p>

              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-neutral-400 rounded text-[11px] font-medium border border-slate-200 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[11px] text-slate-500 dark:text-neutral-500 self-center px-1">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                <span className="font-mono">{project.category}</span>
                <span className="text-slate-900 dark:text-white group-hover:underline flex items-center gap-1 font-medium">
                  Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </GlassCard>
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
