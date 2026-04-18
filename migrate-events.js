const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function migrateEvents() {
  try {
    // Current DB (kcda_portal)
    const oldConn = await mongoose.createConnection(process.env.MONGO_URI);
    await oldConn.asSchema(Event).find();
    const EventOld = oldConn.model('Event', require('./backend/models/Event'));
    
    // New DB (kcda_events_db - UPDATE URI)
    const newURI = process.env.MONGO_URI.replace('kcda_portal', 'kcda_events_db');
    const newConn = await mongoose.createConnection(newURI);
    const EventNew = newConn.model('Event', require('./backend/models/Event'));
    
    // Migrate
    const events = await EventOld.find();
    await EventNew.insertMany(events);
    
    // Verify
    const oldCount = await EventOld.countDocuments();
    const newCount = await EventNew.countDocuments();
    console.log(`Migrated ${oldCount} events. New DB has ${newCount}.`);
    
    // Optional: Clear old
    // await EventOld.deleteMany({});
    
    await oldConn.close();
    await newConn.close();
    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateEvents();

