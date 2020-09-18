import express from "express";
import { getMessageLog } from "./database";
import { isUserNameAvailable, getActiveUsers } from "./users";
import bodyParser from "body-parser";
const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) => {
  const newUser: { newUser: string } = req.body;
  let result = false;

  if (isUserNameAvailable(newUser.newUser)) result = true;

  res.send(result);
});

router.get("/getActiveUsersList", (_req, res) => {
  const activeUsers = getActiveUsers();

  res.send(activeUsers);
});

router.get("/getMessageLog", (_req, res) => {
  getMessageLog().then((data) => res.send(data));
});

export default router;
