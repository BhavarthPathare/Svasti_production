'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroAnimationProps {
  children: ReactNode;
  delay?: number;
}

export default function HeroAnimation({ children, delay = 0 }: HeroAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export function HeroText({ children, delay = 0 }: HeroAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export function HeroFade({ children, delay = 0 }: HeroAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}
