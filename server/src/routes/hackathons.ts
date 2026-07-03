import { Router } from 'express';
import mongoose from 'mongoose';
import { Hackathon } from '../models/Hackathon';
import { hackathons as mockHackathons } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockHackathons);
    }
    const hackathons = await Hackathon.find().sort({ date: -1 });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hackathons' });
  }
});

export default router;
