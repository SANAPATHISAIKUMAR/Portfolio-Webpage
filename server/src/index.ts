import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

import contactRoutes from './routes/contact';
import projectsRoutes from './routes/projects';
import skillsRoutes from './routes/skills';
import experienceRoutes from './routes/experience';
import achievementsRoutes from './routes/achievements';
import testimonialsRoutes from './routes/testimonials';
import hackathonsRoutes from './routes/hackathons';
import { seedDatabase } from './scripts/seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/hackathons', hackathonsRoutes);

// Database connection
const connectDB = async () => {
  try {
    let uri = MONGODB_URI;
    console.log(`Attempting to connect to MongoDB at ${uri}...`);
    // Use a very short timeout so we fallback to in-memory DB quickly if local MongoDB isn't running
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.warn('⚠️ Could not connect to MongoDB. Launching in-memory MongoDB database...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`Connected to in-memory MongoDB at ${mongoUri}`);
      
      // Auto seed the in-memory database
      await seedDatabase();
    } catch (memError) {
      console.error('Failed to start in-memory MongoDB server:', memError);
    }
  } finally {
    // Start server regardless
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};

connectDB();
