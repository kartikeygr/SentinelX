import { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  Cpu,
  Sparkles,
  Terminal,
  Activity,
  LockKeyhole,
} from "lucide-react";
import { getRiskStyle, safeParseKeywords } from "../utils/formatters";

export default function ThreatResult({
  result,
  riskLevel,
  keywords = [],
  recommendation,
  engineUsed,
  analysisMode,
}) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const risk = getRiskStyle(riskLevel);
  const parsedKeywords = safeParseKeywords(keywords);

  const getRiskIcon = () => {
    const l = String(riskLevel || "").toLowerCase();
    if (l.includes("high")) return <ShieldAlert className="w-5 h-5 text-red-400" />;
    if (l.includes("med")) return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    if (l.includes("low")) return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    return <HelpCircle className="w-5 h-5 text-slate-400" />;
  };

  const handleCopyReport = () => {
    const payload = JSON.stringify(
      {
        result,
        riskLevel,
        keywords: parsedKeywords,
        recommendation,
        engine: engineUsed,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    );
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 report-fade-in">
      {/* Result HUD Card */}
      <div className={`relative bg-[#070B14]/95 border ${risk.border} rounded-2xl p-6 sm:p-8 backdrop-blur-xl ${risk.glow} transition-all`}>
        {/* Corner security markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg" />

        {/* HUD Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${risk.bgSubtle} border ${risk.border}`}>
              {getRiskIcon()}
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                THREAT ASSESSMENT REPORT
              </div>
              <h3 className="text-xl font-bold font-mono text-white tracking-tight">
                Forensic Analysis Complete
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Risk Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide ${risk.badge}`}>
              <span className={`w-2 h-2 rounded-full ${risk.dot} animate-pulse`} />
              <span>{risk.label}</span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              title="Copy JSON Forensic Report"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Primary Classification Block */}
        <div className={`mt-6 bg-[#0B101C]/80 border border-slate-800/90 border-l-4 ${risk.leftBar} rounded-xl p-5 sm:p-6 shadow-inner`}>
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Threat Status
            </span>

           {engineUsed && (
  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800">
    {analysisMode === "password" ? (
      <>
        <LockKeyhole className="w-3 h-3 text-cyan-400" />
        <span>Engine: Local Password Audit</span>
      </>
    ) : engineUsed === "local" ? (
      <>
        <Cpu className="w-3 h-3 text-cyan-400" />
        <span>Engine: sentinelx-local (Local Offline)</span>
      </>
    ) : (
      <>
        <Sparkles className="w-3 h-3 text-emerald-400" />
        <span>Engine: Gemini API (Cloud)</span>
      </>
    )}
  </span>
)}
          </div>
          <p className="text-slate-100 text-lg font-mono font-medium leading-relaxed break-words">
            {result}
          </p>
        </div>

        {/* Secondary Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Suspicious Keywords */}
          <div className="bg-[#0B101C]/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
{analysisMode === "password"
  ? "Password Security Indicators"
  : "Suspicious Keywords & Artifacts"}
            </h4>

            {parsedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {parsedKeywords.map((word, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium bg-red-950/20 text-red-300 border border-red-800/40 rounded-lg px-2.5 py-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400" />
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs font-mono">
                {analysisMode === "password"
  ? "No significant password weaknesses detected."
  : "No specific malicious indicators identified."}
              </p>
            )}
          </div>

          {/* Actionable Recommendation */}
          <div className="bg-[#0B101C]/80 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <AlertTriangle className={`w-3.5 h-3.5 ${risk.text}`} />
              Security Protocol & Recommendation
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {recommendation || "Maintain standard vigilance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
