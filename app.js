const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8000;

/* ---------- Passport Config ---------- */
require('./config/passport')(passport);

/* ---------- Load Routes ---------- */
const auth = require('./routes/auth');

/* ---------- Homepage Route ---------- */
app.get('/', (req, res) => {
  res.send('working');
});

/* ---------- Use Auth Route ---------- */
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});