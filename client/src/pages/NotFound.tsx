import { motion } from "framer-motion";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { MagneticButton } from "../components/effects/MagneticButton";
import { GradientBlobs } from "../components/effects/GradientBlobs";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBlobs className="opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-[120px] md:text-[180px] font-display font-bold leading-none gradient-text-tri select-none">
            404
          </span>
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-3">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
            Page Not Found
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-text-muted text-sm md:text-base mb-10 max-w-sm mx-auto leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            size="lg"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Home size={18} />
            Back Home
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft size={18} />
            Go Back
          </MagneticButton>
        </motion.div>

        {/* Fun decorative element */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center justify-center gap-2 text-text-muted"
        >
          <Sparkles size={14} className="text-accent-blue" />
          <span className="text-xs tracking-wide">
            Lost in the digital void
          </span>
          <Sparkles size={14} className="text-accent-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
}
