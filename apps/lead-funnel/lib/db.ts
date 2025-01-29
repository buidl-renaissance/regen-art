import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './events.sqlite',
      driver: sqlite3.Database
    })

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
    `)
  }
  return db
}

export async function insertEvent(event: any) {
  const db = await openDb()
  const result = await db.run(`
    INSERT INTO events (title, description, date, time, location, category, eventbriteId, lumaId, blockchainHash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [event.title, event.description, event.date, event.time, event.location, event.category, event.eventbriteId, event.lumaId, event.blockchainHash])
  return result.lastID
}

export async function getEvents() {
  const db = await openDb()
  return db.all('SELECT * FROM events')
}

const createQuestionnaireTable = async (db: any) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS questionnaire_responses (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE,
      preferences JSONB,
      custom_idea TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export const saveQuestionnaireResponse = async (email: string, preferences: any) => {
  const db = await openDb()
  // await createQuestionnaireTable(db)
  
  // Convert preferences object to JSON string, excluding customIdea
  const { customIdea, ...prefsToSave } = preferences
  const preferencesJson = JSON.stringify(prefsToSave)

  try {
    const result = await db.run(`
      INSERT INTO questionnaire_responses (email, preferences, custom_idea)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO UPDATE SET
        preferences = EXCLUDED.preferences,
        custom_idea = EXCLUDED.custom_idea,
        created_at = CURRENT_TIMESTAMP
    `, [email, preferencesJson, preferences.customIdea || null])
    
    return result.lastID
  } catch (error) {
    console.error('Error saving questionnaire response:', error)
    throw error
  }
}

export const getQuestionnaireResponse = async (email: string) => {
  const db = await openDb()
  await createQuestionnaireTable(db)
  
  try {
    const response = await db.get('SELECT * FROM questionnaire_responses WHERE email = $1', [email])
    if (response) {
      return {
        ...response,
        preferences: JSON.parse(response.preferences)
      }
    }
    return null
  } catch (error) {
    console.error('Error getting questionnaire response:', error)
    throw error
  }
}

