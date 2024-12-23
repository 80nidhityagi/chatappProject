const express = require('express');
const user = require('./routes/user');
const chat = require('./routes/chat');
const message = require('./routes/message');
const cors = require('cors');
const connection = require('./Connection');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON request bodies

connection();

// Enable CORS for both REST API and Socket.IO
app.use(cors({ origin: 'http://localhost:5173' }));

// Use routes with base paths
app.use(user);
app.use(chat);
app.use(message);
require('dotenv').config();


// Create HTTP server and initialize Socket.IO with CORS
const server = http.createServer(app);

// const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your React app's URL
    methods: ['GET', 'POST'],       // Allowed HTTP methods
    credentials: true,              // Include credentials if needed
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', (roomId) => {
    // const roomId = [senderId, receiverId].sort().join('_');
    socket.join(roomId,'roomid');
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', (messageData) => {
    console.log(messageData.content,'content');    
    const roomId = [ messageData.chat_id].sort().join('_');
    io.to(roomId).emit('recevermesssge', messageData.content); // Emit message to room
    // socket.emit('receiveMessage', messageData.content);

    console.log('Message broadcasted to room:', roomId);
  });

  socket.on('leave_chat', ({ senderId, chat_id }) => {
    const roomId = [ chat_id].sort().join('_');
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



// Start server
server.listen(3000, (error) => {
  if (error) console.log('Error:', error);
  else console.log('Server is started on port 3000');
});
