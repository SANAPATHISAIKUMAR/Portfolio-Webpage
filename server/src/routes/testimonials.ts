import { Router } from 'express';
import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial';
import { testimonials as mockTestimonials } from '../scripts/seed';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockTestimonials);
    }
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

export default router;
