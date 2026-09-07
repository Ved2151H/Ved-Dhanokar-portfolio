import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { AboutSection } from '../components/about/AboutSection';
import { ExperienceSection } from '../components/experience/ExperienceSection';
import { SkillsSection } from '../components/skills/SkillsSection';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { EducationSection } from '../components/education/EducationSection';
import { CertificationsSection } from '../components/certifications/CertificationsSection';
import { AchievementsSection } from '../components/achievements/AchievementsSection';
import { ContactSection } from '../components/contact/ContactSection';

export const HomeScreen: React.FC = () => {
  return (
    <main id="portfolio-main-content" className="relative z-10">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
};
