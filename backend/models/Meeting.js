const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
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
  agenda: {
    type: String
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone'
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  status: {
    type: String,
    enum: ['Scheduled', 'Confirmed', 'Completed'],
    default: 'Scheduled'
  },
  imageUrls: [String]
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);

