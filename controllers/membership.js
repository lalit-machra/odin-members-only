import { pool } from "../db/pool.js";

async function getSecretKey() {
  let response = await pool.query(`SELECT key FROM secretkeys WHERE name = 'secretkey1'`);
  if (response) {
    let key = response.rows[0].key;
    return key;
  } else {
    return null;
  }
}

async function addToMembers(user) {
  let id = user.id;
  await pool.query(`UPDATE users SET membership = true WHERE id = $1`, [id]);
  return;
}

export { getSecretKey, addToMembers }