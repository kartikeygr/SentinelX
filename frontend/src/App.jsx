import { useState } from "react";

function App() {
  const [threatText, setThreatText] = useState("");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [keywords, setKeywords] = useState([]);
  return (
    <div className="min-h-screen bg-black text-white">
      
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-cyan-400">
          SentinelX
        </h1>

        <div className="space-x-6 text-gray-300">
          <a href="#" className="hover:text-cyan-400">Home</a>
          <a href="#" className="hover:text-cyan-400">Features</a>
          <a href="#" className="hover:text-cyan-400">Dashboard</a>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center mt-32 px-4">

        <h2 className="text-6xl font-extrabold text-cyan-400 leading-tight">
          AI-Powered <br /> Cyber Threat Detection
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          SentinelX helps users detect phishing messages, scam URLs,
          suspicious content, and cyber threats using Artificial Intelligence.
        </p>

        <button className="mt-10 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl transition duration-300">
  Analyze Threat
</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mt-24 pb-20">

  <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 hover:scale-105 transition duration-300">
    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
      Scam Detection
    </h3>

    <p className="text-gray-400">
      Detect phishing messages, fake offers, and scam content using AI analysis.
    </p>
  </div>

  <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 hover:scale-105 transition duration-300">
    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
      URL Analysis
    </h3>

    <p className="text-gray-400">
      Analyze suspicious URLs and identify possible phishing websites instantly.
    </p>
  </div>

  <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 hover:scale-105 transition duration-300">
    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
      Password Security
    </h3>

    <p className="text-gray-400">
      Check password strength and improve cybersecurity awareness.
    </p>
  </div>

</div>
<div className="px-10 pb-24">

  <div className="bg-gray-900 border border-cyan-500 rounded-3xl p-8 max-w-4xl mx-auto">

    <h2 className="text-4xl font-bold text-cyan-400 text-center mb-6">
      Threat Analyzer
    </h2>

    <p className="text-gray-400 text-center mb-8">
      Paste suspicious messages, emails, or URLs to analyze cyber threats using AI.
    </p>

    <textarea
  placeholder="Paste suspicious content here..."
  value={threatText}
  onChange={(e) => setThreatText(e.target.value)}
  className="w-full h-40 bg-black border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400"
></textarea>

    <div className="flex justify-center mt-6">
      <button
  onClick={async () => {
    try {
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

} catch (error) {
  console.log(error);
}
  }}
  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-xl transition duration-300"
>
  Analyze Now
</button>
    </div>
    {result && (
  <div className="mt-8 bg-black border border-cyan-500 rounded-2xl p-6">

    <h3 className="text-3xl text-cyan-400 font-bold text-center mb-6">
      Threat Analysis Report
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Threat Status
        </h4>

        <p className="text-white text-lg">
          {result}
        </p>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Risk Level
        </h4>

        <p
  className={`text-lg font-semibold ${
    riskLevel === "High"
      ? "text-red-400"
      : riskLevel === "Medium"
      ? "text-yellow-400"
      : "text-green-400"
  }`}
>
  {riskLevel}
</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Suspicious Keywords
        </h4>

        <p className="text-white">
  {keywords.join(", ")}
</p>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
        <h4 className="text-cyan-400 text-xl font-semibold mb-2">
          Recommendation
        </h4>

        <p className="text-white">
          Avoid clicking unknown links and verify sender identity.
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