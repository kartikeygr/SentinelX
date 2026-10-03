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
IMPORTANT SCAM DETECTION RULES:

- Messages involving unexpected lottery winnings, prize claims, processing fees,
  advance payments, or requests for bank/payment details should be treated as
  potential financial scams.
- Urgent requests for money or financial information are strong risk indicators.
- Do not classify a message as Legitimate merely because it does not contain a link.
- Consider the combination of multiple suspicious indicators rather than requiring
  a specific keyword.
  - Messages claiming that an account will be locked, suspended, or closed
  unless the user acts immediately should be treated as potential phishing
  or social engineering.
- Requests to provide, confirm, or enter passwords or other credentials
  through an unsolicited message are strong phishing indicators.
- Do not assume a message is legitimate merely because it mentions a real
  company, bank, platform, or service.
- Never recommend that a user send or confirm their password in response to
  an unsolicited message.
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