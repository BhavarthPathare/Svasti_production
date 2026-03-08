'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageWithBlur from '../ui/ImageWithBlur';

const featuredImages = [
  'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
  'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
  'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
  'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
  'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
  'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
];

export default function GalleryPreview() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
          Featured Stories
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take a glimpse into our collection of heartfelt moments, where every frame is a work of art
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {featuredImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer"
          >
            <ImageWithBlur
              src={src}
              alt={`Featured wedding moment ${i + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/gallery"
          className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          View Full Gallery →
        </Link>
      </div>
    </section>
  );
}
