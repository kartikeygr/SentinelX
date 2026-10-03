import { useState } from "react";
import {
  Terminal,
  Cpu,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import ThreatResult from "./ThreatResult";

export default function ThreatAnalyzer({
  analysisMode,
  setAnalysisMode,
  threatText,
  setThreatText,
  engine,
  setEngine,
  loading,
  dots,
  onAnalyze,
  result,
  riskLevel,
  keywords,
  recommendation,
  engineUsed,
}) {
  const [activeTab, setActiveTab] = useState("manual");
  

  const samplePresets = [
    {
      title: "Bank Suspension Phishing",
      text: "URGENT: Your primary bank account has been suspended due to unauthorized access. Click here immediately to verify your credentials and restore access: http://secure-verify-account-portal.xyz/login",
    },
    {
      title: "Urgent Crypto Scam",
      text: "Congratulations! You were selected in the 2026 Bitcoin Airdrop. Send 0.05 BTC to confirm wallet address and receive 0.5 BTC instantly. Offer expires in 30 minutes!",
    },
    {
      title: "Benign Personal Message",
      text: "Hi team, please find the quarterly report attached in the shared drive. Let me know if you have any questions before tomorrow's 10 AM sync.",
    },
  ];

  const handleApplyPreset = (text) => {
    setThreatText(text);
  };

  const handleClear = () => {
    setThreatText("");
  };

  return (
    <section id="threat-analyzer" className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
      {/* Console Container */}
      <div className="relative bg-[#070B14]/90 border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-[0_12px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Subtle grid backdrop inside console */}
        <div className="absolute inset-0 rounded-2xl cyber-grid opacity-30 pointer-events-none" />

        {/* Console Header Bar */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4" />
              <span>COMMAND CONSOLE // THREAT-EVAL-01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              Threat Analyzer
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              {analysisMode === "url"
  ? "Submit a suspicious URL for AI-powered web threat assessment."
  : "Paste suspicious messages, emails, or SMS scams for contextual multi-vector threat assessment."}
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 hidden lg:inline">
              Load Preset:
            </span>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset.text)}
                disabled={loading}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0E1524] hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors disabled:opacity-50"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Engine Selection Bar */}
        <div className="relative z-10 mb-6 bg-[#0A0E17] border border-slate-800/80 rounded-xl p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>AI INFERENCE ENGINE:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
              {/* Option 1: Auto */}
              <button
                type="button"
                onClick={() => setEngine("auto")}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  engine === "auto"
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    : "bg-[#070B12] text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Auto — Recommended</span>
              </button>

              {/* Option 2: Gemini Online */}
              <button
                type="button"
                onClick={() => setEngine("gemini")}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  engine === "gemini"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                    : "bg-[#070B12] text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gemini API — Online</span>
              </button>

              {/* Option 3: Local LLM Offline */}
              <button
                type="button"
                onClick={() => setEngine("local")}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  engine === "local"
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    : "bg-[#070B12] text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Local LLM — Offline</span>
              </button>
            </div>
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>
              {engine === "auto" && "Auto Failover: Tries Gemini Cloud; automatically shifts to on-device Ollama if offline."}
              {engine === "gemini" && "Cloud Direct: Dispatches payload directly to Google Gemini 3.6 Flash endpoint."}
              {engine === "local" && "Local Inference: Runs locally via Ollama sentinelx-local model without sending the payload to Gemini Cloud."}
            </span>
            <span className="hidden sm:inline text-cyan-400/80">READY</span>
          </div>
        </div>
{/* Analysis Mode */}
<div className="relative z-10 mb-4 flex gap-2">
  <button
    type="button"
    onClick={() => {
      setAnalysisMode("message");
      setThreatText("");
    }}
    disabled={loading}
    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
      analysisMode === "message"
        ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/50"
        : "bg-[#070B12] text-slate-400 border-slate-800 hover:text-white"
    }`}
  >
    MESSAGE ANALYSIS
  </button>

  <button
    type="button"
    onClick={() => {
      setAnalysisMode("url");
      setThreatText("");
    }}
    disabled={loading}
    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
      analysisMode === "url"
        ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/50"
        : "bg-[#070B12] text-slate-400 border-slate-800 hover:text-white"
    }`}
  >
    URL ANALYSIS
  </button>
</div>
        {/* Text Input Terminal Area */}
        <div className="relative z-10">
          <div className="relative rounded-xl border border-slate-800 focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all bg-[#05080E]/95">
            {/* Terminal top edge */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span>PAYLOAD INPUT STREAM</span>
              </span>
              {threatText.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Scanning line animation when loading */}
            {loading && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan z-20" />
            )}

            <textarea
              id="threat-input"
              rows={6}
             placeholder={
  analysisMode === "url"
    ? "Enter a URL such as https://example.com..."
    : "Paste suspicious message, phishing email, or SMS payload here..."
}
              value={threatText}
              onChange={(e) => setThreatText(e.target.value)}
              maxLength={5000}
              disabled={loading}
              className="w-full bg-transparent p-4 sm:p-5 text-slate-100 placeholder-slate-600 font-mono text-sm leading-relaxed resize-none focus:outline-none"
            />

            {/* Bottom bar inside textarea box */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>UTF-8 BUFFER READY</span>
              </span>
              <span className={threatText.length >= 4500 ? "text-amber-400 font-semibold" : ""}>
                {threatText.length} / 5000 CHARACTERS
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audited & Stored to SQLite Incident History</span>
          </div>

          <button
            onClick={onAnalyze}
            disabled={loading || !threatText.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-semibold font-mono text-sm px-8 py-3.5 rounded-xl transition-all shadow-[0_0_24px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                <span>Evaluating Threats{dots}</span>
              </>
            ) : (
              <>
                <span>Analyze Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Threat Result Report Section */}
        <ThreatResult
          result={result}
          riskLevel={riskLevel}
          keywords={keywords}
          recommendation={recommendation}
          engineUsed={engineUsed}
        />
      </div>
    </section>
  );
}
