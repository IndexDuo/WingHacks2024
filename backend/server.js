const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URI}.CelebrityPhotos`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// '/data' route to send all data in JSON format
app.get('/data', async (req, res) => {
  try {
    // Fetch all data from the 'KPopFaces' collection in the 'CelebrityPhotos' database
    const data = await mongoose.connection.db.collection('KPopFaces').find({}).toArray();

    if (data.length === 0) {
      res.status(404).json({ message: 'No data found in the KPopFaces collection' });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));