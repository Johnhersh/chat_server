import express from "express";
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
  console.log(`Getting active users`);
  const activeUsers = getActiveUsers();

  res.send(activeUsers);
});

export default router;
