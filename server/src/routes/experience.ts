import { Router } from 'express';
import mongoose from 'mongoose';
import { Experience } from '../models/Experience';
import { experiences as mockExperience } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockExperience);
    }
    // Sort by createdAt or maybe implement a more complex sort if needed, but for now simple fetch
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

export default router;
