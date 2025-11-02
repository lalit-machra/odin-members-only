import { Router } from "express";
import passport from "passport";

const loginRouter = new Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { loginErr: req.session.messages });
});

loginRouter.post("/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
  })
);

export { loginRouter };