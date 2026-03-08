'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const packages = [
  {
    name: 'Essential',
    price: '1,50,000',
    duration: 'per day',
    description: 'Perfect for intimate celebrations',
    features: [
      '1 Photographer + 1 Videographer',
      '8 hours coverage',
      '300+ edited photos',
      '3-5 minute highlight video',
      'Online gallery',
      'USB drive with all files',
      'Delivery in 6 weeks',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '2,50,000',
    duration: 'per day',
    description: 'Most popular for full day weddings',
    features: [
      '2 Photographers + 2 Videographers',
      'Full day coverage (12 hours)',
      '500+ edited photos',
      '8-10 minute cinematic film',
      'Traditional ceremony video',
      'Same day edit option',
      'Premium online gallery',
      'USB + printed album (50 pages)',
      'Delivery in 4 weeks',
    ],
    popular: true,
  },
  {
    name: 'Luxury',
    price: '4,00,000',
    duration: 'per event',
    description: 'For grand multi-day celebrations',
    features: [
      '3 Photographers + 3 Videographers',
      'Multi-day coverage (up to 3 days)',
      '1000+ edited photos',
      '15-20 minute feature film',
      'All ceremony videos',
      'Same day edit included',
      'Drone footage',
      'Pre-wedding shoot included',
      'Premium leather album (100 pages)',
      'Parent albums (2)',
      'Delivery in 3 weeks',
      'Priority support',
    ],
    popular: false,
  },
];

const addOns = [
  { name: 'Pre-Wedding Shoot', price: '50,000' },
  { name: 'Same Day Edit', price: '30,000' },
  { name: 'Drone Coverage', price: '25,000' },
  { name: 'Additional Day', price: '1,00,000' },
  { name: 'Extra Album (50 pages)', price: '15,000' },
  { name: 'Raw Files', price: '20,000' },
];

export default function PricingPage() {
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
            Our Packages
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transparent pricing for exceptional wedding photography and videography services
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                pkg.popular ? 'ring-4 ring-gray-900 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gray-900 text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="font-playfair text-3xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">₹{pkg.price}</span>
                  <span className="text-gray-600 ml-2">{pkg.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-4 px-6 rounded-full font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-Ons */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-playfair text-4xl font-bold mb-8 text-center">
            Add-Ons & Extras
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 flex justify-between items-center"
              >
                <span className="font-semibold text-lg">{addon.name}</span>
                <span className="text-2xl font-bold text-gray-900">₹{addon.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl font-bold mb-8 text-center">
              Pricing FAQs
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-2">What's included in the packages?</h3>
                <p className="text-gray-600">
                  All packages include professional photography and videography services, edited photos and videos, online gallery access, and delivery on USB drive. Higher packages include additional team members, longer coverage, and premium products.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-2">Do you travel for destination weddings?</h3>
                <p className="text-gray-600">
                  Yes! We love destination weddings. Travel and accommodation costs are additional and will be discussed during consultation.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-2">What's your booking process?</h3>
                <p className="text-gray-600">
                  Contact us to check availability, then we'll schedule a consultation call. After finalizing details, we'll send a contract and invoice. A 30% advance secures your date.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-2">Can I customize a package?</h3>
                <p className="text-gray-600">
                  Absolutely! We understand every wedding is unique. We can tailor packages to your specific needs and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gray-900 text-white rounded-xl p-12"
        >
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Ready to Book?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's discuss your wedding and create a custom package perfect for your special day.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
