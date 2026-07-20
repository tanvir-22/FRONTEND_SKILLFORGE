"use client";

import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];

export function Reveal({ children, delay = 0, y = 24, className, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

export function StaggerGroup({ children, className, stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={stagger}
      variants={groupVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function StaggerItem({ children, className }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
