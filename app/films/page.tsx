'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FilmCard from '@/components/films/FilmCard';
import VideoFilters from '@/components/films/VideoFilters';

// Using YouTube's default thumbnail service - these always work!
const films = [
  {
    title: 'The Royal Saga: Anushka & Virat',
    location: 'Delhi',
    type: 'Wedding Film',
    description: 'A stunning feature film capturing the traditional ceremonies and emotional moments of the couple\'s grand celebration. Highlights include the vibrant Sangeet and solemn Pheras.',
    thumbnail: `https://img.youtube.com/vi/nEAq8G2QM5A/hqdefault.jpg`,
    youtubeId: 'nEAq8G2QM5A',
  },
  {
    title: 'Love in the Hills: Kiara & Sid',
    location: 'Jaipur (Destination)',
    type: 'Cinematic Teaser',
    description: 'A fast-paced, high-energy teaser trailer setting the stage for a spectacular destination wedding. Perfect blend of candid shots and cinematic flair across the palace grounds.',
    thumbnail: `https://img.youtube.com/vi/KB6UlMWvXTg/hqdefault.jpg`,
    youtubeId: 'KB6UlMWvXTg',
  },
  {
    title: 'Eternal Promise: Rohan & Preeti',
    location: 'Mumbai',
    type: 'Wedding Film',
    description: 'A deeply personal narrative highlighting the couple\'s journey and heartfelt vows. Focuses on the close bond between the families and the intimate rituals.',
    thumbnail: `https://img.youtube.com/vi/i3sdexavv6c/hqdefault.jpg`,
    youtubeId: 'i3sdexavv6c',
  },
  {
    title: 'Before the I Do: Zara & Kabir',
    location: 'Goa',
    type: 'Pre-Wedding',
    description: 'A romantic and playful pre-wedding shoot utilizing the scenic beaches and historic forts of Goa. Showcases the couple\'s natural chemistry and joyful personalities.',
    thumbnail: `https://img.youtube.com/vi/Q_Y1QtERp4Y/hqdefault.jpg`,
    youtubeId: 'Q_Y1QtERp4Y',
  },
  {
    title: 'Instant Memories: Meera & Arjun',
    location: 'Pune',
    type: 'Same Day Edit',
    description: 'A thrilling short film created and shown at the reception dinner. Captures the best moments from the day, from getting ready to the final kiss, presented immediately.',
    thumbnail: `https://img.youtube.com/vi/7FRqiuaC7ss/hqdefault.jpg`,
    youtubeId: '7FRqiuaC7ss',
  },
  {
    title: 'Vibrant Vows: Diya & Rahul',
    location: 'Hyderabad',
    type: 'Cinematic Teaser',
    description: 'A captivating 60-second trailer focusing on the bright colors and extravagant details of the traditional Telugu wedding ceremonies. A beautiful glimpse of a grand celebration.',
    thumbnail: `https://img.youtube.com/vi/y42fGNITF6M/hqdefault.jpg`,
    youtubeId: 'y42fGNITF6M',
  },
];

const filmTypes = ['All', 'Wedding Film', 'Pre-Wedding', 'Cinematic Teaser', 'Same Day Edit'];

export default function FilmsPage() {
  const [activeType, setActiveType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFilms = films.filter((film) => {
    const matchesType = activeType === 'All' || film.type === activeType;
    const matchesSearch = film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          film.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

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
            Our Films
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover the films behind the lens—cinematic stories that capture the essence of love, emotion, and celebration across cultures and continents.
          </p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-6 mb-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by couple name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-full border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Video Type Filters */}
      <section className="container mx-auto px-6">
        <VideoFilters
          types={filmTypes}
          activeType={activeType}
          onTypeChange={setActiveType}
        />
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-6 mb-8">
        <p className="text-center text-gray-600">
          Showing {filteredFilms.length} of {films.length} films
        </p>
      </section>

      {/* Films Grid */}
      <section className="container mx-auto px-6">
        <motion.div
          key={`${activeType}-${searchTerm}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredFilms.length > 0 ? (
            filteredFilms.map((film) => (
              <FilmCard key={`${film.title}-${film.location}`} film={film} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-xl">No films found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
