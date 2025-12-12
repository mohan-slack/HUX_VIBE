import { GoogleGenAI } from "@google/genai";
import { FAQ_KNOWLEDGE_BASE } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: FAQ_KNOWLEDGE_BASE,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to the HUX network. Please try again in a moment.";
  }
};