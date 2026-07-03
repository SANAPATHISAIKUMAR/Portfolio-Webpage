import { Router } from 'express';
import mongoose from 'mongoose';
import { Achievement } from '../models/Achievement';
import { achievements as mockAchievements } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockAchievements);
    }
    const achievements = await Achievement.find().sort({ createdAt: 1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

export default router;
