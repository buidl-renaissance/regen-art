import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    if (!html || typeof html !== 'string') {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Prepare the prompt for OpenAI
    const prompt = `
      Extract structured list of events from the following HTML content.
      Return a JSON object with the following fields (if available):
      - title: The event title
      - description: A brief description of the event
      - date: The event date in YYYY-MM-DD format
      - startTime: The start time in 24-hour format (HH:MM)
      - endTime: The end time in 24-hour format (HH:MM), if available
      - location: The physical location of the event
      - venue: The venue name
      - address: The street address
      - city: The city
      - state: The state or province
      - zipCode: The postal code
      - organizer: The event organizer or host
      - price: The ticket price or cost information
      - url: The original event URL if present
      - imageUrl: URL to the event image if available
      - tags: An array of relevant tags or categories

      HTML content:
      ${html}
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that extracts structured event information from HTML content. Return only valid JSON without any explanations or markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'Failed to extract event data' },
        { status: 500 }
      );
    }

    try {
      // Try to parse the JSON response
      const eventData = JSON.parse(content);
      return NextResponse.json({ data: eventData });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse extracted event data', rawResponse: content },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in event extraction:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
