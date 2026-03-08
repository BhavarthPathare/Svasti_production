'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Priya & Rahul',
    location: 'Mumbai',
    event: 'Wedding Photography & Videography',
    rating: 5,
    date: 'December 2024',
    image: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    text: 'Svasti Production captured our wedding day perfectly! Every moment, every emotion was preserved beautifully. The team was professional, creative, and made us feel so comfortable throughout the day. Our photos are absolutely stunning and we keep going back to watch our wedding film. Worth every penny!',
    highlights: ['Professional Team', 'Beautiful Photos', 'Quick Delivery'],
  },
  {
    name: 'Anjali & Vikram',
    location: 'Goa',
    event: 'Pre-Wedding Shoot',
    rating: 5,
    date: 'November 2024',
    image: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    text: 'The pre-wedding shoot exceeded all our expectations! The team scouted amazing locations in Goa and made the entire experience fun and relaxed. The final video was nothing short of a cinematic masterpiece. Our friends and family were blown away. Highly recommend Svasti Production!',
    highlights: ['Creative Direction', 'Cinematic Quality', 'Fun Experience'],
  },
  {
    name: 'Neha & Karan',
    location: 'Jaipur',
    event: 'Destination Wedding',
    rating: 5,
    date: 'October 2024',
    image: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    text: 'From start to finish, working with Svasti Production was an absolute pleasure. They understood our vision perfectly and delivered beyond our dreams. The attention to detail in both photography and videography is remarkable. They captured moments we didn\'t even know happened!',
    highlights: ['Attention to Detail', 'Perfect Vision', 'Great Communication'],
  },
  {
    name: 'Shreya & Aditya',
    location: 'Delhi',
    event: 'Wedding Film',
    rating: 5,
    date: 'September 2024',
    image: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    text: 'Our wedding film brings tears to our eyes every time we watch it. The storytelling, the music, the emotions - everything is perfect. Svasti Production has an incredible talent for capturing the essence of the day. Thank you for giving us memories to cherish forever!',
    highlights: ['Emotional Storytelling', 'Perfect Music', 'Timeless Quality'],
  },
  {
    name: 'Riya & Arjun',
    location: 'Bangalore',
    event: 'Engagement & Wedding',
    rating: 5,
    date: 'August 2024',
    image: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    text: 'We hired Svasti Production for both our engagement and wedding, and they delivered exceptional work both times. The consistency in quality and creativity is impressive. They became like family by the end of our wedding. Best decision we made for our celebrations!',
    highlights: ['Consistent Quality', 'Like Family', 'Exceptional Work'],
  },
  {
    name: 'Diya & Rohan',
    location: 'Udaipur',
    event: 'Destination Wedding',
    rating: 5,
    date: 'July 2024',
    image: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    text: 'The team traveled to Udaipur for our destination wedding and the results were magical! They worked seamlessly with our wedding planners and captured every ritual perfectly. The drone footage of our venue was breathtaking. Couldn\'t have asked for better coverage!',
    highlights: ['Drone Footage', 'Seamless Coordination', 'Magical Results'],
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            What Our Couples Say
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Real stories from real couples who trusted us to capture their special moments
          </p>
        </motion.div>
      </section>

      {/* Overall Rating */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-gray-900 text-white rounded-xl p-12 text-center"
        >
          <div className="text-6xl font-bold mb-4">5.0</div>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-xl text-gray-300">
            Based on {testimonials.length} reviews
          </p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.event} • {testimonial.location}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gray-50 rounded-xl p-12"
        >
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Ready to Create Your Story?
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Join our family of happy couples and let us capture your special moments.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Book Your Date
          </a>
        </motion.div>
      </section>
    </div>
  );
}
