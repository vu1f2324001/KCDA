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

// Legacy support: internally rewrite legacy endpoints to /api/* for backwards compatibility
const legacyPrefixes = ['/events', '/members', '/news', '/zones', '/resources'];
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  for (const p of legacyPrefixes) {
    if (req.path === p || req.path.startsWith(p + '/')) {
      req.url = '/api' + req.url; // rewrite and continue to next handlers
      break;
    }
  }
  next();
});

// Health check
app.get('/health', (req, res) => {
  const db = require('./db');
  res.json({ status: 'ok', uptime: process.uptime(), dbConnected: !!db.isConnected() });
});

// Use centralized DB module
const db = require('./db');

// Protect critical API routes when DB is not connected to avoid crashes and return safe fallback
app.use('/api', (req, res, next) => {
  const critical = ['/members', '/events', '/news', '/resources', '/zones'];
  const path = req.path.toLowerCase();
  const needsDb = critical.some(p => path.startsWith(p));
  if (needsDb && !db.isConnected()) {
    // For GET requests return empty array, otherwise 503
    if (req.method === 'GET') return res.json([]);
    return res.status(503).json({ error: 'Database unavailable' });
  }
  next();
});

// Routes - standardize on /api/* only
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

// Initiate DB connection (non-blocking)
db.connectWithRetry(10, 5000).then(ok => {
  if (!ok) console.warn('[server] DB did not connect after retries; running with degraded mode');
}).catch(err => console.error('[server] DB connect error', err));

// Graceful error handling for process
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // do not exit in Render; allow process manager to restart if needed
});
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// DB connection is handled by backend/db.js (connectWithRetry)

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

