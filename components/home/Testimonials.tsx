'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  event: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya & Rahul',
    location: 'Mumbai',
    event: 'Wedding Photography',
    rating: 5,
    text: 'Svasti Production captured our wedding day perfectly! Every moment, every emotion was preserved beautifully. The team was professional, creative, and made us feel so comfortable. Our photos are absolutely stunning!',
  },
  {
    name: 'Anjali & Vikram',
    location: 'Goa',
    event: 'Pre-Wedding Shoot',
    rating: 5,
    text: 'The pre-wedding shoot exceeded all our expectations! The team scouted amazing locations and the final video was nothing short of a cinematic masterpiece. Highly recommend!',
  },
  {
    name: 'Neha & Karan',
    location: 'Jaipur',
    event: 'Destination Wedding',
    rating: 5,
    text: 'From start to finish, working with Svasti Production was an absolute pleasure. They understood our vision and delivered beyond our dreams. The attention to detail is remarkable!',
  },
  {
    name: 'Shreya & Aditya',
    location: 'Delhi',
    event: 'Wedding Film',
    rating: 5,
    text: 'Our wedding film brings tears to our eyes every time we watch it. The storytelling, the music, the emotions - everything is perfect. Thank you for giving us memories to cherish forever!',
  },
  {
    name: 'Riya & Arjun',
    location: 'Bangalore',
    event: 'Engagement & Wedding',
    rating: 5,
    text: 'We hired Svasti Production for both our engagement and wedding, and they delivered exceptional work both times. The consistency in quality and creativity is impressive. Best decision ever!',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next >= testimonials.length) return 0;
      if (next < 0) return testimonials.length - 1;
      return next;
    });
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            What Our Couples Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from real couples
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden relative h-[400px] md:h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center italic">
                    "{testimonials[current].text}"
                  </p>

                  {/* Author */}
                  <div className="text-center">
                    <h4 className="font-semibold text-xl mb-1">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[current].event} • {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? 'bg-gray-900 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
