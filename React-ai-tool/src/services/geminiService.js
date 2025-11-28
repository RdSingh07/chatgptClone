// Gemini AI service for generating AI responses

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI client
const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBc-cI4sK3Jw2DL-_2sFCWyHdDyZMqzomg";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`
  return new GoogleGenAI({
    apiKey: apiKey,
  });
};

// Generate AI response using Gemini
export const generateAIResponse = async (userMessage, conversationHistory = []) => {
  try {
    const ai = getGeminiClient();

    // Build conversation history as a string
    let conversationContext = "";
    if (conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .map((msg) => {
          const role = msg.sender === "user" ? "User" : "Assistant";
          return `${role}: ${msg.text}`;
        })
        .join("\n");
      conversationContext += `\nUser: ${userMessage}`;
    } else {
      conversationContext = userMessage;
    }

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversationContext,
    });

    // Extract text from response
    // The response structure may vary, so we try multiple paths
    let responseText = "";

    if (response.text) {
      responseText = response.text;
    } else if (response.response?.text) {
      responseText = response.response.text;
    } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      responseText = response.candidates[0].content.parts[0].text;
    } else if (typeof response === "string") {
      responseText = response;
    } else {
      responseText = "Sorry, I couldn't generate a response.";
    }

    return responseText;
  } catch (error) {
    console.error("Error generating AI response:", error);

    // Return user-friendly error message
    if (error.message?.includes("API key") || error.message?.includes("API_KEY")) {
      return "Error: API key is invalid or missing. Please check your GEMINI_API_KEY.";
    }

    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return "Error: API quota exceeded. Please try again later.";
    }

    return `Error: ${error.message || "Failed to generate response. Please try again."}`;
  }
};
