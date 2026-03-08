import ImageWithBlur from '@/components/ui/ImageWithBlur';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Svasti Production - Premium wedding photography and cinematography services capturing love stories across the globe.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Svasti Production emerged from a deep passion for preserving love in its purest form
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 space-y-24">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <ImageWithBlur
              src="https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07"
              alt="Wedding photography"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-playfair text-3xl font-bold">
              Over 500 Weddings Captured
            </h2>
            <p className="text-gray-700 leading-relaxed">
              With roots in the fashion industry, we bring an unparalleled attention to detail and artistic vision to every wedding we capture. Our journey has taken us across the globe, documenting love stories in over 20 Indian cities and destinations like Dubai, Baku, Abu Dhabi, Kenya, and throughout Europe.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We don't just take photographs—we preserve the raw, heartfelt connections that make each couple unique. Every moment we capture tells a story of genuine emotion, free from forced poses or artificial staging.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:order-1">
            <h2 className="font-playfair text-3xl font-bold">
              Award-Winning Excellence
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our award-winning team is selective about the weddings we take on, ensuring we can devote our full creative energy to each celebration. This commitment to quality over quantity has earned us recognition as one of India's most trusted names in luxury wedding photography.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every couple who chooses Svasti Production becomes part of our ever-growing family. We approach each wedding with the same passion and dedication, treating your special day as if it were our own.
            </p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden md:order-2">
            <ImageWithBlur
              src="https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333"
              alt="Wedding cinematography"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <ImageWithBlur
              src="https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99"
              alt="Couple photography"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-playfair text-3xl font-bold">
              Our Philosophy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in capturing the authentic essence of your relationship—the stolen glances, the quiet moments, the uncontrolled laughter. These are the memories that matter most, and we're honored to preserve them for you.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From intimate gatherings to grand celebrations, we pour our heart and soul into every project, ensuring swift delivery without compromising on quality. Your love story deserves nothing less than perfection.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 mt-24">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-lg p-12">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We'd love to hear about your wedding plans and discuss how we can capture your unique love story.
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
