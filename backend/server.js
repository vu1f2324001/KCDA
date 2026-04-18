const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/debug', (req, res) => {
  res.json({ message: 'Express server alive', routes: true });
});

// Middleware
// Configure CORS to allow requests from the frontend origin set in env
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || '*';
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

const connectDB = require('./db');

// Connect to MongoDB
connectDB();

// Wait for DB connection before starting server
mongoose.connection.on('connected', () => {
  console.log('🚀 Starting server after DB connection...');
});

// Routes - Both /api/* and /* for compatibility
app.use('/members', require('./routes/members'));
app.use('/events', require('./routes/events'));
app.use('/resources', require('./routes/resources'));
app.use('/auth', require('./routes/auth'));
app.use('/test', require('./routes/test'));
app.use('/zones', require('./routes/zones'));

app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/test', require('./routes/test'));
app.use('/api/zones', require('./routes/zones'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

