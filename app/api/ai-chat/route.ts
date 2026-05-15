import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API Key not configured" },
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = "You are AutoNova Motors' friendly car assistant. You help customers find the right used car. You know we sell BMW, Mercedes, Audi, Toyota, Ford, Tesla, Honda, Volkswagen, Hyundai. Price range $13,000–$31,000. All cars are inspected. We offer financing, test drives, and home delivery. Keep answers short, friendly, and helpful. If asked about a specific car, suggest visiting /cars page.";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Anthropic API Error:", error);
      throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    const aiMessage = data.content[0].text;

    return NextResponse.json(
      { message: aiMessage },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
