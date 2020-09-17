import socketio from "socket.io";
import { addUser, removeUser, getUser } from "./users";

import { addMessageToDB } from "./database";

export function webSocket(io: socketio.Server) {
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
      addMessageToDB(message, senderName);
    });

    socket.on("disconnect", () => {
      console.log(`Lost user`);
      const removedUser = removeUser(socket.id);
      socket.broadcast.emit("user_left", removedUser);
    });
  });
}
