const express = require('express'),
router = express.Router();

/* ---------- Homepage Route ---------- */
router.get('/', (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', (req, res) => {
  res.send('dashboard');
});

module.exports = router;