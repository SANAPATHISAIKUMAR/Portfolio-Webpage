import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    if (mongoose.connection.readyState === 1) {
      await newContact.save();
    } else {
      console.log('DEMO MODE: Received contact submission (Not saved to DB):', { name, email, subject, message });
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

export default router;
