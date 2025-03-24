import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define schema for OpenAI response
const AnalysisSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Get analysis from OpenAI Vision API
    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is an artwork. Please analyze it and provide a title and detailed description. Format the response as JSON with 'title' and 'description' fields. Keep the title concise but creative, and make the description detailed but under 200 words.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      response_format: zodResponseFormat(AnalysisSchema, "analysis"),
    });

    // Parse and validate the response
    const rawAnalysis = JSON.parse(response.choices[0].message.content || "{}");
    const analysis = AnalysisSchema.parse(rawAnalysis);

    return NextResponse.json({
      title: analysis.title,
      description: analysis.description,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid response format from AI",
          details: error.errors,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to analyze image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
