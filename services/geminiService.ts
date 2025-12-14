import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ReplyTone } from "../types";

const API_KEY = process.env.API_KEY || '';

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
    return "Error: API Key is missing. Please configure process.env.API_KEY.";
  }

  const ai = getClient();
  
  let toneDescription = tone as string;
  let styleDescription = 'Informal, personal, direct.';

  // Custom overrides for specific tones to ensure high quality output matching user intent
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