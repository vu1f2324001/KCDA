const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// Register Admin (basic)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    });
    
    const savedAdmin = await admin.save();
    res.status(201).json({ message: 'Admin registered', admin: { id: savedAdmin._id, name, email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login (basic - compare password)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful', 
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

