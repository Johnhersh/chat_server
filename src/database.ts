import knex from "knex";

type dbMessage = { id: number; chat_message: string; from_user: string; time: string };

const database = knex({
  client: "pg",
  connection: {
    host: "ec2-52-72-65-76.compute-1.amazonaws.com",
    user: "xyiihuvayytyhr",
    password: "4cc27f1380333718ab92600d389eebb92ac061ac410cd5ac63bd88a7df989791",
    database: "d2emsvsn090cem",
    ssl: { rejectUnauthorized: false },
  },
});

export function addMessageToDB(message: string, fromUser: string) {
  database("messages").insert({
    chat_message: message,
    from_user: fromUser,
    time: new Date(),
  });
}

export async function getMessageLog() {
  const output: dbMessage[] = await database("messages").select("*").from("messages");
  return output;
}
