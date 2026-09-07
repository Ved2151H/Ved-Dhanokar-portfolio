/**
 * Type definitions for portfolio data architecture.
 * Strictly mirrors the resume and user specification without fabricated statistics.
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
  leetcode: string;
  email: string;
}

export interface Profile {
  fullName: string;
  displayName: string;
  headline: string;
  subheadline: string;
  bio: string;
  currentRole: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  email: string;
  socials: SocialLinks;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  category: 'Computer Vision & AI' | 'Sensors & IoT' | 'Full-Stack MERN' | 'GenAI & RAG' | 'Enterprise Multi-Tenant';
  isFeatured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  institutionFull: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  badge: string;
  description?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
