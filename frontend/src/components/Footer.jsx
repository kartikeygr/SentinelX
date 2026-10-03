import { Shield, ArrowUp, Terminal, Radio } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/90 bg-[#04060B] py-12 px-5 sm:px-8 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-bold tracking-tight text-sm">
              Sentinel<span className="text-cyan-400">X</span>
              <span className="text-[10px] text-slate-500 ml-2 font-normal">
                v2.4 SEC-OPS EDITION
              </span>
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              Hybrid Cloud & Air-Gapped AI Cybersecurity Threat Intelligence
            </div>
          </div>
        </div>

        {/* Center Privacy Pledge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080D18] border border-slate-800/80 text-slate-400 text-[11px]">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>Air-Gapped Local Inference Enabled via Ollama</span>
        </div>

        {/* Right side: Back to top */}
        <div className="flex items-center gap-4">
          <span>SECURED // ENCRYPTED STORAGE</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
