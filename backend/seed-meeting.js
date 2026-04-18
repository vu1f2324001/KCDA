const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Event = require('./models/Event');

const meetingData = [{
  title: 'Executive Board Summit',
  description: 'Reviewing the 2026 Pharmaceutical Distribution Guidelines and Membership Welfare.',
  date: new Date('2026-03-24'),
  time: '10:30 AM',
  venue: 'Kalyan West Central Hall',
  type: 'meeting'
}];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Event.deleteMany({ type: 'meeting' });
    console.log('🗑️ Cleared existing meetings');
    const seeded = await Event.insertMany(meetingData);
    console.log(`✅ Seeded ${seeded.length} meeting!`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

