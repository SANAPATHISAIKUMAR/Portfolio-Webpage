import type { Skill } from "../types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "⚛️", proficiency: 90, category: "frontend" },
  { name: "Next.js", icon: "▲", proficiency: 82, category: "frontend" },
  { name: "TypeScript", icon: "🔷", proficiency: 85, category: "frontend" },
  { name: "JavaScript", icon: "🟨", proficiency: 90, category: "frontend" },
  { name: "TailwindCSS", icon: "🎨", proficiency: 88, category: "frontend" },
  { name: "HTML/CSS", icon: "🌐", proficiency: 92, category: "frontend" },
  { name: "Reactstrap", icon: "🧱", proficiency: 78, category: "frontend" },
  { name: "Responsive Design", icon: "📱", proficiency: 90, category: "frontend" },

  // Backend & Languages
  { name: "Node.js", icon: "🟢", proficiency: 82, category: "backend" },
  { name: "Express.js", icon: "🚂", proficiency: 80, category: "backend" },
  { name: "REST APIs", icon: "🔗", proficiency: 85, category: "backend" },
  { name: "Python", icon: "🐍", proficiency: 82, category: "backend" },
  { name: "Java", icon: "☕", proficiency: 72, category: "backend" },
  { name: "C", icon: "🔧", proficiency: 70, category: "backend" },
  { name: "C++", icon: "➕", proficiency: 72, category: "backend" },

  // Database
  { name: "MongoDB", icon: "🍃", proficiency: 85, category: "database" },
  { name: "Mongoose", icon: "📦", proficiency: 80, category: "database" },
  { name: "Firestore", icon: "🔥", proficiency: 82, category: "database" },

  // Cloud & DevOps
  { name: "Firebase", icon: "🔥", proficiency: 82, category: "cloud" },
  { name: "Firebase Auth", icon: "🔐", proficiency: 80, category: "cloud" },
  { name: "Cloud Functions", icon: "☁️", proficiency: 75, category: "cloud" },
  { name: "Git/GitHub", icon: "🐙", proficiency: 88, category: "cloud" },
  { name: "Containerization", icon: "🐳", proficiency: 70, category: "cloud" },

  // AI / ML
  { name: "Generative AI", icon: "✨", proficiency: 85, category: "ai" },
  { name: "LLM Agents", icon: "🤖", proficiency: 82, category: "ai" },
  { name: "Agentic AI", icon: "🕹️", proficiency: 80, category: "ai" },
  { name: "NLP", icon: "🗣️", proficiency: 75, category: "ai" },
  { name: "Reinforcement Learning", icon: "🎮", proficiency: 72, category: "ai" },
  { name: "Adaptive ML", icon: "📈", proficiency: 72, category: "ai" },
  { name: "PyTorch", icon: "🔦", proficiency: 70, category: "ai" },

  // Design
  { name: "Figma", icon: "🎨", proficiency: 85, category: "design" },
  { name: "Adobe XD", icon: "🟪", proficiency: 80, category: "design" },
  { name: "UI/UX Design", icon: "✏️", proficiency: 82, category: "design" },
  { name: "Wireframing", icon: "📐", proficiency: 82, category: "design" },
  { name: "Prototyping", icon: "🖼️", proficiency: 80, category: "design" },
];

export const skillCategories = [
  { id: "frontend", label: "Frontend", icon: "🎨", color: "#3B82F6" },
  { id: "backend", label: "Backend & Languages", icon: "⚙️", color: "#7C3AED" },
  { id: "database", label: "Database", icon: "💾", color: "#06B6D4" },
  { id: "cloud", label: "Cloud & DevOps", icon: "☁️", color: "#F59E0B" },
  { id: "ai", label: "AI / ML", icon: "🤖", color: "#EC4899" },
  { id: "design", label: "UI/UX Design", icon: "✏️", color: "#10B981" },
] as const;
