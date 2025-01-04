"use client";

import { motion } from "motion/react";

export const BackgroundPattern = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden motion-safe:block hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Main ambient light - brighter warm accents */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 15%, rgba(255, 196, 92, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 85% 85%, rgba(255, 183, 77, 0.2) 0%, transparent 50%)
            `,
          }}
        />

        {/* Primary orb - increased brightness */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[50%] h-[50%] rounded-full mix-blend-soft-light"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            background: `
              radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%),
              radial-gradient(circle, rgba(255, 190, 77, 0.2) 0%, transparent 70%)
            `,
          }}
        />

        {/* Secondary orb - increased vibrancy */}
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] rounded-full mix-blend-soft-light"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            background: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%),
              radial-gradient(circle, rgba(255, 180, 65, 0.18) 0%, transparent 70%)
            `,
          }}
        />

        {/* Grid overlay - brighter lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            opacity: 0.6,
          }}
        />

        {/* Extra ambient highlights - more colorful */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(255, 200, 102, 0.12) 0%, transparent 70%),
              radial-gradient(circle at 80% 20%, rgba(255, 190, 77, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(255, 183, 77, 0.1) 0%, transparent 50%)
            `,
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>
    </div>
  );
};
