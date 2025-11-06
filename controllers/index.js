import { pool } from "../db/pool.js";

async function getAllMessages() {
  let response = await pool.query(`SELECT * FROM messages;`);
  if (response) {
    let messages = response.rows;
    return messages;
  } else {
    return [];
  }
}

async function checkMember(userid) {
  let response = await pool.query("SELECT membership FROM users WHERE id = ($1)", [userid]);
  let memberStatus = response.rows[0].membership;
  return memberStatus;
}

async function checkAdmin(userid) {
  let response = await pool.query(`SELECT admin FROM users WHERE id = $1;`, [userid]);
  let adminStatus = response.rows[0].admin;
  return adminStatus;
}

async function addAuthorToMessages(messages) {
  let messagesWithAuthor = [];
  for (let message of messages) {
    let myMessage = Object.assign({}, message);
    let response = await pool.query(`SELECT firstname, lastname FROM users WHERE id = $1;`, [message.user_id]);
    let firstName = response.rows[0].firstname;
    let lastName = response.rows[0].lastname;
    let fullName = firstName + ' ' + lastName;
    myMessage.author = fullName;
    messagesWithAuthor.push(myMessage);
  };
  return messagesWithAuthor;
}

export { getAllMessages, addAuthorToMessages, checkMember, checkAdmin }