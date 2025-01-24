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

