
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const response = await ai.interactions.create({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      input: "Introduce yourself as the AI Toy Assistant for ToyLand.",
    });

    console.log("Gemini connection successful!");
    console.log(response.output_text);

  } catch (error) {
    console.error("Gemini API error:", error);
  }
}

testGemini();
