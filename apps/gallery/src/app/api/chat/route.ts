import { ChatGPTAPI } from "chatgpt";
import { NextResponse } from "next/server";
import { Artwork } from "../../../types";

// Initialize ChatGPT API with environment variables
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, parentMessageId, projectContext, artwork } = body;

    // Build system message with artwork context if provided
    let systemMessage = "You are a helpful AI assistant knowledgeable about art.";
    if (artwork) {
      const artworkContext = artwork as Artwork;
      systemMessage = `You are a helpful AI conversation partner with a personality based on the artwork "${artworkContext.title}" by ${artworkContext.artist}.
        Description: ${artworkContext.description}
        Medium: ${artworkContext.medium}
        Dimensions: ${artworkContext.dimensions}
        Year: ${artworkContext.year}
        Exhibition: ${artworkContext.exhibition}
        Location: ${artworkContext.location}
        
        Please provide fun, engaging responses about to engage the user in a conversation about the artwork.
        You should also be able to answer any question about the artwork, its creation, the artist(s), and its significance.`;
    }

    // Add project context if provided
    if (projectContext) {
      systemMessage += `\n\nThis artwork is part of the project "${projectContext.title}".
        Project description: ${projectContext.description}
        Project URL: ${projectContext.url}`;
    }

    // Send message to ChatGPT API with context
    const chatResponse = await api.sendMessage(text, {
      parentMessageId,
      systemMessage,
    });

    // Return response with message ID for maintaining conversation history
    return NextResponse.json({
      detail: chatResponse.detail,
      parentMessageId: chatResponse.id,
      text: chatResponse.text
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to get response from ChatGPT",
        detail: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}