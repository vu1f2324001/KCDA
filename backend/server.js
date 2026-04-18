const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
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
// Configure CORS: allow explicit origin in production, and common local dev origins when not set
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || '';
const devAllowed = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5102'];
const allowedOrigins = [];
if (CLIENT_ORIGIN) allowedOrigins.push(CLIENT_ORIGIN);
if (process.env.NODE_ENV !== 'production') allowedOrigins.push(...devAllowed);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., curl, same-origin)
    if (!origin) {
      console.debug('[cors] no origin (server-side/same-origin request)');
      return callback(null, true);
    }
    console.debug('[cors] incoming origin:', origin, 'allowed:', allowedOrigins.includes(origin));
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
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

// Ensure concrete Access-Control-Allow-Origin header for credentialed requests
// This middleware mirrors allowed origin back instead of letting '*' through.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin) return next();
  // If origin is allowed, mirror it back and enable credentials
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.sendStatus(204);
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

// Serve built frontend (single-service deployment)
const clientBuildPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  console.log('[server] Serving static frontend from', clientBuildPath);
} else {
  console.log('[server] Frontend build not found at', clientBuildPath);
}

// Catch-all: serve index.html for non-API routes so client-side routing works
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexHtml = path.join(clientBuildPath, 'index.html');
  if (fs.existsSync(indexHtml)) return res.sendFile(indexHtml);
  return res.status(404).send('Frontend not built');
});

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

// Handle server listen errors (e.g., port in use)
server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} already in use. Set PORT env or stop the process using that port.`);
    // Do not crash silently — exit with non-zero so process manager can react
    process.exit(1);
  }
  console.error('Server error:', err);
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

