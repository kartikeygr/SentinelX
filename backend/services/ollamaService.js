const OLLAMA_URL =
  process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || "sentinelx-local";

async function analyzeWithOllama(text) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 60000);

  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          {
            role: "system",
            content: `You are SentinelX, an AI cybersecurity threat detector.

Analyze messages for:
- phishing
- scams
- fraud
- malicious links
- credential theft
- impersonation
- financial fraud
- malware
- social engineering
- suspicious cyber activity

Rules:
1. Do not treat normal everyday words as suspicious.
2. Only include cybersecurity-related suspicious keywords.
3. Normal messages should have riskLevel "Low".
4. If there are no suspicious keywords, return [].
5. Do not invent threats.
6. Base the analysis only on the provided message.

Return ONLY valid JSON:

{
  "result": "Legitimate or a short description of the threat",
  "riskLevel": "Low, Medium, or High",
  "keywords": [],
  "recommendation": "A short appropriate recommendation"
}`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        stream: false,
        format: "json",
        think: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama returned HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log("OLLAMA RAW RESPONSE:");
console.log(data.message.content);

return JSON.parse(data.message.content);
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { analyzeWithOllama };