const mongoose = require('mongoose');
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});