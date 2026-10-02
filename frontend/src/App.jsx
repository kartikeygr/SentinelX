import { useState, useEffect } from "react";
import { Shield, Link, LockKeyhole, Menu, X, AlertTriangle } from "lucide-react";

function App() {
  // ── Core analyzer state (unchanged) ──────────────────────────────
  const [threatText, setThreatText] = useState("");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const [engine, setEngine] = useState("auto");

  // ── New UI-only state: mobile nav toggle ─────────────────────────
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") {
          return "";
        }
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setResult("");
      setRiskLevel("");
      setKeywords([]);
      setRecommendation("");

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: threatText,
          engine: engine,
        }),
      });

      const data = await response.json();

      setResult(data.result);
      setRiskLevel(data.riskLevel);
      setKeywords(data.keywords);
      setRecommendation(data.recommendation);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const riskStyles = {
    High: {
      badge: "bg-red-500/10 text-red-400 border border-red-500/20",
      dot: "bg-red-400",
      ring: "border-l-red-500/60",
      icon: "text-red-400",
    },
    Medium: {
      badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      dot: "bg-amber-400",
      ring: "border-l-amber-500/60",
      icon: "text-amber-400",
    },
    Low: {
      badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      dot: "bg-emerald-400",
      ring: "border-l-emerald-500/60",
      icon: "text-emerald-400",
    },
  };
  const currentRiskStyle = riskStyles[riskLevel] || riskStyles.Low;

  return (
    <div className="min-h-screen bg-[#0A0E14] text-slate-100">
      <style>{`
        @keyframes reportFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .report-fade-in {
          animation: reportFadeIn 0.35s ease-out;
        }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#0A0E14]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Sentinel<span className="text-cyan-400">X</span>
          </h1>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm">
              Home
            </a>
            <a href="#threat-analyzer" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm">
              Analyzer
            </a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm">
              Dashboard
            </a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm">
              History
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">
              Sign In
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/70 bg-[#0A0E14] px-6 py-4 flex flex-col gap-4 text-sm text-slate-300">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#threat-analyzer" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
              Analyzer
            </a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">
              History
            </a>
            <button className="mt-2 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm text-left hover:border-cyan-400/60 hover:text-white transition-colors">
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute top-10 w-[28rem] h-[28rem] bg-cyan-500/[0.07] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-slate-800 bg-slate-900/60 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            AI-powered cybersecurity analysis
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Detect threats.
            <br />
            <span className="text-cyan-400">Understand risk.</span>
          </h2>

          <p className="text-slate-400 mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            SentinelX analyzes suspicious messages, emails, and URLs using
            contextual AI to surface hidden threats and clear,
            actionable security recommendations.
          </p>

          <button
            onClick={() => {
              document.getElementById("threat-analyzer").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-10 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-7 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E14]"
          >
            Start Analysis
          </button>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-7 hover:border-slate-700 hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-5">
              <Shield className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Scam Detection</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Detect phishing messages, fraudulent offers, and social
              engineering using contextual AI analysis.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-7 hover:border-slate-700 hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-5">
              <Link className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              URL Analysis
              <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                Coming soon
              </span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Analyze suspicious links to identify potential phishing or
              malicious URL patterns.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-7 hover:border-slate-700 hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-5">
              <LockKeyhole className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Password Security
              <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-wide text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                Coming soon
              </span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Evaluate password strength and get recommendations for
              stronger account security.
            </p>
          </div>
        </div>
      </section>

      {/* ── THREAT ANALYZER ───────────────────────────────────────*/}
      <section id="threat-analyzer" className="px-6 md:px-10 pb-24">
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Threat Analyzer
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Paste a suspicious message, email, or URL below and receive a
              clear, contextual security assessment.
            </p>
          </div>

          <label htmlFor="threat-input" className="sr-only">
            Suspicious message, email, or URL to analyze
          </label>
          <div className="relative">
            <textarea
              id="threat-input"
              placeholder="Paste a suspicious message, email, or URL..."
              value={threatText}
              onChange={(e) => setThreatText(e.target.value)}
              maxLength={5000}
              aria-describedby="char-count"
              className="w-full h-40 bg-[#0A0E14] border border-slate-800 rounded-xl p-4 pr-16 text-slate-100 placeholder-slate-600 resize-none transition-colors focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            />
            <span
              id="char-count"
              className="absolute bottom-3 right-4 text-xs text-slate-600"
            >
              {threatText.length} / 5000
            </span>
          </div>

<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
  <label
    htmlFor="ai-engine"
    className="text-sm text-slate-400"
  >
    AI Engine
  </label>

  <select
    id="ai-engine"
    value={engine}
    onChange={(e) => setEngine(e.target.value)}
    disabled={loading}
    className="bg-[#0A0E14] border border-slate-800 text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
  >
    <option value="auto">Auto — Recommended</option>
    <option value="gemini">Gemini API — Online</option>
    <option value="local">Local LLM — Offline</option>
  </select>
</div>

<div className="flex justify-center mt-6">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              aria-label={loading ? "Analyzing, please wait" : "Analyze the entered text"}
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-8 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E14]"
            >
              {loading && (
                <span
                  className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin"
                  aria-hidden="true"
                />
              )}
              {loading ? `Analyzing${dots}` : "Analyze Now"}
            </button>
          </div>

          {/* ── THREAT REPORT ──────────────────────────────────── */}
          {result && (
            <div className="mt-10 report-fade-in">
              <div className="flex items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold text-white">
                  Threat Analysis Report
                </h3>
                {riskLevel && (
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${currentRiskStyle.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${currentRiskStyle.dot}`} />
                    {riskLevel} Risk
                  </div>
                )}
              </div>

              {/* Primary: threat status */}
              <div
                className={`bg-[#0A0E14] border border-slate-800 border-l-4 ${currentRiskStyle.ring} rounded-xl p-5 mb-5`}
              >
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Threat Status
                </h4>
                <p className="text-slate-100 text-base leading-relaxed break-words">
                  {result}
                </p>
              </div>

              {/* Secondary: keywords + recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#0A0E14] border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    Suspicious Keywords
                  </h4>
                  {Array.isArray(keywords) && keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((word, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700 rounded-md px-2.5 py-1"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">None detected.</p>
                  )}
                </div>

                <div className="bg-[#0A0E14] border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3 flex items-center gap-2">
                    <AlertTriangle
  className={`w-3.5 h-3.5 ${currentRiskStyle.icon}`}
  aria-hidden="true"
/>
                    Recommendation
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;