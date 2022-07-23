require("dotenv").config();
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, console.log(PORT));

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("username", ({ name }) => {
    socket.broadcast.emit("user-joined", { name });
  });

  socket.on("message", ({ name, message }) => {
    socket.broadcast.emit("new-message", { name, message });
  });
});
