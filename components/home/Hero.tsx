'use client';

import { motion } from 'framer-motion';
import ImageWithBlur from '../ui/ImageWithBlur';
import { useState, useEffect } from 'react';

const heroImages = [
  'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
  'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
  'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {heroImages.map((src, index) => {
        const isActive = index === currentImage;
        const pans = [
          { x: -12, y: 0 },
          { x: 10, y: -8 },
          { x: 0, y: 10 },
        ];
        const pan = pans[index % pans.length];

        return (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.04, x: 0, y: 0 }}
              animate={{ scale: isActive ? 1.12 : 1.04, x: isActive ? pan.x : 0, y: isActive ? pan.y : 0 }}
              transition={{ duration: 6, ease: 'easeInOut' }}
              className="absolute inset-0 origin-center"
            >
              <ImageWithBlur
                src={src}
                alt={`Wedding moment ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
          Turning precious moments
          <br />
          into unforgettable memories
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          Welcome to Svasti Production, where every image tells a heartfelt love story
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="/gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            View Our Gallery
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            Book Us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
