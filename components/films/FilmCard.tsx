'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Film {
  title: string;
  location: string;
  type: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

export default function FilmCard({ film }: { film: Film }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-gray-200">
          <Image
            src={film.thumbnail}
            alt={`${film.title} - ${film.location}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-gray-900 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
            {film.type}
          </div>
        </div>

        <h3 className="font-playfair text-2xl font-bold mb-1">
          {film.title}
        </h3>
        <p className="text-gray-600 mb-2">{film.location}</p>
        <p className="text-gray-700 text-sm">{film.description}</p>
      </motion.div>

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
              className="relative w-full max-w-5xl aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
                title={`${film.title} - ${film.location}`}
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
    </>
  );
}
