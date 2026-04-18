const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const db = require('../db');

// Add Resource
const upload = require('../middleware/multerConfig');
const { uploadImage } = require('../middleware/upload');

router.post('/', auth, upload.single('thumbnail'), asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.status(503).json({ error: 'Database unavailable' });
  let fileUrl = '';
  if (req.file) {
    fileUrl = await uploadImage(req.file.path);
  }
  const resource = new Resource({
    ...req.body,
    fileUrl
  });
  const savedResource = await resource.save();
  res.status(201).json(savedResource);
}));

// Get all Resources
router.get('/', asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.json([]);
  const resources = await Resource.find().sort({ uploadedAt: -1 });
  res.json(resources);
}));

// Get Resources count
router.get('/count', asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.json({ count: 0 });
  const count = await Resource.countDocuments();
  res.json({ count });
}));

// Update Resource (text fields)
router.put('/:id', auth, asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.status(503).json({ error: 'Database unavailable' });
  const updatedResource = await Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedResource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json(updatedResource);
}));

// Update Resource image
router.put('/:id/image', auth, upload.single('thumbnail'), asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.status(503).json({ error: 'Database unavailable' });
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  let fileUrl = await uploadImage(req.file.path);
  const updatedResource = await Resource.findByIdAndUpdate(
    req.params.id,
    { fileUrl },
    { new: true }
  );
  if (!updatedResource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json({ fileUrl: updatedResource.fileUrl });
}));

// Delete Resource
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  if (!db.isConnected()) return res.status(503).json({ error: 'Database unavailable' });
  const deletedResource = await Resource.findByIdAndDelete(req.params.id);
  if (!deletedResource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json({ message: 'Resource deleted successfully' });
}));

module.exports = router;

