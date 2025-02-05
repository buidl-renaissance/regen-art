import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Pool } from 'pg';
import { Profile } from '@/lib/types';

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './events.sqlite',
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        date TEXT,
        time TEXT,
        location TEXT,
        category TEXT,
        eventbriteId TEXT,
        lumaId TEXT,
        blockchainHash TEXT
      )
    `);
  }
  return db;
}

export async function insertEvent(event: any) {
  const db = await openDb();
  const result = await db.run(
    `
    INSERT INTO events (title, description, date, time, location, category, eventbriteId, lumaId, blockchainHash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      event.title,
      event.description,
      event.date,
      event.time,
      event.location,
      event.category,
      event.eventbriteId,
      event.lumaId,
      event.blockchainHash,
    ]
  );
  return result.lastID;
}

export async function getEvents() {
  const db = await openDb();
  return db.all('SELECT * FROM events');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createQuestionnaireTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS questionnaire_responses (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        preferences JSONB,
        custom_idea TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } finally {
    client.release();
  }
};

export const saveQuestionnaireResponse = async (
  email: string,
  preferences: any
) => {
  const client = await pool.connect();

  // Convert preferences object to JSON string, excluding customIdea
  const { customIdea, ...prefsToSave } = preferences;
  const preferencesJson = JSON.stringify(prefsToSave);

  try {
    await createQuestionnaireTable();

    const result = await client.query(
      `INSERT INTO questionnaire_responses (email, preferences, custom_idea)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET
         preferences = EXCLUDED.preferences,
         custom_idea = EXCLUDED.custom_idea,
         created_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [email, preferencesJson, preferences.customIdea || null]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error saving questionnaire response:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getQuestionnaireResponse = async (email: string) => {
  const client = await pool.connect();

  try {
    await createQuestionnaireTable();

    const result = await client.query(
      'SELECT * FROM questionnaire_responses WHERE email = $1',
      [email]
    );

    if (result.rows[0]) {
      return {
        ...result.rows[0],
        preferences: JSON.parse(result.rows[0].preferences),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting questionnaire response:', error);
    throw error;
  } finally {
    client.release();
  }
};

// await client.query(`
//   CREATE TABLE IF NOT EXISTS email_captures (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL,
//     form_id VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE(email, form_id)
//   )
// `)

export const storeEmail = async (email: string, formId: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `INSERT INTO email_captures (email, form_id)
       VALUES ($1, $2)
       ON CONFLICT (email, form_id) DO UPDATE SET
         created_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [email, formId]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error storing email:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const createProfileTable = async () => {
  const client = await pool.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE,
      handle TEXT UNIQUE,
      name TEXT,
      bio TEXT,
      profile_picture VARCHAR(255),
      data JSONB,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const saveProfile = async (profile: Profile) => {
  const client = await pool.connect();

  try {
    if (!profile.data) {
      const result = await client.query(
        `INSERT INTO profiles (
          email,
          handle,
          name,
          bio,
          profile_picture
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (handle) DO UPDATE SET
          email = $1,
          name = $3,
          bio = $4,
          profile_picture = $5,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id`,
        [profile.email, profile.handle, profile.name, profile.bio || null, profile.profile_picture || null]
      );
      return result.rows[0].id;
    } else {
      const result = await client.query(
        `INSERT INTO profiles (
            email,
            handle,
            name,
            bio,
            profile_picture,
            data
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (handle) DO UPDATE SET
            email = $1,
            name = $3,
            bio = $4,
            profile_picture = $5,
            data = $6,
            updated_at = CURRENT_TIMESTAMP
          RETURNING id`,
        [
          profile.email,
          profile.handle,
          profile.name,
          profile.bio || null,
          profile.profile_picture || null,
          profile.data || null,
        ]
      );
      return result.rows[0].id;
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getProfiles = async () => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM profiles');
  return result.rows;
};

export const getProfile = async (id: string) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM profiles WHERE id = $1', [
    id,
  ]);
  return result.rows[0];
};

export const getMembers = async () => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM profiles');
  return result.rows;
};
