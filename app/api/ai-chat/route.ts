import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        { error: "Valid Gemini API Key not found in .env.local" },
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    const systemPrompt = "You are AutoNova Motors' elite car concierge in New York. You help customers find luxury pre-owned vehicles. Our inventory includes BMW M4, Tesla Model 3 Performance, Mercedes C63 AMG, Audi RS5, and Porsche 911. Price range: $45k - $115k. We offer financing, 150-point inspections, and home delivery. Keep answers short, premium, and professional. Always suggest visiting the /cars page for the full list.";

    // Simple direct prompt for maximum reliability
    const userMessage = messages[messages.length - 1].content;
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json(
      { message: text },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    return NextResponse.json(
      { error: "I'm having trouble connecting to the AI brain. Please try again in a moment." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
