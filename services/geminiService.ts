import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateFashionArticle = async (topic: string): Promise<{ title: string; content: string; excerpt: string }> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const prompt = `
    Write a high-fashion, engaging blog post for "Styllen", an AI fashion assistant brand.
    Topic: ${topic}.
    Target Audience: Fashion-forward individuals, Gen Z and Millennials.
    Tone: Sophisticated, inspiring, yet accessible.
    Structure:
    1. Catchy Title (do not label it "Title:")
    2. Engaging Excerpt (approx 30 words, do not label it "Excerpt:")
    3. Main Content (Markdown format, use headers, bullet points for trends).
    
    Return the response as a valid JSON object with keys: "title", "excerpt", "content".
    Ensure the JSON is pure and not wrapped in markdown code blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating article:", error);
    throw error;
  }
};

export const chatWithStyllen = async (history: ChatMessage[], message: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I can't connect to my fashion brain right now. Please check the API configuration.";
  }

  try {
    // Convert history to Gemini format if using chat history, 
    // but for simplicity in this specific "stateless-ish" helper, we'll just send context + message 
    // or maintain a chat session instance in the component. 
    // Here we will use a single turn generation with context for simplicity in the service function, 
    // or better, recreate the chat context.

    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Styllen, an elite AI fashion assistant. 
        Your goal is to help users plan outfits, explore trends, and understand their personal style.
        You are knowledgeable about skin tones, body shapes, fabrics, and seasonal trends.
        Keep responses stylish, concise, and helpful. Use emojis sparingly but effectively.
        If asked about 3D features or specific app functions, explain them enthusiastically as features of the Styllen app.`,
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm speechless! That's a tough fashion dilemma.";
  } catch (error) {
    console.error("Error chatting with Styllen:", error);
    return "My connection to the fashion world is a bit spotty. Try again in a moment.";
  }
};