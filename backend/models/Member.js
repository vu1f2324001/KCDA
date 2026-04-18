const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Expired'],
    default: 'Pending'
  },
  photoUrl: {
    type: String
  },
  ward: {
    type: String
  },
  bio: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
