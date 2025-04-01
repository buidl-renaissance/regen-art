import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a connection pool to Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(request: Request) {
  const client = await pool.connect();
  
  try {
    const data = await request.json();
    
    // Extract form fields
    const name = data.name as string;
    const email = data.email as string;
    const instagram = data.instagram as string;
    const bio = data.bio as string;
    const isAvailable = data.isAvailable as string;
    const willingToSpeak = data.willingToSpeak as string;
    const imageUrls = data.imageUrls as string[] || [];
    
    // Store in database
    const result = await client.query(
      `INSERT INTO artist_submission (name, email, data, submitted_at)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        name,
        email,
        JSON.stringify({
          instagram,
          bio,
          isAvailable: isAvailable === 'yes',
          willingToSpeak: willingToSpeak === 'yes',
          imageUrls,
        }),
        new Date()
      ]
    );
    
    const submissionId = result.rows[0].id;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Artist submission received',
      id: submissionId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing artist submission:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process submission' 
    }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function GET(request: Request) {
  return new Response('Artist intake API endpoint is working. Use POST to submit data.');
}


