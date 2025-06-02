const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Save user
    user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Create JWT
    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};