import express from "express";
import cors from "cors";
import socketio from "socket.io";
import { graphqlHTTP } from "express-graphql";
import http = require("http");

import router from "./router";
import { webSocket } from "./websocket";
import schema from "./schema";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/** Server definitions */
const PORT = process.env.PORT;
const GRAPHIQL: boolean = process.env.NODE_ENV !== "production" ? true : false;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
webSocket(io);

app.use(cors());
app.use(router);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: GRAPHIQL,
  })
);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
