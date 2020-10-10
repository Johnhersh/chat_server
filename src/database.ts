import knex from "knex";

type dbMessage = { id: number; chat_message: string; from_user: string; time: string };

/** Needed to have access to environment vars in this file */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const database = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "d2emsvsn090cem",
    ssl: { rejectUnauthorized: false },
  },
});

export async function addMessageToDB(message: string, fromUser: string) {
  console.log(`Adding message: ${message}`);
  await database("messages").insert({
    chat_message: message,
    from_user: fromUser,
    time: new Date(),
  });
}

export async function getMessageLog() {
  const output: dbMessage[] = await database("messages").select("*").from("messages");
  return output;
}
