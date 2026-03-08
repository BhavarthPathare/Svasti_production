import FAQItem from '@/components/faq/FAQItem';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about our wedding photography and videography services.',
};

const faqs = [
  {
    question: 'Where are you based? Do you travel for weddings?',
    answer: 'We are based in Mumbai, India, but we absolutely love to travel! We have captured weddings across 20+ Indian cities and international destinations including Dubai, Baku, Abu Dhabi, Kenya, and throughout Europe. Travel charges may apply depending on the location, but we\'re always excited to explore new places and document your love story wherever you choose to celebrate.',
  },
  {
    question: 'How can we book Svasti Production?',
    answer: 'Booking with us is simple! Fill out our contact form with details about your wedding, or reach us directly at svastiproduction2804@gmail.com or +91 8530838928. We\'ll schedule a consultation call to understand your vision, discuss packages, and check our availability. Once we align on the details, we\'ll send you a contract and booking agreement. A 30% advance secures your date.',
  },
  {
    question: 'What\'s your photography & videography style?',
    answer: 'Our style is a blend of documentary and fine art photography with cinematic videography. We focus on capturing authentic, candid moments rather than forced poses. Drawing from our fashion industry background, we bring artistic composition and attention to detail while keeping the emotions raw and genuine. Every image and film tells your unique love story naturally and beautifully.',
  },
  {
    question: 'How big is your team? Will it affect the cost?',
    answer: 'Our team size is tailored to your wedding\'s scale and requirements. For intimate weddings, we work with a compact team of 2-3 professionals. Larger celebrations may require 4-6 team members to ensure comprehensive coverage. The team size is factored into our package pricing, so you\'ll know the exact cost upfront with no hidden surprises. Our base package starts at ₹1,50,000 per day.',
  },
  {
    question: 'What will we receive, and when?',
    answer: 'You\'ll receive: (1) High-resolution edited photos (300-500+ images depending on your package), (2) A cinematic highlight film (5-8 minutes), (3) Full ceremony coverage videos, (4) Online gallery for easy sharing, and (5) Optional printed albums and USB drives. We deliver edited photos within 4-6 weeks and films within 8-12 weeks after your wedding. Same-day edits, if included, are delivered during the reception!',
  },
  {
    question: 'Do you offer pre-wedding shoots and same-day edits?',
    answer: 'Absolutely! Pre-wedding shoots are a wonderful way to get comfortable in front of the camera before your big day. We can shoot at your chosen location—be it a scenic destination, urban landscape, or meaningful place in your love story. Same-day edits are also available, where we create a 3-5 minute highlight film edited live and played during your reception. Both services can be added to your wedding package.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about working with Svasti Production
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-lg p-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We build relationships based on respect, transparency, and friendship. Every couple is unique, and we\'re here to answer any specific questions you may have about your wedding day.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
