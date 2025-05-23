import { NextResponse } from 'next/server';
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const ArtworkSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an art expert who can analyze images and create compelling titles and descriptions for artwork. 
    Look at the provided image and create an engaging title and detailed description that captures the essence of the artwork.`;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: [
            { type: "text", text: "Please create a title and description for this artwork:" },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        },
      ],
      response_format: zodResponseFormat(ArtworkSchema, "artwork"),
    });
    
    const artwork = completion.choices[0].message.parsed;

    return NextResponse.json({ artwork });

  } catch (error: unknown) {
    console.error("Artwork API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate artwork title and description",
        detail: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
