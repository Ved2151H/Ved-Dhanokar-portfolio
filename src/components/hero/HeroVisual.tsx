import React, { useState } from 'react';
import { Eye, Cpu, Database, Server, Sparkles, Activity, ShieldCheck, Play } from 'lucide-react';
import { GlassCard } from '../primitives/GlassCard';

type VisualMode = 'cv' | 'rag' | 'fullstack';

export const HeroVisual: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VisualMode>('cv');
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto">
      {/* Ambient background glow behind visual */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Glass Workspace Console */}
      <GlassCard
        id="hero-developer-console"
        material="primary"
        variant="elevated"
        accent="cyan"
        specular={true}
        className="border border-slate-200/90 dark:border-white/[0.12] p-4 sm:p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)]"
      >
        {/* Workspace Top Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 border border-red-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 border border-yellow-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 border border-green-400/50" />
            </div>
            <span className="text-xs text-neutral-400 font-mono ml-2">ved-dhanokar@ai-workstation</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
            <button
              id="hero-tab-cv"
              onClick={() => setActiveMode('cv')}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
                activeMode === 'cv'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              CV & YOLO
            </button>
            <button
              id="hero-tab-rag"
              onClick={() => setActiveMode('rag')}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
                activeMode === 'rag'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              RAG & LLM
            </button>
            <button
              id="hero-tab-fullstack"
              onClick={() => setActiveMode('fullstack')}
              className={`px-2 py-1 text-[11px] font-medium rounded transition-all cursor-pointer ${
                activeMode === 'fullstack'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Full-Stack
            </button>
          </div>
        </div>

        {/* Dynamic Display based on active mode */}
        {activeMode === 'cv' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Real-Time Computer Vision HUD Screen */}
            <div className="relative h-44 sm:h-52 rounded-xl bg-[#060a12] border border-cyan-500/20 p-3 overflow-hidden flex flex-col justify-between">
              {/* Grid overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"
              />

              {/* HUD Header */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>YOLOv8 + ByteTrack Stream</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">FPS: 48.2</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-[10px]">
                    LIVE TELEMETRY
                  </span>
                </div>
              </div>

              {/* Simulated Object Detection Bounding Box */}
              <div className="relative z-10 my-auto">
                <div className="border border-cyan-400 bg-cyan-400/10 rounded-md p-2.5 max-w-[240px] mx-auto shadow-[0_0_20px_rgba(6,182,212,0.25)] relative group">
                  <div className="absolute -top-3 left-2 bg-cyan-900 border border-cyan-400 px-1.5 py-0.2 text-[10px] font-mono text-cyan-200 rounded">
                    Vehicle #04 · Conf: 98.6%
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300 mt-1">
                    <span>Trajectory: Stable</span>
                    <span className="text-emerald-400">Normal Vector</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>ByteTrack ID: 8942</span>
                    <span>Lat/Lng Active</span>
                  </div>
                </div>
              </div>

              {/* HUD Footer status */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-cyan-500/10 pt-2">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Activity className="w-3 h-3" /> LSTM Anomaly Scorer: Nominal
                </span>
                <span>ByteTrack v2.1</span>
              </div>
            </div>

            {/* Sub-Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Inference</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-neutral-100 font-mono">14.2 ms</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Tracking</span>
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-300 font-mono">ByteTrack</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">GPS Sync</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Synced</span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'rag' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* RAG & Local LLM Inspector Screen */}
            <div className="relative h-44 sm:h-52 rounded-xl bg-[#060a12] border border-purple-500/20 p-3 overflow-hidden flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-purple-300">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>DocuMind RAG Pipeline</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-[10px] text-purple-200">
                  Ollama Local LLM
                </span>
              </div>

              {/* RAG Flow visualization */}
              <div className="space-y-2 my-auto">
                <div className="flex items-center gap-2 p-2 rounded bg-purple-950/20 border border-purple-500/20 text-[11px]">
                  <span className="text-purple-400 shrink-0 font-bold">Q:</span>
                  <span className="text-neutral-200 truncate">Retrieve incident anomalies from document chunks...</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 px-1">
                  <span>Cosine Similarity: 0.942</span>
                  <span className="text-cyan-400">Embeddings: Local Vector</span>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06] text-[11px] text-neutral-300">
                  <span className="text-emerald-400 font-semibold">Context Match:</span> Verified chunk in 18ms. Zero third-party cloud data egress.
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-purple-500/10 pt-2">
                <span>Model: Mistral/Llama via Ollama</span>
                <span className="text-purple-300">Semantic Search Active</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Privacy</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">100% Local</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Chunking</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-neutral-100 font-mono">Hierarchical</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Latency</span>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-300 font-mono">&lt; 250ms</span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'fullstack' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Full-Stack Architecture Stream */}
            <div className="relative h-44 sm:h-52 rounded-xl bg-[#060a12] border border-blue-500/20 p-3 overflow-hidden flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-blue-300">
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                  <span>MERN Multi-Tenant Cluster</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-[10px] text-blue-200">
                  Node / Express / Mongo
                </span>
              </div>

              {/* Architecture layers */}
              <div className="space-y-1.5 my-auto text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-cyan-300">GET /api/v1/tenants/patil-petroleum</span>
                  <span className="text-emerald-400 text-[10px]">200 OK (38ms)</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-cyan-300">POST /api/v1/attendance/verify</span>
                  <span className="text-emerald-400 text-[10px]">201 Created</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-neutral-400">RBAC Isolation Layer</span>
                  <span className="text-blue-300 text-[10px]">Active Multi-Tenant</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-blue-500/10 pt-2">
                <span>MongoDB Replica Cluster</span>
                <span className="text-emerald-400">Zero Leakage Enforced</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Frontend</span>
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-300 font-mono">React / Axios</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">API Gateway</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-neutral-100 font-mono">Express REST</span>
              </div>
              <div className="bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-lg p-2">
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono block">Database</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">MongoDB/Mongoose</span>
              </div>
            </div>
          </div>
        )}

        {/* Code signature footer */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Systems: CV · DL · RAG · MERN</span>
          </div>
          <span className="text-neutral-500">B.Tech IT 2023–27</span>
        </div>
      </GlassCard>
    </div>
  );
};
