import { useState, useEffect } from "react";
import { Shield, Link, LockKeyhole } from "lucide-react";

function App() {
  const [threatText, setThreatText] = useState("");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

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
  return (
    <div className="min-h-screen bg-black text-white">
      
     <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-gray-800/70 bg-black/80 backdrop-blur-md sticky top-0 z-50">

  <h1 className="text-2xl font-bold tracking-tight text-white">
    Sentinel<span className="text-cyan-400">X</span>
  </h1>

  <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
    <a href="#" className="hover:text-white transition">
      Home
    </a>

    <a href="#threat-analyzer" className="hover:text-white transition">
      Analyzer
    </a>

    <a href="#" className="hover:text-white transition">
      Dashboard
    </a>
  </div>

  <button className="border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition">
    Sign In
  </button>

</nav>

      <div className="relative flex flex-col items-center justify-center text-center min-h-[75vh] px-6 overflow-hidden">

  <div className="absolute top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

  <div className="relative z-10">

    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-gray-800 bg-gray-900/60 text-sm text-gray-400">
      <span className="w-2 h-2 rounded-full bg-green-400"></span>
      AI-powered cybersecurity analysis
    </div>

    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight max-w-5xl">
      Detect threats.
      <br />
      <span className="text-cyan-400">
        Understand risk.
      </span>
    </h2>

    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
      SentinelX uses contextual AI to analyze suspicious messages,
      identify potential cyber threats, and provide actionable
      security recommendations.
    </p>

    <button
      onClick={() => {
        document.getElementById("threat-analyzer").scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="mt-10 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10"
    >
      Start Analysis →
    </button>

    <p className="text-gray-600 text-sm mt-5">
      Analyze messages, suspicious content and URLs
    </p>

  </div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6 md:px-10 max-w-6xl mx-auto pb-24">

  {/* Scam Detection */}
  <div className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-7 hover:border-cyan-500/40 hover:bg-gray-900/70 transition-all duration-300">

    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-500/10 mb-6">
      <Shield className="w-5 h-5 text-cyan-400" />
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">
      Scam Detection
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed">
      Detect phishing messages, fraudulent offers, social engineering,
      and suspicious content using contextual AI analysis.
    </p>

  </div>

  {/* URL Analysis */}
  <div className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-7 hover:border-cyan-500/40 hover:bg-gray-900/70 transition-all duration-300">

    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-500/10 mb-6">
      <Link className="w-5 h-5 text-cyan-400" />
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">
      URL Analysis
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed">
      Analyze suspicious links and identify potential phishing
      or malicious URL patterns.
    </p>

  </div>

  {/* Password Security */}
  <div className="group bg-gray-900/40 border border-gray-800 rounded-2xl p-7 hover:border-cyan-500/40 hover:bg-gray-900/70 transition-all duration-300">

    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-500/10 mb-6">
      <LockKeyhole className="w-5 h-5 text-cyan-400" />
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">
      Password Security
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed">
      Evaluate password strength and provide recommendations
      for stronger account security.
    </p>

  </div>

</div>
<div id="threat-analyzer" className="px-10 pb-24">

  <div className="bg-gray-950/70 border border-gray-800 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-2xl shadow-black/30">

    <div className="text-center mb-8">


  <h2 className="text-3xl md:text-4xl font-bold text-white">
    Threat Analyzer
  </h2>

</div>

    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
  Analyze suspicious messages, emails, or URLs using contextual AI
  and receive a clear security assessment.
</p>

    <div className="relative">

  <textarea
    placeholder="Paste a suspicious message, email, or URL here..."
    value={threatText}
    onChange={(e) => setThreatText(e.target.value)}
    maxLength={5000}
    className="w-full h-44 bg-black/60 border border-gray-800 rounded-2xl p-5 pr-16 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition"
  ></textarea>

  <span className="absolute bottom-4 right-4 text-xs text-gray-600">
    {threatText.length} / 5000
  </span>

</div>
    <div className="flex justify-center mt-6">
      <button
  onClick={async () => {
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
  }}
  disabled={loading}
  className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/10"
>
  {loading ? `Analyzing${dots}` : "Analyze Now"}
</button>
    </div>
    {result && (
  <div className="mt-10 bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">

    <div className="mb-8">
  <h3 className="text-2xl font-bold text-white">
    Threat Analysis Report
  </h3>
</div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Threat Status
        </h4>

        <p className="text-white text-lg break-words">
  {result}
</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Risk Level
        </h4>

        <div
  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
    riskLevel === "High"
      ? "bg-red-500/10 text-red-400"
      : riskLevel === "Medium"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-green-500/10 text-green-400"
  }`}
>
  <span
    className={`w-2 h-2 rounded-full ${
      riskLevel === "High"
        ? "bg-red-400"
        : riskLevel === "Medium"
        ? "bg-yellow-400"
        : "bg-green-400"
    }`}
  ></span>

  {riskLevel}
</div>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Suspicious Keywords
        </h4>

        <p className="text-white">
  {JSON.stringify(keywords)}
</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Recommendation
        </h4>

        <p className="text-white">
          {recommendation}
        </p>
      </div>

    </div>

  </div>
)}

  </div>

</div>
    </div>
  );
}

export default App;