'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import { motion } from 'framer-motion';

// Sample wedding stories for gallery preview
const weddingStories = [
  {
    id: 'priya-and-rahul',
    slug: 'priya-and-rahul',
    title: 'Priya & Rahul',
    subtitle: 'A Royal Wedding in Jaipur',
    coverImage: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    category: 'Wedding',
  },
  {
    id: 'neha-and-arjun',
    slug: 'neha-and-arjun',
    title: 'Neha & Arjun',
    subtitle: 'Beach Wedding in Goa',
    coverImage: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    category: 'Wedding',
  },
  {
    id: 'aisha-and-vikram',
    slug: 'aisha-and-vikram',
    title: 'Aisha & Vikram',
    subtitle: 'Palace Wedding in Udaipur',
    coverImage: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    category: 'Wedding',
  },
  {
    id: 'sample-pre-wedding-1',
    slug: 'priya-and-rahul',
    title: 'Mountain Romance',
    subtitle: 'Pre-Wedding Shoot',
    coverImage: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    category: 'Pre-Wedding',
  },
  {
    id: 'sample-pre-wedding-2',
    slug: 'neha-and-arjun',
    title: 'Seaside Love',
    subtitle: 'Pre-Wedding Shoot',
    coverImage: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    category: 'Pre-Wedding',
  },
  {
    id: 'sample-engagement-1',
    slug: 'aisha-and-vikram',
    title: 'The Proposal',
    subtitle: 'Engagement Ceremony',
    coverImage: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    category: 'Engagement',
  },
  {
    id: 'sample-reception-1',
    slug: 'priya-and-rahul',
    title: 'Grand Celebration',
    subtitle: 'Wedding Reception',
    coverImage: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    category: 'Reception',
  },
  {
    id: 'sample-engagement-2',
    slug: 'neha-and-arjun',
    title: 'Ring Ceremony',
    subtitle: 'Engagement',
    coverImage: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    category: 'Engagement',
  },
  {
    id: 'sample-wedding-4',
    slug: 'aisha-and-vikram',
    title: 'Traditional Ceremony',
    subtitle: 'Wedding Day',
    coverImage: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    category: 'Wedding',
  },
];

const categories = ['All', 'Wedding', 'Pre-Wedding', 'Engagement', 'Reception'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredStories = activeCategory === 'All' 
    ? weddingStories 
    : weddingStories.filter((story) => story.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Enter a world where love is beautifully immortalized. Every photograph captures the essence of emotions, the beauty of moments, and the magic of memories that last forever.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>

      {/* Gallery Grid - Story Cards */}
      <section className="container mx-auto px-6">
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStories.map((story, index) => (
            <Link
              key={story.id}
              href={`/gallery/${story.slug}`}
              className="block"
            >
              <div className="group relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm mb-2 uppercase tracking-wider">
                      {story.category}
                    </p>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      {story.subtitle}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                      View Story
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Load More Button */}
      <section className="container mx-auto px-6 mt-12">
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Load More Stories
          </motion.button>
        </div>
      </section>
    </div>
  );
}
