import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { artworks } = body;

    if (!artworks || !Array.isArray(artworks) || artworks.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of artwork information' },
        { status: 400 }
      );
    }

    // Create messages for OpenAI including both text descriptions and images
    const messages = [
      {
        role: 'system',
        content:
          "You are a creative storyteller specializing in art narratives. Create a compelling story that connects the provided artworks into a cohesive narrative for 'The Digital Renaissance' - a movement where art, technology, and rebellion intersect. The tone should be revolutionary, inspiring, and slightly mysterious. The output should be in the form of html body tags: h1, h2, p, strong, em, blockquote, .story-section,.artwork-reference, .story-divider.",
      },
    ];

    // Add text descriptions
    let textContent = 'Create a storyline connecting these artworks:';
    artworks.forEach((art: any, index: number) => {
      if (art.title || art.description) {
        textContent += `\n\nArtwork ${index + 1}: ${
          art.title || 'Untitled'
        } - ${art.description || 'No description provided'} image: ${
          art.data.image
        }`;
      }
    });

    messages.push({ role: 'user', content: textContent });

    // Add image content if available
    // artworks.forEach((art: any, index: number) => {
    //   if (art.data.image) {
    //     messages.push({
    //       role: 'user',
    //       content: [
    //         { type: 'text', text: `Artwork ${index + 1} image:` },
    //         {
    //           type: 'image_url',
    //           image_url: {
    //             url: art.data.image,
    //           },
    //         },
    //       ],
    //     });
    //   }
    // });

    // Generate story using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages.map((msg) => {
        if (typeof msg.content === 'string') {
          return {
            role: msg.role as 'system' | 'user' | 'assistant',
            content: msg.content,
          };
        } else {
          return {
            role: msg.role as 'system' | 'user' | 'assistant',
            content: msg.content,
          };
        }
      }),
      max_tokens: 1000,
      temperature: 0.8,
    });

    const story = completion.choices[0].message.content?.replace(/^```html\n/, '').replace(/\n```$/, '');

    // Return HTML format instead of JSON
    return new NextResponse(story, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate story',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      'Send a POST request with an array of artwork information (including imageUrl, title, and description) to generate a story',
  });
}
