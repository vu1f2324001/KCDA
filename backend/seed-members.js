const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Member = require('./models/Member');

const membersData = [
  {
    name: 'Dr. Rajesh Patel',
    storeName: 'Patel Medicals',
    location: 'Zone A - Ward 15, Pachra',
    ward: 'Ward 15',
    bio: "Proud KCDA member contributing to Kalyan's healthcare ecosystem.",
    phone: '98765 43210',
    email: 'rajesh.patel@medical.com',
    expiryDate: '2026-03-01',
    status: 'Active',
    photoUrl: ''
  },
  {
    name: 'Smt. Priya Sharma',
    storeName: 'Sharma Pharmacy',
    location: 'Zone B - Ward 1, Syndicate',
    ward: 'Ward 1',
    bio: "Proud KCDA member contributing to Kalyan's healthcare ecosystem.",
    phone: '98765 43211',
    email: 'priya.sharma@pharma.com',
    expiryDate: '2025-12-15',
    status: 'Active',
    photoUrl: ''
  },
  {
    name: 'Shri. Amit Desai',
    storeName: 'Desai Chemist',
    location: 'Zone C - Ward 2, Shivaji Chowk',
    ward: 'Ward 2',
    bio: "Proud KCDA member contributing to Kalyan's healthcare ecosystem.",
    phone: '98765 43212',
    email: 'amit.desai@chemist.com',
    expiryDate: '2026-06-30',
    status: 'Active',
    photoUrl: ''
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Member.deleteMany({});
    console.log('🗑️ Cleared existing members');
    const seeded = await Member.insertMany(membersData);
    console.log(`✅ Seeded ${seeded.length} members!`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
