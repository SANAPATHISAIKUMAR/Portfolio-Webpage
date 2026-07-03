import { Router } from 'express';
import mongoose from 'mongoose';
import { SkillCategory } from '../models/SkillCategory';
import { Skill } from '../models/Skill';
import { skills as mockSkills, skillCategories as mockCategories } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ categories: mockCategories, skills: mockSkills });
    }
    const categories = await SkillCategory.find();
    const skills = await Skill.find();
    
    res.json({ categories, skills });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

export default router;
