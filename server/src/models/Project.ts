import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  problem: { type: String },
  solution: { type: String },
  techStack: [{ type: String }],
  features: [{ type: String }],
  image: { type: String, required: true },
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  category: { type: String, required: true, enum: ['fullstack', 'ai', 'frontend', 'backend', 'mobile'] },
  color: { type: String, required: true }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
