'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeCategory === category
              ? 'bg-gray-900 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-900'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
