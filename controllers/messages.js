import { pool } from "../db/pool.js";

async function uploadMsg(title, timestamp, content, user_id) {
  let response = await pool.query(`
    INSERT INTO messages(title, timestamp, content, user_id)
    VALUES ($1, $2, $3, $4);
    `, [title, timestamp, content, user_id]);

  return;
}

export { uploadMsg };