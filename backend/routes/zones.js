const express = require('express');
const Zone = require('../models/Zone');
const router = express.Router();

// Get all zones
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find().sort({ createdAt: -1 });
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Zones count
router.get('/count', async (req, res) => {
  try {
    const count = await Zone.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single zone by ID
router.get('/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add zone
router.post('/', async (req, res) => {
  try {
    const zone = new Zone(req.body);
    const savedZone = await zone.save();
    res.status(201).json(savedZone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update zone
router.put('/:id', async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete zone
router.delete('/:id', async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json({ message: 'Zone deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

