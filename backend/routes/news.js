const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const db = require('../db');
const auth = require('../middleware/auth');

// Public: Get all news resources (category contains 'News')
router.get('/', asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.json([]);
  const news = await Resource.find({ category: /News/i }).sort({ uploadedAt: -1 });
  res.json(news);
}));

router.get('/count', asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.json({ count: 0 });
  const count = await Resource.countDocuments({ category: /News/i });
  res.json({ count });
}));

// Admin create news (uses Resource model)
router.post('/', auth, asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.status(503).json({ error: 'Database unavailable' });
  const resource = new Resource({ ...req.body });
  const saved = await resource.save();
  res.status(201).json(saved);
}));

module.exports = router;
