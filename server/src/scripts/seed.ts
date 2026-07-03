import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Project } from '../models/Project';
import { SkillCategory } from '../models/SkillCategory';
import { Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Achievement } from '../models/Achievement';
import { Testimonial } from '../models/Testimonial';
import { Hackathon } from '../models/Hackathon';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Rich Mock Data (Synchronized with client/src/data)
export const projects = [
  {
    title: "Smart Mentor",
    slug: "smart-mentor",
    tagline: "AI-Powered Mentorship Platform",
    description: "An intelligent mentorship platform that leverages AI to match mentees with the right mentors, provide personalized learning paths, and facilitate seamless knowledge transfer through smart scheduling and progress tracking.",
    problem: "Finding the right mentor is challenging. Students and early-career professionals struggle to connect with experienced mentors who align with their goals, learning style, and availability.",
    solution: "Built an AI-driven platform that analyzes user profiles, skills, and goals to create optimal mentor-mentee matches. Features include real-time chat, video sessions, progress dashboards, and AI-generated learning recommendations.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "OpenAI API", "Socket.io", "TailwindCSS", "JWT"],
    features: [
      "AI-powered mentor matching algorithm",
      "Real-time messaging and video calls",
      "Personalized learning path generation",
      "Progress tracking dashboard",
      "Session scheduling and calendar integration",
      "Review and rating system"
    ],
    image: "/images/projects/smart-mentor.png",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/smart-mentor",
    liveUrl: "https://smart-mentor.vercel.app",
    featured: true,
    category: "ai",
    color: "#3B82F6"
  },
  {
    title: "Homedi",
    slug: "homedi",
    tagline: "Healthcare at Home Platform",
    description: "A comprehensive healthcare platform connecting patients with medical professionals for home-based consultations, medicine delivery, and health monitoring — making quality healthcare accessible to everyone.",
    problem: "Access to quality healthcare remains a challenge, especially for elderly and mobility-impaired patients. Traditional clinic visits are time-consuming and often unnecessary for routine check-ups.",
    solution: "Developed a full-stack platform enabling patients to book home visits, consult doctors via video, order medicines, and track health vitals — all from a single, intuitive interface.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS", "Stripe", "MapBox", "WebRTC"],
    features: [
      "Doctor consultation booking",
      "Video call consultations",
      "Medicine ordering and delivery tracking",
      "Health vitals monitoring dashboard",
      "Prescription management",
      "Payment integration"
    ],
    image: "/images/projects/homedi.png",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/homedi",
    liveUrl: "https://homedi.vercel.app",
    featured: true,
    category: "fullstack",
    color: "#7C3AED"
  },
  {
    title: "OpenEnv",
    slug: "openenv",
    tagline: "Environment Variable Manager",
    description: "A developer tool for securely managing, sharing, and syncing environment variables across teams and projects. No more .env file chaos — OpenEnv provides a centralized, encrypted solution.",
    problem: "Teams waste hours managing environment variables across multiple projects and environments. Sharing secrets via Slack or email is insecure, and .env files frequently go out of sync.",
    solution: "Created a secure vault for environment variables with team collaboration, role-based access, project organization, and CLI integration for seamless developer workflow.",
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "TailwindCSS", "AES Encryption", "CLI"],
    features: [
      "Encrypted variable storage",
      "Team collaboration with RBAC",
      "Project and environment organization",
      "CLI tool for syncing variables",
      "Audit logs and version history",
      "Import/Export .env files"
    ],
    image: "/images/projects/openenv.png",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/openenv",
    liveUrl: "https://openenv.dev",
    featured: true,
    category: "fullstack",
    color: "#06B6D4"
  },
  {
    title: "ContentOps AI",
    slug: "contentops-ai",
    tagline: "AI Content Workflow Platform",
    description: "An AI-powered content operations platform that automates content creation, editing, scheduling, and analytics — helping teams produce high-quality content at scale with intelligent workflow automation.",
    problem: "Content teams juggle multiple tools for writing, editing, scheduling, and analytics. Manual content workflows are slow, error-prone, and don't scale.",
    solution: "Built a unified content platform with AI-assisted writing, automated editorial workflows, multi-channel publishing, and performance analytics — all powered by LLMs and custom AI models.",
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "OpenAI API", "LangChain", "TypeScript", "TailwindCSS"],
    features: [
      "AI content generation with custom prompts",
      "Editorial workflow automation",
      "Multi-channel publishing (Blog, Social, Email)",
      "Content performance analytics",
      "SEO optimization suggestions",
      "Team collaboration and approval flows"
    ],
    image: "/images/projects/contentops-ai.png",
    githubUrl: "https://github.com/SANAPATHISAIKUMAR/contentops-ai",
    liveUrl: "https://contentops-ai.vercel.app",
    featured: true,
    category: "ai",
    color: "#F59E0B"
  }
];

export const skillCategories = [
  { id: "frontend", label: "Frontend", icon: "🎨", color: "#3B82F6" },
  { id: "backend", label: "Backend", icon: "⚙️", color: "#7C3AED" },
  { id: "database", label: "Database", icon: "💾", color: "#06B6D4" },
  { id: "cloud", label: "Cloud & DevOps", icon: "☁️", color: "#F59E0B" },
  { id: "ai", label: "AI / ML", icon: "🤖", color: "#EC4899" },
  { id: "design", label: "UI/UX Design", icon: "✏️", color: "#10B981" }
];

export const skills = [
  // Frontend
  { name: "React", icon: "⚛️", proficiency: 95, category: "frontend" },
  { name: "Next.js", icon: "▲", proficiency: 85, category: "frontend" },
  { name: "TypeScript", icon: "🔷", proficiency: 90, category: "frontend" },
  { name: "JavaScript", icon: "🟨", proficiency: 95, category: "frontend" },
  { name: "TailwindCSS", icon: "🎨", proficiency: 92, category: "frontend" },
  { name: "HTML/CSS", icon: "🌐", proficiency: 95, category: "frontend" },
  { name: "Framer Motion", icon: "🎬", proficiency: 85, category: "frontend" },
  { name: "Three.js", icon: "🔮", proficiency: 70, category: "frontend" },

  // Backend
  { name: "Node.js", icon: "🟢", proficiency: 92, category: "backend" },
  { name: "Express.js", icon: "⚡", proficiency: 90, category: "backend" },
  { name: "REST APIs", icon: "🔗", proficiency: 92, category: "backend" },
  { name: "GraphQL", icon: "◆", proficiency: 72, category: "backend" },
  { name: "Python", icon: "🐍", proficiency: 80, category: "backend" },
  { name: "JWT Auth", icon: "🔐", proficiency: 88, category: "backend" },
  { name: "WebSocket", icon: "🔌", proficiency: 78, category: "backend" },

  // Database
  { name: "MongoDB", icon: "🍃", proficiency: 90, category: "database" },
  { name: "Mongoose", icon: "📦", proficiency: 88, category: "database" },
  { name: "PostgreSQL", icon: "🐘", proficiency: 72, category: "database" },
  { name: "Redis", icon: "🔴", proficiency: 70, category: "database" },
  { name: "Firebase", icon: "🔥", proficiency: 75, category: "database" },

  // Cloud & DevOps
  { name: "AWS", icon: "☁️", proficiency: 70, category: "cloud" },
  { name: "Vercel", icon: "▲", proficiency: 90, category: "cloud" },
  { name: "Docker", icon: "🐳", proficiency: 72, category: "cloud" },
  { name: "Git/GitHub", icon: "🐙", proficiency: 92, category: "cloud" },
  { name: "CI/CD", icon: "🔄", proficiency: 78, category: "cloud" },
  { name: "Railway", icon: "🚂", proficiency: 80, category: "cloud" },

  // AI / ML
  { name: "OpenAI API", icon: "🤖", proficiency: 85, category: "ai" },
  { name: "LangChain", icon: "🔗", proficiency: 78, category: "ai" },
  { name: "Generative AI", icon: "✨", proficiency: 82, category: "ai" },
  { name: "LLM Integration", icon: "🧠", proficiency: 80, category: "ai" },
  { name: "Prompt Engineering", icon: "📝", proficiency: 85, category: "ai" },
  { name: "PyTorch", icon: "🔦", proficiency: 65, category: "ai" },

  // Design
  { name: "Figma", icon: "🎨", proficiency: 85, category: "design" },
  { name: "UI/UX Design", icon: "✏️", proficiency: 82, category: "design" },
  { name: "Responsive Design", icon: "📱", proficiency: 92, category: "design" },
  { name: "Design Systems", icon: "🧩", proficiency: 80, category: "design" },
  { name: "Prototyping", icon: "🖼️", proficiency: 78, category: "design" }
];

export const experiences = [
  {
    company: "Lystra Pharma",
    role: "Associate Software Engineer",
    type: "fulltime",
    location: "India",
    startDate: "2024-01",
    description: "Leading MERN stack development for a healthcare technology platform. Building scalable backend APIs, implementing complex healthcare workflows, and creating intuitive user interfaces for medical professionals and patients.",
    achievements: [
      "Architected and developed RESTful APIs serving 10,000+ daily requests",
      "Built healthcare workflow automation reducing manual processes by 40%",
      "Implemented secure patient data management with HIPAA-compliant practices",
      "Developed responsive React dashboards for real-time analytics",
      "Collaborated with cross-functional teams to ship features bi-weekly",
      "Optimized database queries resulting in 60% faster page load times"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "TailwindCSS", "REST APIs", "JWT", "Redis", "AWS"],
    companyUrl: "https://lystrapharma.com"
  },
  {
    company: "Zidio Development",
    role: "Software Development Intern",
    type: "internship",
    location: "Remote",
    startDate: "2023-06",
    endDate: "2023-12",
    description: "Contributed to full-stack web development projects, building responsive user interfaces and backend services. Gained hands-on experience with the MERN stack in a professional team environment.",
    achievements: [
      "Developed and deployed 3+ full-stack web applications",
      "Built reusable React component library used across multiple projects",
      "Implemented user authentication and authorization flows",
      "Participated in code reviews and agile sprint ceremonies",
      "Wrote comprehensive API documentation"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "CSS", "Git", "REST APIs", "Postman"],
    companyUrl: "https://zidio.in"
  },
  {
    company: "Cognifyz Technologies",
    role: "Web Development Intern",
    type: "internship",
    location: "Remote",
    startDate: "2023-03",
    endDate: "2023-06",
    description: "Focused on frontend development and UI/UX design, creating responsive web interfaces and learning modern development workflows in a fast-paced startup environment.",
    achievements: [
      "Designed and developed responsive landing pages and dashboards",
      "Implemented pixel-perfect UI designs from Figma mockups",
      "Improved website performance scores by 25%",
      "Collaborated with design team to enhance user experience"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Figma", "Bootstrap", "Git", "Responsive Design"],
    companyUrl: "https://cognifyz.com"
  }
];

export const achievements = [
  {
    title: "Smart India Hackathon",
    value: "Top 800",
    description: "Ranked in top 800 out of 31,000+ teams in India's largest hackathon",
    category: "competitive",
    icon: "🏆"
  },
  {
    title: "Teams Competed Against",
    value: "31,000+",
    description: "Competed against 31,000+ teams from across India",
    category: "competitive",
    icon: "🎯"
  },
  {
    title: "Hackathons Participated",
    value: "5+",
    description: "Participated in 5+ national and international hackathons",
    category: "competitive",
    icon: "⚡"
  },
  {
    title: "Projects Built",
    value: "10+",
    description: "Shipped 10+ production-grade full-stack applications",
    category: "competitive",
    icon: "🚀"
  },
  {
    title: "Freelance Projects",
    value: "5+",
    description: "Delivered 5+ freelance projects for clients across industries",
    category: "freelance",
    icon: "💼"
  },
  {
    title: "Internships",
    value: "3+",
    description: "Completed internships at multiple tech companies",
    category: "academic",
    icon: "🎓"
  },
  {
    title: "Technologies Mastered",
    value: "15+",
    description: "Proficient in 15+ modern technologies and frameworks",
    category: "academic",
    icon: "💻"
  },
  {
    title: "Team Leadership",
    value: "6+",
    description: "Led teams of 6+ members in hackathons and projects",
    category: "leadership",
    icon: "👥"
  }
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CTO",
    company: "Lystra Pharma",
    content: "Sai Kumar is an exceptional engineer who consistently delivers high-quality work. His ability to architect complex healthcare systems while maintaining clean, maintainable code is remarkable. He's a true asset to any team.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Zidio Development",
    content: "Working with Sai was a pleasure. He brings a product mindset to engineering — always thinking about the user experience while building robust technical solutions. His React skills are top-notch.",
    rating: 5
  },
  {
    name: "Arun Patel",
    role: "Lead Developer",
    company: "Cognifyz Technologies",
    content: "Sai's growth during his internship was extraordinary. He quickly went from learning the basics to contributing production-ready code. His passion for AI and modern web technologies is truly inspiring.",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    role: "Hackathon Organizer",
    company: "Bengaluru AI Hack Day",
    content: "Sai's team delivered one of the most impressive projects at our hackathon. His leadership, technical depth, and ability to present complex ideas clearly set him apart from hundreds of participants.",
    rating: 5
  }
];

export const hackathons = [
  {
    name: "Smart India Hackathon",
    organizer: "Government of India",
    date: "2024",
    achievement: "Finalist",
    description: "Competed in India's largest hackathon with 10,000+ teams. Built an innovative solution addressing real-world government challenges using AI and full-stack technologies.",
    technologies: ["React", "Node.js", "MongoDB", "Python", "AI/ML"],
    position: "Top 800 out of 31,000+ teams",
    teamSize: 6,
    projectName: "AI-Powered Solution"
  },
  {
    name: "Meta PyTorch Hackathon",
    organizer: "Meta",
    date: "2024",
    achievement: "Participant",
    description: "Participated in Meta's global PyTorch hackathon, building machine learning solutions using the PyTorch framework. Gained deep experience with neural networks and model deployment.",
    technologies: ["Python", "PyTorch", "Deep Learning", "Computer Vision"],
    teamSize: 3
  },
  {
    name: "Cardano Asia Hackathon",
    organizer: "Cardano Foundation",
    date: "2024",
    achievement: "Participant",
    description: "Explored blockchain development building decentralized applications on the Cardano blockchain. Developed a Web3 solution integrating smart contracts with a modern frontend.",
    technologies: ["Haskell", "Plutus", "React", "Web3", "Blockchain"],
    teamSize: 4
  },
  {
    name: "Bengaluru AI Hack Day",
    organizer: "Bengaluru AI Community",
    date: "2024",
    achievement: "Finalist",
    description: "Built an AI-powered application in 24 hours at one of India's premier AI hackathons. Focused on leveraging LLMs and generative AI for practical problem-solving.",
    technologies: ["Python", "OpenAI", "LangChain", "React", "FastAPI"],
    teamSize: 4
  },
  {
    name: "VIBEATHON",
    organizer: "Community",
    date: "2024",
    achievement: "Participant",
    description: "A creative hackathon focused on building innovative products with modern web technologies. Collaborated with designers and developers to ship a polished product in 48 hours.",
    technologies: ["React", "Next.js", "TailwindCSS", "Framer Motion", "AI"],
    teamSize: 5
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Seeding database Collections...');

    await Project.deleteMany();
    await SkillCategory.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Achievement.deleteMany();
    await Testimonial.deleteMany();
    await Hackathon.deleteMany();

    await Project.insertMany(projects);
    await SkillCategory.insertMany(skillCategories);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences);
    await Achievement.insertMany(achievements);
    await Testimonial.insertMany(testimonials);
    await Hackathon.insertMany(hackathons);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

const importData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected via CLI...');
    await seedDatabase();
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

// Only run if called directly
if (require.main === module) {
  importData();
}
