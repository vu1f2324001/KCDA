const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  venue: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['event', 'meeting'],
    default: 'event'
  },
  bannerImage: {
    type: String
  },
  imageUrls: [String],
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  attendanceConfirmed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

