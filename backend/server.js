const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/data', (req, res) => {
  res.send('send all data');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
