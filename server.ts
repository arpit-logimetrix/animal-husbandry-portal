import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client server-side
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing in process.env");
    }
    return new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Routes

  // 1. Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", department: "Animal Husbandry Department Portal 2026-27" });
  });

  // 2. AI Chatbot ("PashuMitra / पशु मित्र")
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, language = "en", history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getAiClient();
      const systemInstruction = `You are 'PashuMitra' (पशु मित्र), the official 24x7 AI Assistant for the Animal Husbandry Department (पशुपालन विभाग), Government of India / State Govt (2026-27).
Your job is to assist livestock owners, farmers, poultry growers, and citizens regarding:
1. Animal health, nutrition, milk yield, vaccination schedules (FMD, HS, BQ, Brucellosis).
2. Government schemes (National Livestock Mission, Rashtriya Gokul Mission, Goatry/Piggery subsidies, Poultry farming).
3. Mobile Veterinary Unit (MVU 1962) emergency booking and service locations.
4. Family ID verification and subsidy application procedures.
Language preference requested: ${language === "hi" ? "Hindi (हिंदी)" : "English"}.
Be extremely helpful, polite, professional, and clear. Format key points with bullet points or bold text where appropriate. Always include emergency helpline 1962 advice when animal illness is described.`;

      const formattedContents = [
        ...history.map((h: { role: string; text: string }) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "Thank you for contacting PashuMitra. How else may I assist you?" });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      res.status(500).json({
        error: "AI service temporarily unavailable",
        fallbackText: "Dear Farmer, our PashuMitra server is experiencing heavy traffic. For immediate livestock emergency assistance, please call Toll-Free Helpline 1962.",
      });
    }
  });

  // 3. AI Disease Detection (Multimodal or text description)
  app.post("/api/ai/disease-detect", async (req, res) => {
    try {
      const { imageBase64, symptoms, animalType = "Cattle", language = "en" } = req.body;
      const ai = getAiClient();

      const systemInstruction = `You are an expert Veterinary Diagnostic AI System for the Animal Husbandry Department.
Analyze the provided symptoms and/or image of the animal (${animalType}).
Identify potential diseases (e.g. Lumpy Skin Disease, Foot and Mouth Disease / FMD, Mastitis, Anthrax, Swine Fever, Avian Influenza in poultry).
Provide:
1. Suspected Condition Name (English & Hindi)
2. Risk Level (Low / Moderate / High / Emergency)
3. Primary Symptoms Observed
4. Immediate First-Aid & Isolation Advice for the Farmer
5. Recommended Veterinary Medicines/Vaccines
6. Action step to dispatch MVU (Mobile Veterinary Unit - Call 1962)
Note: Emphasize that AI provides preliminary screening and official Veterinary Officer inspection is mandatory.`;

      const parts: any[] = [];
      if (imageBase64) {
        // Strip data URL header if present
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      parts.push({
        text: `Animal Type: ${animalType}. Observed Symptoms & Notes: ${symptoms || "Please analyze image/symptoms for potential health issues."}. Language requested: ${language === "hi" ? "Hindi" : "English"}.`,
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: { parts },
        config: { systemInstruction },
      });

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error("AI Disease detect error:", error);
      res.status(500).json({ error: "Disease detection AI unavailable", details: error?.message });
    }
  });

  // 4. AI Scheme Recommendation & Eligibility Engine
  app.post("/api/ai/recommend-schemes", async (req, res) => {
    try {
      const { familyId, landSizeAcres, category, livestockOwned, annualIncome } = req.body;
      const ai = getAiClient();

      const prompt = `Farmer Profile:
- Family ID: ${familyId || "FID-998821"}
- Annual Income: ₹${annualIncome || "120000"}
- Category: ${category || "Small/Marginal Farmer"}
- Land Size: ${landSizeAcres || "1.5"} acres
- Current Livestock: ${JSON.stringify(livestockOwned || { cows: 2, buffaloes: 1, goats: 4 })}

Please recommend the top 3 Government Animal Husbandry Schemes this farmer qualifies for.
Include for each:
1. Scheme Name (English & Hindi)
2. Subsidy Percentage (e.g., 50% for SC/ST/Women, 40% for General)
3. Maximum Financial Assistance Amount
4. Expected Benefit & Key Eligibility Criteria
5. Required Documents (Family ID, Aadhaar, Bank Passbook, Land record)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an official Govt Scheme Eligibility Advisor for Animal Husbandry. Output crisp, formatted JSON or structured clear recommendations.",
        },
      });

      res.json({ recommendations: response.text });
    } catch (error: any) {
      console.error("AI Scheme recommendation error:", error);
      res.status(500).json({ error: "Scheme recommendation error", details: error?.message });
    }
  });

  // 5. AI Predictive Analytics (Budget & Outbreak Forecasting)
  app.post("/api/ai/predictive-analytics", async (req, res) => {
    try {
      const { district, focusArea } = req.body;
      const ai = getAiClient();

      const prompt = `Generate a predictive analysis report for District: ${district || "Statewide"} focusing on: ${focusArea || "Vaccination Coverage & Disease Outbreak Risk Forecast 2026-27"}.
Include:
1. Predicted High-Risk Livestock Diseases in next quarter
2. Recommended Vaccine Stock Requirement
3. Budget Expenditure Forecast vs Target
4. Key Action Items for District Veterinary Officer (DVO)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ forecast: response.text });
    } catch (error: any) {
      res.status(500).json({ error: "Predictive analytics error" });
    }
  });

  // Vite middleware in dev / static serve in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Unified Animal Husbandry Portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
