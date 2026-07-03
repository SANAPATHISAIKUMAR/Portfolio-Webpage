import { Router } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project';
import { projects as mockProjects } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockProjects);
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
