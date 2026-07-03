import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true }
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema);
