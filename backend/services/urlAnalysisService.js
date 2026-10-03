const { GoogleGenerativeAI } = require("@google/generative-ai");
const { analyzeWithOllama } = require("./ollamaService");
function inspectUrlStructure(url) {
  const parsed = new URL(url);

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();

  const signals = [];

  // 1. HTTPS check
  if (parsed.protocol !== "https:") {
    signals.push({
      type: "transport",
      finding: "Connection does not use HTTPS",
      severity: 1,
    });
  }

  // 2. IP address used as hostname
  const isIpAddress =
  /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

const isPrivateIp =
  /^10\./.test(hostname) ||
  /^192\.168\./.test(hostname) ||
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname);

if (isIpAddress) {
  signals.push({
    type: "host",
    finding: isPrivateIp
      ? "URL uses a private IP address instead of a domain name"
      : "URL uses a public IP address instead of a domain name",
    severity: isPrivateIp ? 2 : 3,
  });
}

  // 3. Excessive subdomains
  const labels = hostname.split(".");
const knownBrands = [
  "paypal",
  "google",
  "microsoft",
  "apple",
  "amazon",
  "facebook",
  "instagram",
  "netflix",
  "linkedin",
  "github",
  "whatsapp",
  "dropbox",
  "adobe",
  "outlook",
  "office365",
  "coinbase",
  "binance",
];

const brandInSubdomain = knownBrands.find((brand) =>
  labels
    .slice(0, -2)
    .some((label) => label.includes(brand))
);

if (brandInSubdomain) {
  signals.push({
    type: "impersonation",
    finding: `Possible ${brandInSubdomain} brand impersonation in subdomain`,
    severity: 3,
  });
}
  if (labels.length > 4) {
    signals.push({
      type: "host",
      finding: "Unusually deep subdomain structure",
      severity: 2,
    });
  }

  // 4. Suspicious URL encoding
  if (/%[0-9a-f]{2}/i.test(url)) {
    signals.push({
      type: "obfuscation",
      finding: "URL contains encoded characters",
      severity: 1,
    });
  }

  // 5. Suspicious path terminology
  const credentialTerms =
    /\b(login|signin|sign-in|verify|verification|password|credential|account|wallet|payment|billing)\b/i;

  if (credentialTerms.test(pathname)) {
    signals.push({
      type: "path",
      finding: "Credential or account-related path",
      severity: 1,
    });
  }

  // 6. Suspicious URL keywords
  const suspiciousTerms =
    /\b(secure|security|update|confirm|unlock|suspended|validate|authentication)\b/i;

  if (suspiciousTerms.test(pathname)) {
    signals.push({
      type: "path",
      finding: "Security or account-action terminology",
      severity: 1,
    });
  }

  // 7. Hostname contains misleading separators
  if (hostname.includes("@")) {
    signals.push({
      type: "obfuscation",
      finding: "Hostname contains an unusual @ character",
      severity: 3,
    });
  }

  // 8. Suspicious port
  if (parsed.port && !["80", "443"].includes(parsed.port)) {
    signals.push({
      type: "network",
      finding: `Non-standard port ${parsed.port}`,
      severity: 2,
    });
  }

  const score = signals.reduce(
  (total, signal) => total + signal.severity,
  0
);

let riskLevel = "Low";

if (score >= 5) {
  riskLevel = "High";
} else if (score >= 2) {
  riskLevel = "Medium";
}

  return {
    hostname,
    pathname,
    score,
    signals,
    riskLevel,
  };
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeUrlWithGemini(url) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
  });

  const prompt = `
You are SentinelX, an AI cybersecurity URL threat detector.

Analyze this URL for potential:
- phishing
- malicious websites
- credential theft
- scam pages
- impersonation
- malware delivery
- suspicious redirects
- suspicious domains

URL:
"${url}"

Important rules:
1. Base your analysis only on the provided URL.
2. Do not invent information about the website.
3. Do not claim that a domain is malicious merely because it looks unfamiliar.
4. Look for suspicious URL characteristics such as misleading domain names, unusual subdomains, suspicious paths, IP-address hosts, excessive encoding, or phishing-related terms.
5. If the URL appears normal based on its structure, use Low risk.
6. If there are no suspicious indicators, return an empty keywords array [].
7. Return ONLY valid JSON.

Return:

{
  "result": "Legitimate or a short description of the URL threat",
  "riskLevel": "Low, Medium, or High",
  "keywords": [],
  "recommendation": "A short appropriate security recommendation"
}
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  const cleanedResponse = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedResponse);
}

async function analyzeUrlWithLocal(url) {
  const inspection = inspectUrlStructure(url);
  const structuralRisk = inspection.riskLevel;

  const findings = inspection.signals.length
    ? inspection.signals
        .map(
          (signal) =>
            `- ${signal.finding} (severity ${signal.severity}/3)`
        )
        .join("\n")
    : "- No significant structural indicators detected.";

  const result = await analyzeWithOllama(`
You are SentinelX, a cybersecurity URL threat assessment engine.

Analyze the URL using BOTH:
1. The URL itself
2. The objective structural findings provided below

URL:
${url}

OBJECTIVE STRUCTURAL FINDINGS:
${findings}

STRUCTURAL SCORE:
${inspection.score}

STRUCTURAL RISK ASSESSMENT:
${structuralRisk}

IMPORTANT RULES:

- Do NOT classify a URL as malicious merely because its domain is unfamiliar.
- Do NOT classify a URL as High Risk because it contains only one word such as "login", "verify", "secure", or "account".
- These words are contextual indicators only.
- Consider multiple independent indicators together.
- A normal HTTPS domain with a normal structure can remain Low even if its path contains "login".
- An IP address, misleading domain structure, impersonation indicators, obfuscation, and credential-related behavior should receive greater weight.
- Do not invent website reputation, ownership, malware, or external information.
- Base the assessment only on the URL and the structural findings.

RISK GUIDELINES:

LOW:
No meaningful indicators or only weak contextual indicators.

MEDIUM:
Suspicious indicators exist, but the URL alone does not confirm that the destination is malicious.
Describe the URL as suspicious or requiring caution.
Do NOT describe it as confirmed malicious, phishing, or credential theft unless there is strong evidence.

HIGH:
Multiple strong indicators suggest likely phishing, impersonation, credential theft, malicious delivery, or deliberate URL deception.
The recommendation may warn the user not to interact with the URL.
Do not claim confirmed malware or malicious website contents because the URL alone cannot prove that.
RECOMMENDATION RULES:

- LOW: Give a normal safe-use recommendation.

- MEDIUM: Do not claim that the URL is malicious, phishing, or associated with credential theft.
  State only the suspicious indicators that were actually detected.
  Recommend verifying the destination before interacting with it.

- HIGH: Advise the user not to click or submit credentials and recommend using a trusted official website or contact method.
IMPORTANT KEYWORD RULE:

Only include a threat keyword if the URL itself provides evidence for that threat.

A "/login" or "/signin" path alone does NOT prove credential theft.
A private IP address alone does NOT prove credential theft.
Do not include "credential theft", "phishing", or "malicious" merely because a URL contains login-related terminology.
Return ONLY valid JSON:

{
  "result": "Legitimate, Suspicious, Phishing, or Malicious",
  "riskLevel": "Low, Medium, or High",
  "keywords": [],
  "recommendation": "Short security recommendation"
}
`);

  // Structural analysis acts as a safety floor.
  // The LLM can increase the risk, but should not ignore strong
  // objective structural evidence.

  const riskRank = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  if (riskRank[structuralRisk] > riskRank[result.riskLevel]) {
    result.riskLevel = structuralRisk;
  }

  return result;
}

async function analyzeUrl(url, engine = "auto") {
  if (engine === "local") {
    const result = await analyzeUrlWithLocal(url);
    result.engine = "local";
    return result;
  }

  try {
    const result = await analyzeUrlWithGemini(url);
    result.engine = "gemini";
    return result;
  } catch (geminiError) {
    if (engine === "auto") {
      console.log("Gemini URL analysis failed. Switching to Local LLM...");

      const result = await analyzeUrlWithLocal(url);
      result.engine = "local";
      return result;
    }

    throw geminiError;
  }
}

module.exports = { analyzeUrl };