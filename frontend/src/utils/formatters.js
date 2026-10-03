/**
 * Formats SQLite CURRENT_TIMESTAMP (YYYY-MM-DD HH:MM:SS) into:
 * - Date (e.g. "Oct 2, 2026")
 * - Time (e.g. "07:13 PM")
 * - Day of week (e.g. "Friday")
 */
export function formatHistoryTimestamp(timestamp) {
  if (!timestamp) {
    return { date: "Unknown Date", time: "Unknown Time", day: "Unknown Day" };
  }

  try {
    const isoStr = timestamp.includes("T")
      ? timestamp
      : timestamp.replace(" ", "T") + "Z";
    const d = new Date(isoStr);

    if (isNaN(d.getTime())) {
      return { date: timestamp, time: "", day: "" };
    }

    const day = d.toLocaleDateString("en-US", { weekday: "long" });
    const date = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { date, time, day };
  } catch {
    return { date: timestamp, time: "", day: "" };
  }
}

/**
 * Safely parses keywords array whether stored as stringified JSON or an array.
 */
export function safeParseKeywords(keywords) {
  if (Array.isArray(keywords)) return keywords;
  if (typeof keywords === "string") {
    try {
      const parsed = JSON.parse(keywords);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fallback: split by comma if not valid JSON
      if (keywords.trim()) {
        return keywords
          .split(",")
          .map((k) => k.replace(/[[\]"]/g, "").trim())
          .filter(Boolean);
      }
    }
  }
  return [];
}

/**
 * Standardized risk styles for SentinelX
 */
export const riskConfig = {
  High: {
    label: "CRITICAL // HIGH RISK",
    badge: "bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]",
    dot: "bg-red-500",
    border: "border-red-500/50",
    leftBar: "border-l-red-500",
    text: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    bgSubtle: "bg-red-950/20",
  },
  Medium: {
    label: "ELEVATED // MEDIUM RISK",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    dot: "bg-amber-500",
    border: "border-amber-500/50",
    leftBar: "border-l-amber-500",
    text: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    bgSubtle: "bg-amber-950/20",
  },
  Low: {
    label: "CLEARED // LOW RISK",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    dot: "bg-emerald-400",
    border: "border-emerald-500/50",
    leftBar: "border-l-emerald-500",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    bgSubtle: "bg-emerald-950/20",
  },
  Unknown: {
    label: "UNCLASSIFIED // UNKNOWN",
    badge: "bg-slate-500/10 text-slate-400 border border-slate-500/30",
    dot: "bg-slate-400",
    border: "border-slate-500/50",
    leftBar: "border-l-slate-500",
    text: "text-slate-400",
    glow: "shadow-none",
    bgSubtle: "bg-slate-900/30",
  },
};

export function getRiskStyle(level) {
  if (!level) return riskConfig.Low;
  const l = String(level).trim().toLowerCase();
  if (l.includes("high")) return riskConfig.High;
  if (l.includes("med")) return riskConfig.Medium;
  if (l.includes("low")) return riskConfig.Low;
  return riskConfig.Unknown;
}
