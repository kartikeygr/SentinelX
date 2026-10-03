import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SystemStatus from "./components/SystemStatus";
import ThreatAnalyzer from "./components/ThreatAnalyzer";
import ThreatHistory from "./components/ThreatHistory";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  // ── Core analyzer state (preserved from existing backend contract) ──
  const [threatText, setThreatText] = useState("");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [engine, setEngine] = useState("auto"); // "auto" | "gemini" | "local"
  const [engineUsed, setEngineUsed] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  // ── Threat History State ──────────────────────────────────────────
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  // ── Active Navigation Section ─────────────────────────────────────
  const [activeSection, setActiveSection] = useState("hero");
  const [analysisMode, setAnalysisMode] = useState("message");

  // Animated loading dots indicator
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 450);

    return () => clearInterval(interval);
  }, [loading]);

  // Fetch threat history from existing GET http://localhost:5000/history
  const fetchHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      const response = await fetch("http://localhost:5000/history");
      if (!response.ok) {
        throw new Error(`Failed to load history (${response.status})`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Threat history fetch error:", err);
      setHistoryError(err.message || "Failed to connect to history endpoint");
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Initial load of history on mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Active section scroll spy via IntersectionObserver
  useEffect(() => {
    const sections = ["hero", "threat-analyzer", "system-status", "threat-history"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Primary Threat Analysis Handler (preserving POST http://localhost:5000/analyze)
  const handleAnalyze = async () => {
    if (!threatText.trim()) return;

    try {
      setLoading(true);
      setResult("");
      setRiskLevel("");
      setKeywords([]);
      setRecommendation("");
      setEngineUsed("");

      const endpoint =
  analysisMode === "url"
    ? "http://localhost:5000/analyze-url"
    : "http://localhost:5000/analyze";

const body =
  analysisMode === "url"
    ? { url: threatText, engine: engine }
    : { text: threatText, engine: engine };

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
        
      const data = await response.json();

      setResult(data.result || "Analysis Completed");
      setRiskLevel(data.riskLevel || "Unknown");
      setKeywords(data.keywords || []);
      setRecommendation(data.recommendation || "");
      setEngineUsed(data.engine || engine);

      // Re-fetch SQLite threat history so the new audit record appears immediately
      fetchHistory();
    } catch (error) {
      console.error("Analysis execution error:", error);
      setResult("AI Analysis Failed");
      setRiskLevel("Unknown");
      setKeywords(["connection-error"]);
      setRecommendation(
        "Unable to reach the SentinelX backend server at http://localhost:5000. Please ensure server.js is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScrollTo = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* ── Fixed Command Center Navigation ── */}
      <Navbar
        activeSection={activeSection}
        historyCount={history.length}
      />

      {/* ── Main Content Container ── */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartAnalysis={() => handleScrollTo("threat-analyzer")}
          onViewHistory={() => handleScrollTo("threat-history")}
        />

        {/* 2. System Status & Readiness (Dashboard) */}
        <SystemStatus historyTotal={history.length} />

        {/* 3. Primary Threat Analyzer Console */}
        <ThreatAnalyzer
  analysisMode={analysisMode}
  setAnalysisMode={setAnalysisMode}
  threatText={threatText}
          setThreatText={setThreatText}
          engine={engine}
          setEngine={setEngine}
          loading={loading}
          dots={dots}
          onAnalyze={handleAnalyze}
          result={result}
          riskLevel={riskLevel}
          keywords={keywords}
          recommendation={recommendation}
          engineUsed={engineUsed}
        />

        {/* 4. Threat Intelligence History & Audit Log */}
        <ThreatHistory
          history={history}
          loading={historyLoading}
          error={historyError}
          onRefresh={fetchHistory}
        />

        {/* 5. Defense Modules & Capabilities Roadmap */}
        <Features
  onUrlAnalysis={() => {
    setAnalysisMode("url");
    handleScrollTo("threat-analyzer");
  }}
/>
      </main>

      {/* ── Command Center Footer ── */}
      <Footer />
    </div>
  );
}

export default App;