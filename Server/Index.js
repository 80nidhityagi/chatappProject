const express = require('express');
const user = require('./routes/user');
const chat = require('./routes/chat');
const message = require('./routes/message');
const cors = require('cors');
const connection = require('./Connection');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON request bodies

connection();

// Enable CORS
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL }));

// Routes
app.use(user);
app.use(chat);
app.use(message);

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', (messageData) => {
    console.log(messageData.content, 'content');
    const roomId = messageData.chat_id;
    io.to(roomId).emit('recevermesssge', messageData.content);
    console.log('Message broadcasted to room:', roomId);
  });

  socket.on('leave_chat', ({ chat_id }) => {
    const roomId = chat_id;
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, (error) => {
  if (error) console.log('Error:', error);
  else console.log(`Server is started on port ${PORT}`);
});
