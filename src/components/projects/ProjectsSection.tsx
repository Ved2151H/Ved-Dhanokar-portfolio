import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { GlassSection } from '../primitives/GlassSection';
import { ProjectModal } from './ProjectModal';
import { CircularProjectsCarousel } from './CircularProjectsCarousel';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <GlassSection
      id="projects"
      ghostWord="PROJECTS"
      badge="Engineering Showcase"
      title="Featured AI & Full-Stack Systems"
      subtitle="Production-grade implementations spanning real-time computer vision, zero-interaction IoT telemetry, private RAG pipelines, and enterprise multi-tenancy."
    >
      <CircularProjectsCarousel projects={projectsData} onSelectProject={handleOpenProject} />

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </GlassSection>
  );
};
