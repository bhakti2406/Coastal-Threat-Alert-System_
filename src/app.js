src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { simulateRealTimeUpdates } = require('./services/mlService');

const app = express();
const server = http.createServer(app);

// Use CORS middleware to allow requests from your frontend
app.use(cors());
app.use(express.json());

// Set up Socket.IO for real-time communication
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST']
  }
});

// Pass the Socket.IO instance to the real-time update simulation
simulateRealTimeUpdates(io);

// API routes
app.use('/api', apiRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
