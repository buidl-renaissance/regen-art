import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a connection pool to Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: Request) {
  const client = await pool.connect();
  
  try {
    // Get submissions from the database
    const result = await client.query(
      `SELECT id, name, email, data, submitted_at, status 
       FROM artist_submission 
       ORDER BY submitted_at DESC`
    );
    
    // Format the submissions for the frontend
    const submissions = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
      submittedAt: row.submitted_at,
    }));
    
    return NextResponse.json({ 
      success: true, 
      submissions
    });
    
  } catch (error) {
    console.error('Error fetching artist submissions:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch submissions' 
    }, { status: 500 });
  } finally {
    client.release();
  }
}
