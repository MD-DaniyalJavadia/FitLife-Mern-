import express from 'express';
import Nutrition from '../Models/Nutritions.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Create a record
router.post('/', verifyToken, async (req, res) => {
  try {
    const nutrition = new Nutrition({ ...req.body, userId: req.user.id });
    await nutrition.save();
    res.status(201).json({ message: 'Nutrition record added', nutrition });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating record' });
  }
});

// Get all records of logged user
router.get('/', verifyToken, async (req, res) => {
  try {
    const records = await Nutrition.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching records' });
  }
});

// Get single record
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const record = await Nutrition.findOne({ _id: req.params.id, userId: req.user.id });
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching record' });
  }
});

// Update record
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record updated', nutrition: updated });
  } catch (err) {
    res.status(500).json({ error: 'Error updating record' });
  }
});

// Delete record
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting record' });
  }
});

export default router;
