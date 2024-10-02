// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign up endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, age } = req.body; // Get all required fields
    if (!username || !password || !email || !age) {
      return res.status(400).json({ message: 'All fields are required' }); // Check for missing fields
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Ensure password is provided
    const newUser = new User({ username, password: hashedPassword, email, age });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
