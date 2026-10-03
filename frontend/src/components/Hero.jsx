import { Shield, ArrowRight, History, Terminal, Cpu, Lock, Sparkles } from "lucide-react";

export default function Hero({ onStartAnalysis, onViewHistory }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-5 sm:px-8 py-20 overflow-hidden cyber-grid"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-cyan-500/[0.08] rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-80 h-80 bg-blue-600/[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative scanline beam */}
      <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none animate-scan" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Telemetry pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full border border-cyan-500/30 bg-[#0A101D]/80 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
            AI Threat Intelligence Platform
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200">
            HYBRID AI
          </span>
        </div>

        {/* Tactical Animated Reticle / Shield Visual */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Outer rotating telemetry ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-radar" />
          
          {/* Second ring with corner accents */}
          <div className="absolute inset-2 rounded-full border border-slate-700/60" />
          
          {/* Target reticle crosshairs */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-cyan-500/20" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-cyan-500/20" />
          
          {/* Inner glowing core with Shield */}
          <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border border-cyan-500/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.25)]">
            <Shield className="w-8 h-8 sm:w-9 sm:h-9 text-cyan-300" />
          </div>

          {/* Micro HUD status badges */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400/80 bg-[#05080E] px-1 border border-cyan-500/20 rounded">
            ARMED
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl">
          Detect threats before they{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            become incidents.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-slate-400 mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-sans">
          SentinelX uses contextual AI to analyze suspicious messages, identify
          potential cyber threats, and provide clear security recommendations.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold font-mono text-sm px-8 py-3.5 rounded-xl transition-all shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Terminal className="w-4 h-4" />
            <span>Start Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewHistory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B1220]/90 hover:bg-[#111B30] text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 font-mono text-sm px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>View Threat History</span>
          </button>
        </div>

        {/* Telemetry metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mt-16 w-full max-w-3xl pt-8 border-t border-slate-800/80 text-left font-mono">
          <div className="bg-[#0A101C]/60 border border-slate-800/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>HYBRID CORES</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              Cloud + Air-Gapped AI
            </div>
          </div>

          <div className="bg-[#0A101C]/60 border border-slate-800/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>PRIVACY FIRST</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              Zero Data Egress Option
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-[#0A101C]/60 border border-slate-800/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>FORENSIC TELEMETRY</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              Deterministic Schema
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
