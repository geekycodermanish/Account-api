import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const initDatabase = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      birthday TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_modified TEXT NOT NULL
    )
  `);

  return db;
};
