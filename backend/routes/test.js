const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ 
    message: 'Backend API alive!', 
    timestamp: new Date(),
    backend: 'KCDA Backend v1.0' 
  });
});

router.get('/members/test', (req, res) => {
  res.json({ 
    message: 'Members endpoint ready!',
    db: 'Connected' 
  });
});

module.exports = router;

