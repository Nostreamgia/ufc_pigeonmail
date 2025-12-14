import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ReplyTone } from "../types";

// Robustly retrieve API Key to avoid "ReferenceError" in strict browser environments
const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.API_KEY || '';
  }
  // Fallback if window.process is used (from polyfill)
  // @ts-ignore
  if (typeof window !== 'undefined' && window.process && window.process.env) {
      // @ts-ignore
      return window.process.env.API_KEY || '';
  }
  return '';
};

const API_KEY = getApiKey();

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: API_KEY });
  }
  return client;
};

export const generateReply = async (
  originalMessage: string,
  tone: ReplyTone
): Promise<string> => {
  if (!API_KEY) {
    // In production without an API key, we return a mock response to prevent crashing if the user hasn't set it up.
    // However, if the user intends to use it, they must set the key.
    console.warn("API Key is missing.");
    return "API Key is missing. Please configure process.env.API_KEY in your environment variables.";
  }

  const ai = getClient();
  
  let toneDescription = tone as string;
  let styleDescription = 'Informal, personal, direct.';

  if (tone === ReplyTone.OLD_ENGLISH) {
    toneDescription = 'Medieval, archaic, knightly, noble.';
    styleDescription = 'Use authentic Middle English or Early Modern English vocabulary and grammar (e.g., thou, thee, hath, verily, forsooth). Write like a Commander from the 14th century.';
  } else if (tone === ReplyTone.FORMAL) {
    styleDescription = 'Formal, professional, polite, structured.';
  }

  const prompt = `
    You are Rajdip, a retired legendary commander of a community group called 'UFC'.
    You have received the following heartfelt letter asking you to return to fix the community which has fallen into chaos.
    
    LETTER:
    "${originalMessage}"
    
    Task: Write a short, handwritten-style response note (under 100 words).
    Tone: ${toneDescription}.
    Style: ${styleDescription} Sign it as "Rajdip" or "Commander".
    Do not use markdown formatting like bold or italics, just plain text suitable for a handwritten note.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    return text || "Detailed thoughts elude me right now...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The ink has run dry... (API Error)";
  }
};