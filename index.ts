import express from "express";
import cors from "cors";

var database = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-52-72-65-76.compute-1.amazonaws.com",
    user: "xyiihuvayytyhr",
    password: "4cc27f1380333718ab92600d389eebb92ac061ac410cd5ac63bd88a7df989791",
    database: "d2emsvsn090cem",
    ssl: { rejectUnauthorized: false },
  },
});

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server!!");
  console.log(req.body);
  database("messages")
    .insert({
      chat_message: "test",
      from_user: "testuser",
      time: new Date(),
    })
    .then(console.log);
  console.log(`Received`);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
