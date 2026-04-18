const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Resource = require('./models/Resource');

const newsData = [
  { 
    title: 'New Regulations for Schedule H1',
    content: 'Latest updates regarding the new regulations for schedule h1 impact on local pharmacies.',
    category: 'Regulatory'
  },
  { 
    title: 'Personalized Medicine Breakthrough',
    content: 'Latest updates regarding the personalized medicine breakthrough impact on local pharmacies.',
    category: 'Research'
  },
  { 
    title: 'Digital Prescription Adoption',
    content: 'Latest updates regarding the digital prescription adoption impact on local pharmacies.',
    category: 'Tech'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Resource.deleteMany({});
    console.log('🗑️ Cleared existing news');
    const seeded = await Resource.insertMany(newsData);
    console.log(`✅ Seeded ${seeded.length} news items!`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

