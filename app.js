import express, { urlencoded } from "express";
import { signupRouter } from "./routes/signupRoute.js";
import path from "node:path";

const app = express();

app.use(urlencoded({ extended: false }));

const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.redirect("/signup");
});

app.use("/signup", signupRouter);

app.listen(3000, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("project is live at: http://localhost:3000");
});