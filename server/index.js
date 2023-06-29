const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const port = 3001;

const io = new Server(httpServer, { cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}});

io.on("connection", socket => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("join_room",(data) => { 
       socket.join(data);
       console.log(`User with ID = ${socket.id} joined room ${data}`);
  })
  socket.on("send_message", (data) => {
    console.log(data);
    io.to(data.room).emit("receive_message", data)
  })
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
})

server.listen(port, "localhost", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

