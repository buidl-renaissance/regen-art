import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

const RatingSchema = z.object({
  is_useful: z.boolean(),
  category: z.enum(["question", "comment", "other"]).nullable(),
  explanation_if_not_useful: z.string().nullable(),
  analysis: z.string().nullable(),
  rating: z.number().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, projectContext } = body;

    // Build system message with project context if provided
    let systemMessage = "You are a helpful AI assistant.";
    if (projectContext) {
      systemMessage = `You are a helpful AI assistant discussing the project "${projectContext.title}". 
        Project description: ${projectContext.description}
        Project URL: ${projectContext.url}`;
    }

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: text },
      ],
      response_format: zodResponseFormat(RatingSchema, "rating"),
    });
    
    const rating = completion.choices[0].message.parsed;

    // Return response with message ID for maintaining conversation history
    return NextResponse.json({
      rating,
    });

  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to get response from ChatGPT",
        detail: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}