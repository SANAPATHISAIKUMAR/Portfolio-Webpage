import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, required: true, enum: ['fulltime', 'internship', 'freelance', 'contract'] },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  technologies: [{ type: String }],
  companyUrl: { type: String }
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);
