const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

let users = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Add user to online list
  users[socket.id] = "Anonymous";
  io.emit("userList", users);

  // Handle new message
  socket.on("message", (data) => {
    io.emit("message", { id: socket.id, text: data });
  });

  // Handle username update
  socket.on("setUsername", (username) => {
    users[socket.id] = username;
    io.emit("userList", users);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete users[socket.id];
    io.emit("userList", users);
  });
});

server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
