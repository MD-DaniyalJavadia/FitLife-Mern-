import express from 'express';
import Workout from '../Models/Workouts.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Create a workout
router.post('/', verifyToken, async (req, res) => {
  try {
    const workout = new Workout({ ...req.body, userId: req.user.id });
    await workout.save();
    res.status(201).json({ message: 'Workout created', workout });
  } catch (err) {
    console.error('Error creating workout:', err.message);
    res.status(500).json({ error: 'Error creating workout' });
  }
});

// Get all workouts for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    console.error('Error fetching workouts:', err.message);
    res.status(500).json({ error: 'Error fetching workouts' });
  }
});

// Get single workout
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error('Error fetching workout:', err.message);
    res.status(500).json({ error: 'Error fetching workout' });
  }
});

// Update workout
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: 'Workout updated', workout: updated });
  } catch (err) {
    console.error('Error updating workout:', err.message);
    res.status(500).json({ error: 'Error updating workout' });
  }
});

// Delete workout
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    console.error('Error deleting workout:', err.message);
    res.status(500).json({ error: 'Error deleting workout' });
  }
});

export default router;
