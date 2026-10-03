const { GoogleGenerativeAI } = require("@google/generative-ai");
const { analyzeWithOllama } = require("./ollamaService");

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

async function analyzeUrlWithLocal(text) {
  return analyzeWithOllama(`
Analyze this URL specifically for cybersecurity threats:

URL:
${text}

Focus on phishing, malicious URLs, credential theft, impersonation,
scams, suspicious domains, suspicious paths, and other URL-based threats.

If there are no suspicious indicators, return an empty keywords array [].

Return ONLY valid JSON:

{
  "result": "Legitimate or a short description of the URL threat",
  "riskLevel": "Low, Medium, or High",
  "keywords": [],
  "recommendation": "A short appropriate security recommendation"
}
`);
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