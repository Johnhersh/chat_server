import express from "express";
import cors from "cors";
import socketio from "socket.io";
import bodyParser from "body-parser";
import http = require("http");

import { checkIfUserIsActive, addUser, getActiveUsers, removeUser, getUser } from "./users";

// const database = require("knex")({
//   client: "pg",
//   connection: {
//     host: "ec2-52-72-65-76.compute-1.amazonaws.com",
//     user: "xyiihuvayytyhr",
//     password: "4cc27f1380333718ab92600d389eebb92ac061ac410cd5ac63bd88a7df989791",
//     database: "d2emsvsn090cem",
//     ssl: { rejectUnauthorized: false },
//   },
// });

/** Server definitions */
const PORT = 3001;
const app = express();
const jsonParser = bodyParser.json();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", (newUser: { username: string; room: string }, callback: Function) => {
    const { username, room } = newUser;
    addUser(username, room, socket.id);
    socket.join(room);

    socket.broadcast.emit("user_joined", username);

    if (callback) callback();
  });

  socket.on("submit_message", (message: string) => {
    const messageSender = getUser(socket.id);
    const targetRoom = messageSender.room;
    const senderName = messageSender.username;
    socket.to(targetRoom).emit("receive_message", { message, senderName });
  });

  socket.on("disconnect", () => {
    console.log(`Lost user`);
    const removedUser = removeUser(socket.id);
    socket.broadcast.emit("user_left", removedUser);
  });
});

app.post("/login", jsonParser, (req, res) => {
  const newUser: { newUser: string } = req.body;
  const result = { nameAvailable: true };

  if (checkIfUserIsActive(newUser.newUser)) result.nameAvailable = false;

  res.send(result);
});

app.get("/getActiveUsersList", (_req, res) => {
  console.log(`Getting active users`);
  const activeUsers = getActiveUsers();

  res.send(activeUsers);
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
