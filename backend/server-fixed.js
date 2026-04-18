const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || '*';
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const connectDB = require('./db');

// Connect to MongoDB
connectDB();

// Wait for DB connection before starting server
mongoose.connection.on('connected', () => {
  console.log('🚀 Starting server after DB connection...');
});

// Routes
app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/test', require('./routes/test'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

