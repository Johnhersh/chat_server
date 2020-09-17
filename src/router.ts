import express from "express";
import { getMessageLog } from "./database";
import { checkIfUserIsActive, getActiveUsers } from "./users";
import bodyParser from "body-parser";
const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) => {
  const newUser: { newUser: string } = req.body;
  const result = { nameAvailable: true };

  if (checkIfUserIsActive(newUser.newUser)) result.nameAvailable = false;

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
