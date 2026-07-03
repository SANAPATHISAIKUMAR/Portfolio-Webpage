import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
}, { timestamps: true });

export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
