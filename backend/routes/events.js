const express = require('express');
const Event = require('../models/Event');
const Meeting = require('../models/Meeting');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const { uploadImage } = require('../middleware/upload');

// ===== EVENTS ROUTES =====
// Add Event
router.post('/events', upload.array('images', 10), async (req, res) => {
  try {
    const imageUrls = [];
    if (req.files) {
      for (let file of req.files) {
        const url = await uploadImage(file.path);
        imageUrls.push(url);
      }
    }
    const event = new Event({
      ...req.body,
      bannerImage: imageUrls[0] || '',
      imageUrls: imageUrls,
      type: 'event'
    });
    const savedEvent = await event.save();
    const populatedEvent = await Event.findById(savedEvent._id).populate('attendees', 'name storeName');
    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ type: 'event' }).populate('attendees', 'name storeName').sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events count
router.get('/events/count', async (req, res) => {
  try {
    const count = await Event.countDocuments({ type: 'event' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Event
router.put('/events/:id', upload.array('images', 10), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const imageUrls = [];
    if (req.files) {
      for (let file of req.files) {
        const url = await uploadImage(file.path);
        imageUrls.push(url);
      }
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        bannerImage: imageUrls[0] || event.bannerImage,
        imageUrls: imageUrls.length ? imageUrls : event.imageUrls
      },
      { new: true }
    ).populate('attendees', 'name storeName');
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== MEETINGS ROUTES =====
// Add Meeting
router.post('/meetings', upload.array('images', 10), async (req, res) => {
  try {
    const imageUrls = [];
    if (req.files) {
      for (let file of req.files) {
        const url = await uploadImage(file.path);
        imageUrls.push(url);
      }
    }
    const meeting = new Meeting({
      ...req.body,
      imageUrls: imageUrls
    });
    const savedMeeting = await meeting.save();
    const populatedMeeting = await Meeting.findById(savedMeeting._id).populate('attendees', 'name storeName').populate('zone');
    res.status(201).json(populatedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Meetings
router.get('/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate('attendees', 'name storeName')
      .populate('zone')
      .sort({ date: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Meetings count
router.get('/meetings/count', async (req, res) => {
  try {
    const count = await Meeting.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Upcoming Meetings
router.get('/meetings/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const upcoming = await Meeting.find({ date: { $gt: now } })
      .populate('attendees', 'name storeName')
      .populate('zone')
      .sort({ date: 1 });
    res.json(upcoming);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Meeting
router.put('/meetings/:id', upload.array('images', 10), async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    const now = new Date();
    const meetingTime = new Date(meeting.date);
    if (meeting.status === 'Completed') {
      return res.status(400).json({ error: 'Cannot edit completed meetings' });
    }
    const imageUrls = [];
    if (req.files) {
      for (let file of req.files) {
        const url = await uploadImage(file.path);
        imageUrls.push(url);
      }
    }
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrls: imageUrls.length ? imageUrls : meeting.imageUrls
      },
      { new: true }
    ).populate('attendees', 'name storeName').populate('zone');
    res.json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Meeting
router.delete('/meetings/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    if (meeting.status === 'Completed') {
      return res.status(400).json({ error: 'Cannot delete completed meetings' });
    }
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
