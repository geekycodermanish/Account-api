import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDatabase = async () => {
  try {
    const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    console.log("Connected to SQLite database.");

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
  } catch (error) {
    console.error('Error connecting to SQLite database:', error);
    throw error; // Rethrow the error to be handled elsewhere if necessary
  }
};

// Example usage:
(async () => {
  try {
    const db = await initDatabase();
    // You can now use 'db' for further database operations

    // Example: Perform a query to test the connection
    const accounts = await db.all('SELECT * FROM accounts');
    console.log('Retrieved accounts:', accounts);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
})();
