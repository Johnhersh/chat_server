import express from "express";
import cors from "cors";
import socketio from "socket.io";
import bodyParser from "body-parser";
import http = require("http");

import { checkIfUserIsActive, addUser, getActiveUsers, removeUser } from "./users";

const database = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-52-72-65-76.compute-1.amazonaws.com",
    user: "xyiihuvayytyhr",
    password: "4cc27f1380333718ab92600d389eebb92ac061ac410cd5ac63bd88a7df989791",
    database: "d2emsvsn090cem",
    ssl: { rejectUnauthorized: false },
  },
});

/** Server definitions */
const PORT = 3001;
const app = express();
const jsonParser = bodyParser.json();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", (name: string, callback: Function) => {
    addUser(name, socket.id);

    if (callback) callback();
  });

  socket.on("disconnect", () => {
    console.log(`Lost user`);
    removeUser(socket.id);
  });
});

// app.get("/", (req, res) => {
// });

app.post("/login", jsonParser, (req, res) => {
  const newUser: { newUser: string } = req.body;
  const result = { nameAvailable: true };

  if (checkIfUserIsActive(newUser.newUser)) result.nameAvailable = false;

  res.send(result);
});

app.get("/getActiveUsersList", (req, res) => {
  console.log(`Getting active users`);
  const activeUsers = getActiveUsers();

  res.send(activeUsers);
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
