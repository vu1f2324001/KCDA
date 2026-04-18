const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test routes
app.get('/debug', (req, res) => {
  res.json({ status: 'Express alive', time: new Date().toISOString() });
});

app.get('/members', (req, res) => {
  res.json([]);
});

app.post('/members', express.json(), (req, res) => {
  res.json({ message: 'Member added', data: req.body });
});

console.log('Server loaded - test routes active');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server on http://localhost:${PORT}`);
});

