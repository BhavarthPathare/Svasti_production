'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithBlur from '@/components/ui/ImageWithBlur';
import Lightbox from './Lightbox';

interface Image {
  src: string;
  title?: string;
  category?: string;
}

interface MasonryGridProps {
  images?: (string | Image)[];
}

export default function MasonryGrid({ images = [] }: MasonryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Normalize images to always have src property
  const normalizedImages = images.map((img) => 
    typeof img === 'string' ? { src: img } : img
  );

  const imageSources = normalizedImages.map((img) => img.src);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {normalizedImages.map((img, i) => (
          <div
            key={i}
            className="aspect-[4/5] relative cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setOpenIndex(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ImageWithBlur 
              src={img.src} 
              alt={img.title || `Gallery ${i + 1}`} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              loading={i < 6 ? "eager" : "lazy"}
              priority={i < 6}
            />
            
            {/* Overlay on hover */}
            <div 
              className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                  />
                </svg>
              </div>
              {img.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold text-lg">{img.title}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox src={imageSources[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}