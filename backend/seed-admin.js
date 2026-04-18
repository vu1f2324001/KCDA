const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const Admin = require('./models/Admin');

async function run() {
  const email = process.env.ADMIN_SEED_EMAIL || 'vu1f2324001@pvppcoe.ac.in';
  const plainPassword = process.env.ADMIN_SEED_PASSWORD || `ChangeMe!${Math.floor(Math.random()*9000)+1000}`;

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin with email ${email} already exists. Skipping.`);
    mongoose.connection.close();
    return;
  }

  const hashed = await bcrypt.hash(plainPassword, 10);
  const admin = new Admin({ name: 'Seed Admin', email, password: hashed, role: 'admin' });
  await admin.save();
  console.log('Created admin:', email);
  console.log('Password:', plainPassword);
  console.log('Please change this password after first login.');

  mongoose.connection.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
