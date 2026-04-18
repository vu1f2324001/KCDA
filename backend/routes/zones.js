const express = require('express');
const Zone = require('../models/Zone');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');

// Get all zones
router.get('/', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  const zones = await Zone.find().sort({ createdAt: -1 });
  res.json(zones);
}));

// Get Zones count
router.get('/count', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json({ count: 0 });
  const count = await Zone.countDocuments();
  res.json({ count });
}));

// Get single zone by ID
router.get('/:id', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
  const zone = await Zone.findById(req.params.id);
  if (!zone) {
    return res.status(404).json({ error: 'Zone not found' });
  }
  res.json(zone);
}));

// Add zone
router.post('/', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
  const zone = new Zone(req.body);
  const savedZone = await zone.save();
  res.status(201).json(savedZone);
}));

// Update zone
router.put('/:id', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
  const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!zone) {
    return res.status(404).json({ error: 'Zone not found' });
  }
  res.json(zone);
}));

// Delete zone
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
  const zone = await Zone.findByIdAndDelete(req.params.id);
  if (!zone) {
    return res.status(404).json({ error: 'Zone not found' });
  }
  res.json({ message: 'Zone deleted' });
}));

module.exports = router;

