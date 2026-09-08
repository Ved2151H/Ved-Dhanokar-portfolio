import React from 'react';
import {
  Download,
  Brain,
  Code2,
  Target,
  TrendingUp,
  Quote,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { GlassCard } from '../primitives/GlassCard';
import { GlassButton } from '../primitives/GlassButton';
import { GlassContainer } from '../primitives/GlassContainer';
import { useTheme } from '../../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { isLight } = useTheme();

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Ved_Dhanokar_Resume1.pdf';
    link.download = 'Ved_Dhanokar_Resume1.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section
      id="about"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full"
      />

      <GlassContainer size="lg">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[1.5px] bg-cyan-500" />
            <span className="text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              Get To Know Me
            </span>
          </div>
          <h2
            id="about-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 dark:from-cyan-300 dark:to-sky-200">
              Me
            </span>
          </h2>
        </div>

        {/* Main Grid: Narrative (Left) & 4 Cards + Quote (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Narrative Story & Resume Action */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-5 text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
              <p>
                I'm a full-stack developer and AI/ML enthusiast, currently pursuing a B.Tech in
                Information Technology. I enjoy building real-world solutions that combine modern web
                technologies with the power of machine learning and computer vision.
              </p>
              <p>
                From developing real-time accident detection systems to RAG-based AI assistants and
                full-stack platforms, I love turning ideas into impactful products. I'm constantly
                learning, experimenting, and building — with a focus on creating technology that
                solves real problems.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center gap-4">
              <GlassButton
                id="about-resume-download-btn"
                variant="primary"
                size="md"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleDownloadResume}
                className="shadow-[0_4px_20px_rgba(2,132,199,0.25)] dark:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
              >
                Download Resume
              </GlassButton>

              <a
                href="#projects"
                className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1 transition-colors"
              >
                <span>Explore Featured Systems</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Competency Cards + Quote Card */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* 4 Cards (Span 7 cols on sm+) */}
            <div className="sm:col-span-7 grid grid-cols-1 gap-3.5">
              {/* Card 1: AI / ML */}
              <GlassCard
                id="about-card-aiml"
                material="secondary"
                variant="interactive"
                specular={true}
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      AI / ML
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      Computer Vision · RAG & LLMs
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 2: Full-Stack */}
              <GlassCard
                id="about-card-fullstack"
                material="secondary"
                variant="interactive"
                specular={true}
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Full-Stack
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      MERN Stack · Scalable Architectures
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 3: Problem Solving */}
              <GlassCard
                id="about-card-problemsolving"
                material="secondary"
                variant="interactive"
                specular={true}
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Problem Solving
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      DSA & Logic · Engineering Algorithms
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Card 4: Continuous Learning */}
              <GlassCard
                id="about-card-learning"
                material="secondary"
                variant="interactive"
                specular={true}
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Continuous Learning
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                      New Tech · Better Solutions
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Tall Quote Card (Span 5 cols on sm+) */}
            <div className="sm:col-span-5 h-full">
              <GlassCard
                id="about-quote-card"
                material="primary"
                variant="interactive"
                specular={true}
                className="p-6 h-full flex flex-col justify-between border-cyan-500/20"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                    <Quote className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-neutral-100 leading-relaxed italic">
                    "Technology is most powerful when it solves real problems."
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
                  <span className="font-handwriting text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-300 font-bold block">
                    Ved Dhanokar
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    AI/ML & Full-Stack
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </GlassContainer>
    </section>
  );
};
