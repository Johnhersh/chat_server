import express from "express";
import cors from "cors";
import socketio from "socket.io";
import bodyParser from "body-parser";
import http = require("http");

import { addUser } from "./users";

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
    const newUser = addUser(name);

    if (newUser.error) return callback(newUser.error);
  });
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server!!");
  // console.log(req.body);
  // database("messages")
  //   .insert({
  //     chat_message: "test",
  //     from_user: "testuser",
  //     time: new Date(),
  //   })
  //   .then(console.log);
  // console.log(`Received`);
});

app.post("/login", jsonParser, (req, res) => {
  const newUser: { newUser: string } = req.body;
  const result = addUser(newUser.newUser);

  res.send(result);
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
