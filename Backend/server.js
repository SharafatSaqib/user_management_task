// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require ('./routes/authRoutes')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection event listeners
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});
db.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

app.use('/api/users', userRoutes);
app.use('/api', authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
