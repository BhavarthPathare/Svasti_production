'use client';

import { motion } from 'framer-motion';

interface VideoFiltersProps {
  types: string[];
  activeType: string;
  onTypeChange: (type: string) => void;
}

export default function VideoFilters({
  types,
  activeType,
  onTypeChange,
}: VideoFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {types.map((type) => (
        <motion.button
          key={type}
          onClick={() => onTypeChange(type)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeType === type
              ? 'bg-gray-900 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-900'
          }`}
        >
          {type}
        </motion.button>
      ))}
    </div>
  );
}
