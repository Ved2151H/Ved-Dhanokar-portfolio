import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { GlowCard } from '../primitives/GlowCard';
import { GlassButton } from '../primitives/GlassButton';
import { GlassContainer } from '../primitives/GlassContainer';
import { GhostWord } from '../primitives/GhostWord';

export const AboutSection: React.FC = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Ved_Dhanokar_Resume1.pdf';
    link.download = 'Ved_Dhanokar_Resume1.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden">
      <GhostWord text="ABOUT" />
      <GlassContainer size="lg">
        <div className="relative mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-300/70 bg-white/60 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05]">
              <span aria-hidden className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-2.5 rounded-full border border-slate-500 dark:border-neutral-300" />
                <span className="size-1 rounded-full bg-slate-600 dark:bg-neutral-200" />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">
                Get To Know Me
              </span>
            </span>
          </div>
          <h2 id="about-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6 text-base sm:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
              <p>
                I am a full-stack developer and AI/ML enthusiast, currently pursuing a B.Tech in Information Technology. I focus on building robust, real-world solutions that combine modern web technologies with the power of machine learning and computer vision.
              </p>
              <p>
                From developing real-time accident detection systems to RAG-based AI assistants and enterprise multi-tenant platforms, I enjoy turning complex ideas into impactful products. I prioritize clarity, performance, and usability in every system I architect.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
              <GlassButton
                id="about-resume-download-btn"
                variant="primary"
                size="md"
                onClick={handleDownloadResume}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </GlassButton>

              <a href="#projects" className="text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                <span>Explore Featured Systems</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlowCard accent="blue">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 text-center">AI / ML</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono text-center">Computer Vision, RAG & LLMs</p>
            </GlowCard>

            <GlowCard accent="teal">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 text-center">Full-Stack</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono text-center">MERN Stack, Scalable Architectures</p>
            </GlowCard>

            <GlowCard accent="amber">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 text-center">Problem Solving</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono text-center">DSA & Logic, Engineering Algorithms</p>
            </GlowCard>

            <GlowCard accent="violet">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 text-center">Continuous Learning</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono text-center">New Tech, Better Solutions</p>
            </GlowCard>

            <div className="sm:col-span-2 mt-2">
              <GlowCard accent="cyan">
                <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-neutral-200 leading-relaxed italic mb-4 text-center">
                  "Technology is most powerful when it solves real problems."
                </p>
                <div className="text-center">
                  <span className="font-semibold text-slate-900 dark:text-white block">Ved Dhanokar</span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">AI/ML & Full-Stack</span>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </GlassContainer>
    </section>
  );
};
