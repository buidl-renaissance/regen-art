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
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const instagram = formData.get('instagram') as string;
    const bio = formData.get('bio') as string;
    const isAvailable = formData.get('isAvailable') as string;
    const willingToSpeak = formData.get('willingToSpeak') as string;
    
    // Handle image files
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];
    
    // Process images (in a real app, you'd upload these to a storage service)
    // For now, we'll just store the file names
    for (const file of imageFiles) {
      // In production, upload to cloud storage and store the URL
      imageUrls.push(file.name);
    }
    
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


