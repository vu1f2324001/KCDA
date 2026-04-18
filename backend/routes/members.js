const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

// Add Member
router.post('/', async (req, res) => {
  try {
    // Ignore any incoming status to enforce dynamic status calculation
    const payload = { ...req.body };
    delete payload.status;
    const member = new Member(payload);
    const savedMember = await member.save();
    // return saved member with computed status
    const obj = savedMember.toObject();
    const today = new Date();
    today.setHours(0,0,0,0);
    obj.status = obj.expiryDate && new Date(obj.expiryDate) >= today ? 'Active' : 'Inactive';
    res.status(201).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    const today = new Date();
    today.setHours(0,0,0,0);
    const result = members.map(m => {
      const obj = m.toObject();
      obj.status = obj.expiryDate && new Date(obj.expiryDate) >= today ? 'Active' : 'Inactive';
      return obj;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active Members (for Home page)
router.get('/active', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const members = await Member.find({ expiryDate: { $gte: today } }).sort({ createdAt: -1 });
    const result = members.map(m => {
      const obj = m.toObject();
      obj.status = 'Active';
      return obj;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Members count
router.get('/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Member
router.put('/:id', async (req, res) => {
  try {
    // Prevent manual status updates; status is computed dynamically
    const payload = { ...req.body };
    delete payload.status;
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }
    const obj = updatedMember.toObject();
    const today = new Date();
    today.setHours(0,0,0,0);
    obj.status = obj.expiryDate && new Date(obj.expiryDate) >= today ? 'Active' : 'Inactive';
    res.json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Member
router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

