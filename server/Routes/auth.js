import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/Users.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { UserName, UserEmail, UserPassword } = req.body;

    if (!UserName || !UserEmail || !UserPassword)
      return res.status(400).json({ error: 'All fields are required' });

    const existingUser = await User.findOne({ UserEmail });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(UserPassword, 12);
    const newUser = new User({
      UserName,
      UserEmail: UserEmail.toLowerCase(),
      UserPassword: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;

    if (!UserEmail || !UserPassword)
      return res.status(400).json({ error: 'All fields are required' });

    const user = await User.findOne({ UserEmail: UserEmail.toLowerCase() });
    if (!user)
      return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.UserEmail },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send JWT in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.UserName,
        email: user.UserEmail
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
