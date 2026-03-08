'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function Counter({ end, label, suffix = '', duration = 2 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold font-playfair mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-gray-600">{label}</div>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="bg-gray-900 text-white py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Our Journey in Numbers
          </h2>
          <p className="text-xl text-gray-300">
            Trusted by couples across the globe
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Counter end={500} label="Weddings Captured" suffix="+" />
          <Counter end={50} label="Destinations Covered" suffix="+" />
          <Counter end={25} label="Awards Won" suffix="+" />
          <Counter end={100} label="Happy Clients" suffix="%" />
        </div>
      </div>
    </section>
  );
}
