const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Zone = require('./models/Zone');

const zonesData = [
  { name: 'Zone A', wards: '15, 16', inCharge: 'Insert Name Here', primaryAreas: 'Pachra, Hanuman Nagar, Chinchpada Road' },
  { name: 'Zone B', wards: '1, 8', inCharge: 'Insert Name Here', primaryAreas: 'Syndicate, Murbad Road, Kalyan West' },
  { name: 'Zone C', wards: '2, 3', inCharge: 'Insert Name Here', primaryAreas: 'Shivaji Chowk to Patankar, Adharwadi' },
  { name: 'Zone D', wards: '4, 7', inCharge: 'Insert Name Here', primaryAreas: 'Agardanda, Birla College, Yogidham-Shahad' },
  { name: 'Zone F', wards: '17, 18', inCharge: 'Insert Name Here', primaryAreas: 'Chinchpada, Nandivli Village, Vijay Nagar' },
  { name: 'Zone G', wards: '19, 21', inCharge: 'Insert Name Here', primaryAreas: 'Lokgram, Chakki Naka, Patripul, Tata Power' },
  { name: 'Zone H', wards: '5, 6', inCharge: 'Insert Name Here', primaryAreas: 'Vadavli Station Road, Waldhuni, Godrej Hill' },
  { name: 'Zone J', wards: '13, 14', inCharge: 'Insert Name Here', primaryAreas: 'Kolsewadi, Durga Mandir, Tisgaon' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Zone.deleteMany({});
    console.log('🗑️ Cleared existing zones');
    const seeded = await Zone.insertMany(zonesData);
    console.log(`✅ Seeded ${seeded.length} zones!`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

