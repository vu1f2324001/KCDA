const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Simple health/debug endpoint
app.get('/debug', (req, res) => {
  res.json({ message: 'Express server alive', routes: true });
});

// Middleware
// Configure CORS to allow requests from the frontend origin set in env
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || '*';
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), dbConnected: mongoose.connection.readyState === 1 });
});

// Protect critical API routes when DB is not connected to avoid crashes and return safe fallback
app.use('/api', (req, res, next) => {
  const critical = ['/members', '/events', '/news'];
  const path = req.path.toLowerCase();
  const needsDb = critical.some(p => path.startsWith(p));
  if (needsDb && mongoose.connection.readyState !== 1) {
    // return safe fallback
    return res.status(503).json({ error: 'Service temporarily unavailable', data: [] });
  }
  next();
});

// Routes - Both /api/* and legacy paths
app.use('/members', require('./routes/members'));
app.use('/events', require('./routes/events'));
app.use('/resources', require('./routes/resources'));
app.use('/auth', require('./routes/auth'));
app.use('/test', require('./routes/test'));
app.use('/zones', require('./routes/zones'));
app.use('/news', require('./routes/news'));

app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/test', require('./routes/test'));
app.use('/api/zones', require('./routes/zones'));
app.use('/api/news', require('./routes/news'));

// Express error handler (last middleware)
app.use((err, req, res, next) => {
  console.error('[express] Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server (bind to Render's PORT or fallback)
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful error handling for process
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // do not exit in Render; allow process manager to restart if needed
});
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// MongoDB connection with retry logic
const DB_URI = process.env.MONGO_URI;
async function connectWithRetry(retries = 5, delay = 5000) {
  if (!DB_URI) {
    console.warn('[db] MONGO_URI not set; skipping DB connection');
    return;
  }
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('🎉 Mongoose connected to MongoDB');
      return;
    } catch (err) {
      console.error(`[db] Connection attempt ${i + 1} failed:`, err.message || err);
      if (i < retries - 1) {
        console.log(`[db] Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        console.error('[db] All retry attempts failed');
      }
    }
  }
}

// Initiate connection but don't crash on failure; server will respond with 503 for critical routes
connectWithRetry(10, 5000).catch(err => console.error('[db] connectWithRetry error', err));

// Handle graceful shutdown
function shutdown() {
  console.log('Shutting down server...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Mongo connection closed. Exiting.');
      process.exit(0);
    });
  });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

