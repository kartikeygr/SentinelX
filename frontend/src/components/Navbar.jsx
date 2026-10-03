import { useState, useEffect } from "react";
import { Shield, Menu, X, Radio } from "lucide-react";

export default function Navbar({ activeSection, historyCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Dashboard", href: "#system-status", id: "system-status" },
  { name: "History", href: "#threat-history", id: "threat-history", count: historyCount },
];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cyan-500/20 bg-[#05080E]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          : "border-b border-slate-800/80 bg-[#05080E]/75 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand logo & title */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="col-start-1 justify-self-start flex items-center gap-2 sm:gap-3 min-w-0 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg py-1 px-1.5"
        >
          <div className="relative w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all">
            <Shield className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                Sentinel<span className="text-cyan-400">X</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                SEC-OPS
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">
              THREAT INTELLIGENCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex col-start-2 justify-self-center items-center gap-1 bg-[#0A0E17]/80 border border-slate-800/80 rounded-xl p-1 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center gap-2 ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
                {link.name}
                {typeof link.count === "number" && link.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    {link.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* System status pill & Action */}
<div className="hidden sm:flex col-start-2 lg:col-start-3 justify-self-center lg:justify-self-end items-center">
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0E17] border border-slate-800 text-[11px] font-mono text-slate-300">
    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
    <span className="text-slate-400">STATUS:</span>
    <span className="text-emerald-400 font-semibold">GRID ACTIVE</span>
  </div>
</div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex lg:hidden col-start-3 justify-self-end items-center">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-800 bg-[#0A0E17] text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-[#05080E]/98 px-5 py-5 flex flex-col gap-3 font-mono text-sm shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs text-slate-400">
            <span>GRID TELEMETRY</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activeSection === link.id
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <span>{link.name}</span>
              {typeof link.count === "number" && link.count > 0 && (
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  {link.count}
                </span>
              )}
            </a>
          ))}

          <a
            href="#threat-analyzer"
            onClick={(e) => handleNavClick(e, "#threat-analyzer")}
            className="mt-2 text-center bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2.5 rounded-lg text-xs tracking-wide"
          >
            LAUNCH ANALYZER
          </a>
        </div>
      )}
    </nav>
  );
}
