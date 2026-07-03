import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['competitive', 'opensource', 'leadership', 'freelance', 'academic'] },
  icon: { type: String, required: true }
}, { timestamps: true });

export const Achievement = mongoose.model('Achievement', achievementSchema);
