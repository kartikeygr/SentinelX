require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SentinelX Backend Running");
});

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are SentinelX, an AI cybersecurity threat detector.

Analyze the following message for:
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

Message:
"${text}"

Important rules:
1. Do NOT treat normal everyday words as suspicious keywords.
2. Only include keywords or phrases that are actually relevant to a cybersecurity threat.
3. If the message is completely normal, set riskLevel to "Low".
4. If there are no security-related suspicious keywords, return an empty array [].
5. A normal personal statement such as "I had pizza for lunch today" should be classified as legitimate.
6. Do not invent threats that are not present in the message.
7. Base your analysis only on the provided message.

Respond ONLY in this JSON format:

{
  "result": "Legitimate or a short description of the threat",
  "riskLevel": "Low, Medium, or High",
  "keywords": [],
  "recommendation": "A short appropriate recommendation"
}
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log(responseText);

    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;

try {
  parsedData = JSON.parse(cleanedResponse);
} catch {
  parsedData = {
    result: cleanedResponse,
    riskLevel: "Medium",
    keywords: ["AI detected"],
    recommendation: "Be cautious with suspicious messages.",
  };
}

    console.log(parsedData);

res.json(parsedData);

  } catch (error) {
    console.log(error);

    res.json({
      result: "AI Analysis Failed",
      riskLevel: "Unknown",
      keywords: ["error"],
      recommendation: "Try again later",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port 5000`);
});