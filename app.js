
const PORT = process.env.PORT || 8080;
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: ["http://127.0.0.1:5500", "https://hamzayounis106.github.io"],
  credentials: true,
}));

// Define a basic route for HTTP server
app.get("/", (req, res) => {
  res.send("HTTP Server is running!");
});

// Attach Socket.IO to HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "https://hamzayounis106.github.io"],
    credentials: true,
  },
});

// Handle errors
io.on("error", (err) => console.log("Socket.IO error:", err));
httpServer.on("error", (err) => console.log("HTTP server error:", err));

// Start HTTP server
httpServer.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Connected to client with id " + socket.id);

  socket.on("send_message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive_message", message);
    } else {
      socket.to(room).emit("receive_message", message);
    }
  });

  socket.on("join_room", (room, cb) => {
    socket.join(room);
    cb("Joined room: " + room);
    console.log("Joined room: " + room);
  });
});
