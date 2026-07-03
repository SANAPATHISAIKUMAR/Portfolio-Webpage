import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: true },
  date: { type: String, required: true },
  achievement: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  position: { type: String },
  teamSize: { type: Number },
  projectName: { type: String }
}, { timestamps: true });

export const Hackathon = mongoose.model('Hackathon', hackathonSchema);
