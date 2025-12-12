import { GoogleGenAI } from "@google/genai";
import { FAQ_KNOWLEDGE_BASE } from '../constants';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
  console.warn('AI service not configured');
}
const ai = apiKey && apiKey !== 'PLACEHOLDER_API_KEY' ? new GoogleGenAI({ apiKey }) : null;

export const generateResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    if (!ai) {
      return "AI assistant is temporarily unavailable. Please contact support for assistance.";
    }
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