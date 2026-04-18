const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let OAuth2Client;
let googleClient = null;
let USING_GOOGLE_LIB = false;
try {
  ({ OAuth2Client } = require('google-auth-library'));
  googleClient = new OAuth2Client();
  USING_GOOGLE_LIB = true;
  console.log('[auth] google-auth-library loaded');
} catch (e) {
  console.warn('[auth] google-auth-library not installed, falling back to tokeninfo HTTP verification');
}

const Admin = require('../models/Admin');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

// Accept multiple client IDs (comma-separated) in env
const rawClients = process.env.GOOGLE_CLIENT_ID || '';
const CLIENT_AUDIENCES = rawClients.split(',').map(s => s.trim()).filter(Boolean);
console.log('[auth] configured GOOGLE_CLIENT_ID(s):', CLIENT_AUDIENCES || process.env.GOOGLE_CLIENT_ID);


// Register Admin (basic)
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = new Admin({
    name,
    email,
    password: hashedPassword
  });
  const savedAdmin = await admin.save();
  res.status(201).json({ message: 'Admin registered', admin: { id: savedAdmin._id, name, email } });
}));

// Login (basic - compare password)
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ error: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ 
    message: 'Login successful', 
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } 
  });
}));

// POST /google - verify Google ID token, allow admin emails, return JWT
router.post('/google', asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: 'Missing credential' });

  // Debug: log configured client ids and env var
  console.log('Backend GOOGLE_CLIENT_ID(s):', CLIENT_AUDIENCES);
  console.log('Backend process.env.GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

  let payload = null;
  if (USING_GOOGLE_LIB && googleClient && typeof googleClient.verifyIdToken === 'function') {
    // Use google-auth-library when available (accepts array of audiences)
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: CLIENT_AUDIENCES.length ? CLIENT_AUDIENCES : process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload() || {};
    console.log('[auth] verified with google-auth-library, aud=', payload.aud);
  } else {
    // Fallback: verify via Google's tokeninfo endpoint
    const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    if (!resp.ok) {
      return res.status(401).json({ error: 'Invalid Google credential' });
    }
    payload = await resp.json();
    console.log('[auth] verified via tokeninfo, aud=', payload.aud);
    // validate audience against allowed list
    if (CLIENT_AUDIENCES.length && !CLIENT_AUDIENCES.includes(payload.aud)) {
      return res.status(401).json({ error: 'Invalid token audience' });
    }
  }
  const email = (payload.email || '').toLowerCase();

  // Admin allow list from env (comma-separated) or DB
  const envList = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  const isInEnv = envList.includes(email);
  const adminInDb = await Admin.findOne({ email });

  // Debugging: log why access is allowed/denied
  console.log('[auth] token email:', email);
  console.log('[auth] ADMIN_EMAILS env list:', envList);
  console.log('[auth] isInEnv:', isInEnv);
  console.log('[auth] adminInDb:', !!adminInDb, adminInDb ? adminInDb.email : null);

  if (!isInEnv && !adminInDb) {
    console.warn('[auth] access denied for', email);
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Sign JWT
  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Set httpOnly cookie (recommended) and also return token in JSON for optional client storage
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie('token', token, cookieOptions);

  return res.json({ token });
}));

// POST /logout - clear auth cookie
router.post('/logout', (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    };
    res.clearCookie('token', cookieOptions);
    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error', err);
    return res.status(500).json({ error: 'Logout failed' });
  }
});

module.exports = router;

