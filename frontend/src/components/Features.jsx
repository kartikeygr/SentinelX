import { Shield, Link, LockKeyhole, Sparkles, CheckCircle2, Clock } from "lucide-react";

export default function Features({
  onUrlAnalysis,
  onPasswordAnalysis,
}) {
  const capabilities = [
    {
      title: "Scam & Phishing Detection",
      status: "OPERATIONAL",
      isLive: true,
      icon: Shield,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/30",
      description:
        "Analyzes deceptive email headers, urgent psychological triggers, SMS phishing lures, impersonation attempts, and social engineering attack patterns using contextual AI.",
      highlights: [
        "Credential harvesting detection",
        "Urgency & coercion linguistic analysis",
        "Impersonation and spoofing indicators",
      ],
    },
    {
      title: "Malicious URL Analysis",
      status: "OPERATIONAL",
isLive: true,
      icon: Link,
      iconColor: "text-slate-400",
      iconBg: "bg-slate-800/50 border-slate-700/50",
      description:
  "Analyzes URLs for phishing patterns, suspicious domain structures, impersonation indicators, and other potential web-based threats using contextual AI.",
      highlights: [
        "Homograph & typosquatting detection",
        "Redirection hop-count evaluation",
        "Domain reputation heuristics",
      ],
    },
    {
  title: "Password & Credential Auditing",
  status: "OPERATIONAL",
  isLive: true,
  icon: LockKeyhole,
  iconColor: "text-cyan-400",
  iconBg: "bg-cyan-500/10 border-cyan-500/20",
  description:
    "Evaluates password strength locally using length, character diversity, common patterns, and password composition rules without storing the password.",
  highlights: [
    "Password strength assessment",
    "Character diversity analysis",
    "Common pattern detection",
  ],
},
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 border-t border-slate-800/80">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CYBER INTELLIGENCE CAPABILITIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">
          Defense Modules & Roadmap
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed font-sans">
          Engineered for comprehensive threat mitigation across message payloads,
          with future inspection modules actively in development.
        </p>
      </div>

      {/* Grid of 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <div
  key={i}
  onClick={
  cap.title === "Malicious URL Analysis"
    ? onUrlAnalysis
    : cap.title === "Password & Credential Auditing"
      ? onPasswordAnalysis
      : undefined
}
 role={
  cap.title === "Malicious URL Analysis" ||
  cap.title === "Password & Credential Auditing"
    ? "button"
    : undefined
}
  tabIndex={
  cap.title === "Malicious URL Analysis" ||
  cap.title === "Password & Credential Auditing"
    ? 0
    : undefined
}
  className={`relative group bg-[#0A0E17]/80 rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
    cap.isLive
      ? "border-slate-800 hover:border-cyan-500/50 hover:bg-[#0E1524] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
      : cap.title === "Malicious URL Analysis"
        ? "border-slate-800/70 hover:border-cyan-500/40 hover:bg-[#0E1524] hover:-translate-y-1 cursor-pointer"
        : "border-slate-800/70 hover:border-slate-700 bg-[#090D15]/60 hover:-translate-y-0.5"
  }`}
>
              <div>
                {/* Header row: Icon & Status */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${cap.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${cap.iconColor}`} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border ${
                      cap.isLive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800/80 text-slate-400 border-slate-700/60"
                    }`}
                  >
                    {cap.isLive ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>OPERATIONAL</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>COMING SOON</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-mono text-white mb-3">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                  {cap.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {cap.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-mono text-slate-400"
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        cap.isLive ? "text-cyan-400" : "text-slate-600"
                      }`}
                    />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
