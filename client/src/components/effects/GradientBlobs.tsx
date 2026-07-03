"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GradientBlobsProps {
  className?: string;
}

export function GradientBlobs({ className = "" }: GradientBlobsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {/* Blue blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple blob */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
          top: "40%",
          right: "10%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
          bottom: "10%",
          left: "40%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
