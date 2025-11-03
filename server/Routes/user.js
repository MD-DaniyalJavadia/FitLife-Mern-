import express from 'express';
import User from '../Models/Users.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// get current logged-in user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-UserPassword');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
