import React from 'react';
import { GraduationCap, Briefcase, Award, Cpu, Code2, Eye, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GlassCard } from '../primitives/GlassCard';
import { GlassSection } from '../primitives/GlassSection';

export const AboutSection: React.FC = () => {
  return (
    <GlassSection
      id="about"
      badge="Background & Expertise"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title="Engineering Scalable Systems with Applied Intelligence"
      subtitle="Synthesizing robust full-stack software architecture with deep machine learning and computer vision to build high-impact real-world solutions."
    >
      {/* 3 Core Stats Cards Grid (Strictly from resume, no fake stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <GlassCard
          id="about-stat-education"
          material="secondary"
          variant="interactive"
          specular={true}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 uppercase tracking-wider block">Degree</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">B.Tech in IT</h4>
            <span className="text-xs text-slate-500 dark:text-neutral-400">2023 – 2027</span>
          </div>
        </GlassCard>

        <GlassCard
          id="about-stat-cgpa"
          material="secondary"
          variant="interactive"
          specular={true}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-blue-700 dark:text-blue-300 uppercase tracking-wider block">Academic Standing</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">8.45 CGPA</h4>
            <span className="text-xs text-slate-500 dark:text-neutral-400">IICT, MGM University</span>
          </div>
        </GlassCard>

        <GlassCard
          id="about-stat-experience"
          material="secondary"
          variant="interactive"
          specular={true}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-purple-700 dark:text-purple-300 uppercase tracking-wider block">Active Role</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">AI/ML Intern</h4>
            <span className="text-xs text-slate-500 dark:text-neutral-400">SURE Trust · Nov 2025 – Present</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Glass Cards Grid: Core Competencies from resume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Narrative Glass Card */}
        <div className="lg:col-span-7">
          <GlassCard
            id="about-narrative-card"
            material="primary"
            variant="default"
            specular={true}
            className="p-6 sm:p-8 h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <Code2 className="w-4 h-4" />
                <span>TECHNICAL PROFILE & ARCHITECTURAL PHILOSOPHY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                Bridging the Gap Between Research-Grade AI and Production-Ready Software
              </h3>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed mb-4 text-sm sm:text-base">
                I am a dedicated Information Technology undergraduate at MGM University's Institute of Information and Communication Technology, currently serving as an AI/ML Intern at SURE Trust.
              </p>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                My work centers on solving critical challenges through data-driven intelligence: from implementing real-time vehicular accident tracking using YOLOv8 and ByteTrack, to building private document intelligence assistants with local LLMs and Retrieval-Augmented Generation (RAG), to constructing enterprise multi-tenant platforms on the MERN stack.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-mono">Institution: IICT, MGM University</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">Full-Stack & Applied AI</span>
            </div>
          </GlassCard>
        </div>

        {/* 4 Focused Highlights Glass Pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard
            id="about-pillar-cv"
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-5"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Real-Time Computer Vision</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              YOLOv8, ByteTrack, OpenCV, spatio-temporal video streams, and live dashboard monitoring.
            </p>
          </GlassCard>

          <GlassCard
            id="about-pillar-rag"
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-5"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">RAG & Local LLMs</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              Retrieval-Augmented Generation, vector semantic search, chunking, and Ollama local execution.
            </p>
          </GlassCard>

          <GlassCard
            id="about-pillar-mern"
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-5"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">MERN Architecture</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              React.js, Node.js, Express, MongoDB, RESTful APIs, Mongoose modeling, and role-based access.
            </p>
          </GlassCard>

          <GlassCard
            id="about-pillar-dl"
            material="secondary"
            variant="interactive"
            specular={true}
            className="p-5"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Deep Learning Workflows</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              TensorFlow, PyTorch, Scikit-learn, ANN, CNN, RNN, data preprocessing, and model evaluation.
            </p>
          </GlassCard>
        </div>
      </div>
    </GlassSection>
  );
};
