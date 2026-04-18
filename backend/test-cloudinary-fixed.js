const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing Cloudinary connection...');
console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Missing');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.api.ping()
  .then(result => {
    console.log('✅ Cloudinary connected successfully!');
    console.log('Response:', result);
  })
  .catch(error => {
    console.error('❌ Cloudinary connection failed:', error.message);
  });

