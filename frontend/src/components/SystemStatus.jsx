import { Sparkles, Cpu, Database, CheckCircle2, ShieldCheck, Layers } from "lucide-react";

export default function SystemStatus({ historyTotal = 0 }) {
  const systems = [
    {
      id: "gemini",
      name: "Google Gemini API",
      category: "Cloud Intelligence",
      status: "Available / Online",
      badgeType: "emerald",
      icon: Sparkles,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      description:
        "High-performance cloud LLM engine for multi-vector contextual reasoning, semantic heuristic analysis, and phishing classification.",
      tags: ["Cloud AI", "Model: gemini-3.6-flash", "Heuristic Vectoring"],
    },
    {
      id: "ollama",
      name: "Local LLM (sentinelx-local)",
      category: "Air-Gapped Offline AI",
      status: "Local / Offline AI",
      badgeType: "cyan",
      icon: Cpu,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/30",
      description:
        "On-device Ollama neural model running locally on localhost:11434. Operates in air-gapped mode with zero external telemetry egress.",
      tags: ["On-Device Ollama", "Zero Egress", "Autonomous Failover"],
    },
    {
      id: "sqlite",
      name: "SQLite Database",
      category: "Local Persistence",
      status: "Configured / Local",
      badgeType: "blue",
      icon: Database,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/30",
      description:
        "Embedded better-sqlite3 engine storing historical threat assessments, risk scores, keyword extractions, and chronological incident logs.",
      tags: ["Embedded DB", "Zero Config", `Logged: ${historyTotal} Records`],
    },
  ];

  return (
    <section id="system-status" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Architecture Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-mono">
            System Status & Readiness
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
            SentinelX combines cloud intelligence and air-gapped local AI with
            zero external data dependencies when operating in offline mode.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-lg bg-[#0A101C] border border-slate-800 text-xs font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Multi-Engine Defense Active</span>
        </div>
      </div>

      {/* 3 Dedicated System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {systems.map((sys) => {
          const Icon = sys.icon;
          return (
            <div
              key={sys.id}
              className="relative group bg-[#0A0E17]/80 hover:bg-[#0E1524]/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] flex flex-col justify-between"
            >
              {/* Corner tech accents */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/40" />
              </div>

              <div>
                {/* Header with Icon and Status */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border ${sys.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${sys.iconColor}`} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${
                      sys.badgeType === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : sys.badgeType === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        sys.badgeType === "emerald"
                          ? "bg-emerald-400 animate-pulse"
                          : sys.badgeType === "cyan"
                          ? "bg-cyan-400 animate-pulse"
                          : "bg-blue-400"
                      }`}
                    />
                    {sys.status}
                  </span>
                </div>

                {/* Subtitle & Name */}
                <div className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider mb-1">
                  {sys.category}
                </div>
                <h3 className="text-lg font-bold text-white font-mono mb-3">
                  {sys.name}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {sys.description}
                </p>
              </div>

              {/* Tags footer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5 font-mono text-[11px]">
                {sys.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
