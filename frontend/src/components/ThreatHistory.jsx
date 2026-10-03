import { useState } from "react";
import {
  History,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Sparkles,
  Terminal,
  ExternalLink,
  Layers,
  Database,
} from "lucide-react";
import {
  formatHistoryTimestamp,
  getRiskStyle,
  safeParseKeywords,
} from "../utils/formatters";

export default function ThreatHistory({
  history = [],
  loading = false,
  error = null,
  onRefresh,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [engineFilter, setEngineFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showAllHistory, setShowAllHistory] = useState(false);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Client-side filtering across text, result, keywords, and engine
  const filteredHistory = history.filter((item) => {
    // Risk filter
    if (riskFilter !== "all") {
      const rl = (item.riskLevel || "").toLowerCase();
      if (riskFilter === "high" && !rl.includes("high")) return false;
      if (riskFilter === "medium" && !rl.includes("med")) return false;
      if (riskFilter === "low" && !rl.includes("low")) return false;
    }

    // Engine filter
    if (engineFilter !== "all") {
      const eng = (item.engine || "").toLowerCase();
      if (engineFilter === "gemini" && !eng.includes("gemini")) return false;
      if (engineFilter === "local" && !eng.includes("local")) return false;
    }

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const textMatch = (item.text || "").toLowerCase().includes(q);
      const resultMatch = (item.result || "").toLowerCase().includes(q);
      const recMatch = (item.recommendation || "").toLowerCase().includes(q);
      const kw = safeParseKeywords(item.keywords).join(" ").toLowerCase();
      const kwMatch = kw.includes(q);

      return textMatch || resultMatch || recMatch || kwMatch;
    }

    return true;
  });

  return (
    <section id="threat-history" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <History className="w-4 h-4" />
            <span>INCIDENT AUDIT LOG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-mono">
            Threat Intelligence History
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
            Forensic timeline of all analyzed payloads, recorded in local
            SQLite storage with risk classifications and heuristic metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A101C] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all disabled:opacity-50"
            title="Refresh database logs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh History</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-[#0A101C] border border-slate-800 text-xs font-mono text-slate-400">
            Total Logs:{" "}
            <span className="text-cyan-400 font-semibold">{history.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0A0E17]/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search threat results, keywords, original text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#05080E] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Risk filter group */}
            <div className="flex items-center gap-1 bg-[#05080E] border border-slate-800 p-1 rounded-xl text-xs font-mono">
              <span className="px-2 text-slate-500 text-[11px] hidden sm:inline">
                Risk:
              </span>
              {["all", "high", "medium", "low"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRiskFilter(r)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[11px] transition-all ${
                    riskFilter === r
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Engine filter group */}
            <div className="flex items-center gap-1 bg-[#05080E] border border-slate-800 p-1 rounded-xl text-xs font-mono">
              <span className="px-2 text-slate-500 text-[11px] hidden sm:inline">
                Engine:
              </span>
              {[
                { key: "all", label: "All" },
                { key: "gemini", label: "Gemini" },
                { key: "local", label: "Local" },
              ].map((eng) => (
                <button
                  key={eng.key}
                  type="button"
                  onClick={() => setEngineFilter(eng.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                    engineFilter === eng.key
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {eng.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Filter Counter */}
        {(searchQuery || riskFilter !== "all" || engineFilter !== "all") && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              Showing {filteredHistory.length} of {history.length} events
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setRiskFilter("all");
                setEngineFilter("all");
              }}
              className="text-cyan-400 hover:underline text-[11px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* History Timeline Content */}
      {loading && history.length === 0 ? (
        /* Loading Skeleton */
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-[#0A0E17]/60 border border-slate-800 rounded-2xl p-6 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-32 h-4 bg-slate-800 rounded" />
                <div className="w-24 h-6 bg-slate-800 rounded-full" />
              </div>
              <div className="w-3/4 h-5 bg-slate-800 rounded mb-3" />
              <div className="w-full h-12 bg-slate-800/50 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-mono text-white mb-2">
            Database Connection Error
          </h3>
          <p className="text-slate-400 text-sm mb-5 font-sans">
            Unable to fetch threat audit logs from SQLite backend. Verify that the
            SentinelX Express server is running on port 5000.
          </p>
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-mono text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : filteredHistory.length === 0 ? (
        /* Empty State */
        <div className="bg-[#0A0E17]/60 border border-slate-800/80 rounded-2xl p-12 text-center max-w-lg mx-auto cyber-dots">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Database className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2">
            {history.length === 0
              ? "No Incidents Recorded Yet"
              : "No Matching Events Found"}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
            {history.length === 0
              ? "Submit a suspicious message or email payload above to perform your first threat analysis and initialize the forensic timeline."
              : "Try adjusting your search criteria or resetting filters to view all historical incident records."}
          </p>
          {history.length > 0 && (
            <button
              onClick={() => {
                setSearchQuery("");
                setRiskFilter("all");
                setEngineFilter("all");
              }}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        /* Event Timeline Cards */
        <div className="space-y-4">
  {(showAllHistory
    ? filteredHistory
    : filteredHistory.slice(0, 5)
  ).map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const risk = getRiskStyle(item.riskLevel);
            const keywordsList = safeParseKeywords(item.keywords);
            const { date, time, day } = formatHistoryTimestamp(item.createdAt);

            return (
              <div
                key={item.id}
                className={`bg-[#0A0E17]/85 hover:bg-[#0D1322] border ${
                  isExpanded ? risk.border : "border-slate-800"
                } rounded-2xl transition-all duration-200 overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]`}
              >
                {/* Collapsed Top Header */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex-1 min-w-0">
                    {/* Telemetry metadata row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-2.5">
                      <span className="text-cyan-400 font-semibold">
                        #EVT-{String(item.id).padStart(4, "0")}
                      </span>

                      <span className="text-slate-600">•</span>

                      {/* Day of Week, Date, Time */}
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{day},</span>
                        <span>{date}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{time}</span>
                      </span>

                      <span className="text-slate-600">•</span>

                      {/* Engine Badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {item.engine === "local" ? (
                          <>
                            <Cpu className="w-3 h-3 text-cyan-400" />
                            <span>Local LLM</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span>Gemini</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Threat Result Title */}
                    <h4 className="text-base sm:text-lg font-bold font-mono text-white tracking-tight mb-2 truncate">
                      {item.result}
                    </h4>

                    {/* Preview of original analyzed message */}
                    <p className="text-xs sm:text-sm text-slate-400 font-mono truncate">
                      {item.text}
                    </p>
                  </div>

                  {/* Right side: Risk badge and Expand toggle */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${risk.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                      <span>{item.riskLevel || "Low"}</span>
                    </span>

                    <button
                      type="button"
                      aria-label={isExpanded ? "Collapse event details" : "Expand event details"}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Forensic Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 bg-[#070A12]/90 space-y-5">
                    {/* Full Original Analyzed Payload */}
                    <div>
                      <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        Original Analyzed Payload
                      </h5>
                      <div className="bg-[#05080E] border border-slate-800/90 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-text">
                        {item.text}
                      </div>
                    </div>

                    {/* Suspicious Keywords & Recommendation Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Suspicious Keywords */}
                      <div className="bg-[#0A0E17] border border-slate-800/80 rounded-xl p-4">
                        <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                          Extracted Threat Keywords
                        </h5>
                        {keywordsList.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {keywordsList.map((kw, i) => (
                              <span
                                key={i}
                                className="text-xs font-mono px-2.5 py-1 rounded bg-red-950/20 text-red-300 border border-red-800/30"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs font-mono text-slate-500">
                            No malicious keywords logged.
                          </p>
                        )}
                      </div>

                      {/* Security Recommendation */}
                      <div className="bg-[#0A0E17] border border-slate-800/80 rounded-xl p-4">
                        <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                          <AlertTriangle className={`w-3 h-3 ${risk.text}`} />
                          Security Protocol & Recommendation
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {item.recommendation || "Maintain standard vigilance."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
                    })}

          {filteredHistory.length > 5 && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setShowAllHistory((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A101C] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
              >
                {showAllHistory ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Show More ({filteredHistory.length - 5})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
