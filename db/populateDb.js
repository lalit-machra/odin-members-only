import { pool } from "./pool.js";

async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstname VARCHAR (32),
      lastname VARCHAR (32),
      username VARCHAR (32),
      password TEXT,
      membership BOOLEAN,
      admin BOOLEAN
    );
  `);
}

async function createMessagesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR (128),
      timestamp TIMESTAMP,
      content TEXT,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}