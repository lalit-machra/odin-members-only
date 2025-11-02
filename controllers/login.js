import passport from "passport";
import LocalStrategy from "passport-local";
import { pool } from "../db/pool.js";
import bcrypt from "bcryptjs";

const customFields = {
  usernameField: "username",
  passwordField: "password"
}

// Implement passport local strategy for login
passport.use(new LocalStrategy(customFields, (
  async function (username, password, done) {
    try {
      let userExists = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
      if (userExists) {
        let user = userExists.rows[0];
        if (user) {
          let passwordCheck = await bcrypt.compare(password, user.password);
          if (passwordCheck) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect Password" });
          }
        } else {
          return done(null, false, { message: "Invalid Username" });
        }
      } else {
        throw new Error("Couldn't fetch user, please try again");
      }
    } catch(err) {
      return done(null, false, { message: err });
    }
  }
)));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    let userExists = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userExists) {
      let user = userExists.rows[0];
      done(null, user);
    } else {
      throw new Error("Couldn't fetch user");
    }
  } catch(err) {
    done(err);
  }
});