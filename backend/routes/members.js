const express = require('express');
const Member = require('../models/Member');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');

// Add Member
router.post('/', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
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
}));

// Get all Members
router.get('/', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  const members = await Member.find().sort({ createdAt: -1 });
  const today = new Date();
  today.setHours(0,0,0,0);
  const result = members.map(m => {
    const obj = m.toObject();
    obj.status = obj.expiryDate && new Date(obj.expiryDate) >= today ? 'Active' : 'Inactive';
    return obj;
  });
  res.json(result);
}));

// Get active Members (for Home page)
router.get('/active', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  const today = new Date();
  today.setHours(0,0,0,0);
  console.log('[members] /active query - today:', today.toISOString());
  const members = await Member.find({ expiryDate: { $gte: today } }).sort({ createdAt: -1 });
  console.log('[members] found count:', members.length);
  const result = members.map(m => {
    const obj = m.toObject();
    obj.status = 'Active';
    return obj;
  });
  res.json(result);
}));

// Get Members count
router.get('/count', asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json({ count: 0 });
  const count = await Member.countDocuments();
  res.json({ count });
}));

// Update Member
router.put('/:id', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
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
}));

// Delete Member
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'Service unavailable' });
  const deletedMember = await Member.findByIdAndDelete(req.params.id);
  if (!deletedMember) {
    return res.status(404).json({ error: 'Member not found' });
  }
  res.json({ message: 'Member deleted successfully' });
}));

module.exports = router;

