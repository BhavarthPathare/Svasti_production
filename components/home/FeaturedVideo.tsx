'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function FeaturedVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const featuredVideoId = 'nEAq8G2QM5A'; // The Royal Saga video

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Featured Film
          </h2>
          <p className="text-xl text-gray-600">
            Experience our storytelling
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={`https://img.youtube.com/vi/${featuredVideoId}/maxresdefault.jpg`}
              alt="Featured Wedding Film"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center"
              >
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-gray-900 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white text-2xl md:text-3xl font-playfair font-bold mb-2">
                The Royal Saga: Anushka & Virat
              </h3>
              <p className="text-white/90">A cinematic wedding film from Delhi</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-6xl aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
                title="Featured Wedding Film"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
