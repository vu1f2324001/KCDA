const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  wards: {
    type: String,
    required: true
  },
  inCharge: {
    type: String,
    required: true
  },
  primaryAreas: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Zone', zoneSchema);

