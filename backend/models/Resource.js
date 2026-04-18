const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  fileUrl: {
    type: String
  },
  category: {
    type: String,
    enum: ['Legal', 'General', 'Medical News', 'Regulatory', 'Research', 'Tech']
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);

