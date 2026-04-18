const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let dbConnected = false;

mongoose.connection.on('connected', () => {
  dbConnected = true;
  console.log('🎉 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  dbConnected = false;
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  dbConnected = false;
  console.log('⚠️ Mongoose disconnected');
});

async function connectWithRetry(retries = 10, delay = 5000) {
  const DB_URI = process.env.MONGO_URI;
  if (!DB_URI) {
    console.warn('[db] MONGO_URI not set; skipping DB connection');
    return false;
  }
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      dbConnected = true;
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (err) {
      dbConnected = false;
      console.error(`[db] Connection attempt ${i + 1} failed:`, err.message || err);
      if (i < retries - 1) {
        console.log(`[db] Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  console.error('[db] All retry attempts failed');
  return false;
}

function isConnected() {
  return dbConnected === true && mongoose.connection.readyState === 1;
}

module.exports = { connectWithRetry, isConnected };

