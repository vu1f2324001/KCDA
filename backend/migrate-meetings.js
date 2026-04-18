const mongoose = require('mongoose');
const Event = require('./models/Event');
const Meeting = require('./models/Meeting');
const dotenv = require('dotenv');
dotenv.config();

async function migrateMeetings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find all events with type 'meeting'
    const oldMeetings = await Event.find({ type: 'meeting' });
    console.log(`Found ${oldMeetings.length} meetings to migrate`);

    for (let oldMeeting of oldMeetings) {
      // Create new meeting
      const newMeeting = new Meeting({
        title: oldMeeting.title,
        description: oldMeeting.description,
        date: oldMeeting.date,
        time: oldMeeting.time,
        venue: oldMeeting.venue,
        attendees: oldMeeting.attendees,
        imageUrls: oldMeeting.imageUrls || [],
        status: oldMeeting.attendanceConfirmed ? 'Confirmed' : 'Scheduled'
      });

      await newMeeting.save();
      console.log(`Migrated meeting: ${oldMeeting.title}`);
    }

    // Delete old meetings from Event collection
    await Event.deleteMany({ type: 'meeting' });
    console.log('✅ Migration complete! Old meetings deleted from Event collection.');

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

migrateMeetings();
