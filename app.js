const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
    credentials: true,
  },
});

const http = require("http");
const express = require("express");
const app = express();

// Define a basic route for HTTP server
app.get("/", (req, res) => {
  res.send("HTTP Server is running!");
});

// Create HTTP server
const httpServer = http.createServer(app);

// Attach Socket.IO to HTTP server
io.attach(httpServer);

// Handle errors
io.on("error", (err) => console.log("Socket.IO error:", err));
httpServer.on("error", (err) => console.log("HTTP server error:", err));

// Start HTTP server
const port = 3000;
httpServer.listen(port, () => {
  console.log(`HTTP server is running on port ${port}`);
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Connected to client with id " + socket.id);

  socket.on("send_message", (message, room) => {
    if (room == "") {
      socket.broadcast.emit("receive_message", message);
    } else {
      socket.to(room).emit("receive_message", message);
    }
  });

  socket.on("join_room", (room, cb) => {
    cb("Joined room: " + room);
    socket.join(room);
    console.log("Joined room: " + room);
  });
});
