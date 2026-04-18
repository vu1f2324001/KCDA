const mongoose = require('mongoose');
const Meeting = require('./models/Meeting');
const dotenv = require('dotenv');
dotenv.config();

async function addSampleMeeting() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing sample
await Meeting.deleteOne({ title: 'Executive Board Summit' });
    
    // Add new meeting
const meeting = new Meeting({
      title: 'Executive Board Summit',
      description: 'Reviewing the 2026 Pharmaceutical Distribution Guidelines and Membership Welfare.',
      date: new Date('2026-03-24T10:30:00'),
      time: '10:30 AM',
      venue: 'Kalyan West Central Hall',

status: 'Scheduled'
    });

    const saved = await meeting.save();
    console.log('✅ Sample meeting added:', saved._id);
    
    // Verify
const verify = await Meeting.find().select('title date status');
    console.log('📋 All meetings:', verify.map(m => ({ title: m.title, date: m.date, status: m.date > new Date() ? 'Upcoming' : 'Past' })));
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

addSampleMeeting();
