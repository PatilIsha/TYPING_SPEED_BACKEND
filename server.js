const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Store connected players
let players = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-game", (username) => {
    players[socket.id] = { username, progress: 0 };
    io.emit("update-players", players);
  });

  socket.on("update-progress", (progress) => {
    if (players[socket.id]) {
      players[socket.id].progress = progress;
      io.emit("update-players", players);
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("update-players", players);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
