import { Router } from "express";
import { getSecretKey, addToMembers } from "../controllers/membership.js";

const membershipRouter = new Router();

membershipRouter.get("/", (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("membership");
  }
});

membershipRouter.post("/", async (req, res) => {
  const key = req.body.secretkey;
  const secretKey = await getSecretKey();
  if (key == secretKey) {
    await addToMembers(req.user);
    console.log("Member access granted");
    res.redirect("/");
  } else {
    res.render("membership");
  }
});

export { membershipRouter }