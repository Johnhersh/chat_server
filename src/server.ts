import express from "express";
import cors from "cors";
import socketio from "socket.io";
import http = require("http");

import router from "./router";
import { webSocket } from "./websocket";

/** Server definitions */
const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
webSocket(io);

app.use(cors());
app.use(router);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
