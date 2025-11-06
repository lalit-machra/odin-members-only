import { Router } from "express";
import { getAllMessages, checkMember, checkAdmin, addAuthorToMessages } from "../controllers/index.js";

const indexRouter = new Router();

indexRouter.get("/", async (req, res) => {
  let member = false;
  let admin = false;
  let messages = await getAllMessages();
  if (req.user) {
    member = await checkMember(req.user.id);
    admin = await checkAdmin(req.user.id);
    messages = await addAuthorToMessages(messages);
  }
  res.render("index", { user: req.user, member, admin, messages });
});

export { indexRouter };