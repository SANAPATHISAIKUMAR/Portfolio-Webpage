import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, default: 5 }
}, { timestamps: true });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
