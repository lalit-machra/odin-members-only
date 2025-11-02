import express, { urlencoded } from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import getFunc from "connect-pg-simple";
import dotenv from "dotenv";

import { pool } from "./db/pool.js";
import { signupRouter } from "./routes/signupRoute.js";
import { loginRouter } from "./routes/loginRoute.js";
import "./controllers/login.js";  // has configuration for passport

dotenv.config();
const Store = getFunc(session);

const app = express();

const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Session configuration
const sessionStore = new Store({
  pool: pool,
  tableName: "session"
});
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 15
  }
}));
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(3000, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("project is live at: http://localhost:3000");
});