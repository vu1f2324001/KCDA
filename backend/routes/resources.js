const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();
const auth = require('../middleware/auth');

// Add Resource
const upload = require('../middleware/multerConfig');
const { uploadImage } = require('../middleware/upload');

router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Resources count
router.get('/count', async (req, res) => {
  try {
    const count = await Resource.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Resource (text fields)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Resource image
router.put('/:id/image', auth, upload.single('thumbnail'), async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Resource
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

