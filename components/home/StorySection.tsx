'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
            Our Philosophy
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
            <p>
              We are passionate about capturing the true essence of each couple's journey, preserving their most cherished moments through timeless photography and cinematic storytelling.
            </p>
            <p>
              With roots in the fashion industry and over 500 weddings captured across the globe, we bring an unparalleled attention to detail and artistic vision to every celebration we document.
            </p>
            <p className="font-semibold text-gray-900">
              Step into a world of storytelling through our lens, where every frame is a work of art and every moment tells your unique love story.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Learn More About Us
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Book Your Date
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}