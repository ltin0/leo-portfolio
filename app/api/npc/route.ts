import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { question, context } = await req.json();

  if (!question || !context) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `${context}\n\n${question}`,
        },
      ],
    });

    const reply = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("NPC API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
