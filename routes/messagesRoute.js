import { Router } from "express";
import { uploadMsg } from "../controllers/messages.js";

const messagesRouter = new Router();

messagesRouter.get("/", (req, res) => {
  if (req.user) {
    res.render("messages");
  } else {
    res.redirect("/login");
  }
});

messagesRouter.post("/", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.user.id;
  let currentDatetime = new Date();
  let timestamp = currentDatetime.getDate() + '/'
    + currentDatetime.getMonth() + '/'
    + currentDatetime.getFullYear() + ' '
    + currentDatetime.getHours() + ':'
    + currentDatetime.getMinutes();
  
  if (userId && title && content) {
    await uploadMsg(title, timestamp, content, userId);
    res.redirect("/");
  } else {
    res.redirect("/messages");
  }
});

export { messagesRouter }