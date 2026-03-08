'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    // Show loading toast
    const loadingToast = toast.loading('Sending your inquiry...');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        toast.success('Thank you! We will be in touch within 48 hours.', {
          id: loadingToast,
        });
        (e.target as HTMLFormElement).reset();
        
        // Reset status after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        toast.error('Something went wrong. Please try again or call us directly.', {
          id: loadingToast,
        });
      }
    } catch (error) {
      setStatus('error');
      toast.error('Network error. Please check your connection and try again.', {
        id: loadingToast,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="coupleName" className="block text-sm font-medium text-gray-700 mb-2">
          Couple Name *
        </label>
        <input
          type="text"
          id="coupleName"
          name="coupleName"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="John & Jane"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div>
        <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us? *
        </label>
        <select
          id="hearAbout"
          name="hearAbout"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="">Select an option</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="google">Google Search</option>
          <option value="referral">Referral from Friend/Family</option>
          <option value="vendor">Wedding Vendor</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
          Job Type *
        </label>
        <select
          id="jobType"
          name="jobType"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="">Select a service</option>
          <option value="wedding">Wedding Photography & Videography</option>
          <option value="prewedding">Pre-Wedding Shoot</option>
          <option value="engagement">Engagement</option>
          <option value="reception">Reception Only</option>
          <option value="samedayedit">Same Day Edit</option>
          <option value="destination">Destination Wedding</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-2">
            Event Time *
          </label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 mb-2">
          Event Location *
        </label>
        <input
          type="text"
          id="eventLocation"
          name="eventLocation"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="City, State or Venue Name"
        />
      </div>

      <div>
        <label htmlFor="eventStyle" className="block text-sm font-medium text-gray-700 mb-2">
          Style of Event *
        </label>
        <input
          type="text"
          id="eventStyle"
          name="eventStyle"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="e.g., Traditional Hindu, Christian, Destination Beach Wedding"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
          Budget Range (Optional)
        </label>
        <select
          id="budget"
          name="budget"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="">Select your budget range</option>
          <option value="1-2L">₹1,00,000 - ₹2,00,000</option>
          <option value="2-3L">₹2,00,000 - ₹3,00,000</option>
          <option value="3-5L">₹3,00,000 - ₹5,00,000</option>
          <option value="5L+">₹5,00,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Tell us more about your special day... *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
          placeholder="Share your vision, any special requests, or questions you have for us..."
        />
        <p className="text-sm text-gray-500 mt-1">Maximum 5000 characters</p>
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </motion.button>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Form submitted successfully! We'll be in touch soon.</span>
        </motion.div>
      )}
    </form>
  );
}
