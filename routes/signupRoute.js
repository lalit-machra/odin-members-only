import { Router } from "express";
import { signupHandler } from "../controllers/signup.js";

const signupRouter = new Router();

signupRouter.get("/", (req, res) => {
  res.render("signup");
});

signupRouter.post("/", signupHandler);

export { signupRouter };