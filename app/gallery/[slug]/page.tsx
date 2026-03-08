import { notFound } from 'next/navigation';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import ImageWithBlur from '@/components/ui/ImageWithBlur';
import Link from 'next/link';
import HeroAnimation, { HeroText, HeroFade } from './HeroAnimation';

// Sample wedding stories data
const weddingStories = {
  'priya-and-rahul': {
    slug: 'priya-and-rahul',
    title: 'Priya & Rahul',
    subtitle: 'A Royal Wedding in Jaipur',
    date: 'December 15, 2023',
    location: 'Rambagh Palace, Jaipur',
    description: 'A magnificent celebration of love set against the backdrop of Rajasthan\'s royal heritage. Priya and Rahul\'s wedding was a perfect blend of tradition and elegance, featuring stunning decor, vibrant colors, and unforgettable moments.',
    coverImage: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
    category: 'Wedding',
    images: [
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'The Grand Entrance', category: 'Ceremony' },
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Sacred Rituals', category: 'Ceremony' },
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'The Beautiful Bride', category: 'Portraits' },
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'Candid Moments', category: 'Candid' },
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Family Celebrations', category: 'Family' },
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'Reception Glory', category: 'Reception' },
    ],
    highlights: [
      'Traditional Rajasthani ceremony',
      '500+ guests from around the world',
      'Live classical music performance',
      'Spectacular fireworks display',
    ],
  },
  'neha-and-arjun': {
    slug: 'neha-and-arjun',
    title: 'Neha & Arjun',
    subtitle: 'Beach Wedding in Goa',
    date: 'March 20, 2024',
    location: 'Taj Exotica, Goa',
    description: 'A dreamy beach wedding where the ocean breeze and sunset hues created the perfect romantic atmosphere. Neha and Arjun\'s intimate celebration was filled with laughter, joy, and beautiful moments by the sea.',
    coverImage: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333',
    category: 'Wedding',
    images: [
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Sunset Ceremony', category: 'Ceremony' },
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'Beach Romance', category: 'Couple' },
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'Bohemian Decor', category: 'Details' },
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Dancing by the Shore', category: 'Reception' },
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'Intimate Moments', category: 'Candid' },
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'Golden Hour', category: 'Portraits' },
    ],
    highlights: [
      'Beachfront ceremony at sunset',
      'Intimate gathering of 150 guests',
      'Barefoot celebration on the sand',
      'Live acoustic band performance',
    ],
  },
  'aisha-and-vikram': {
    slug: 'aisha-and-vikram',
    title: 'Aisha & Vikram',
    subtitle: 'Palace Wedding in Udaipur',
    date: 'January 10, 2024',
    location: 'City Palace, Udaipur',
    description: 'An enchanting celebration at the City Palace, where royal elegance met contemporary sophistication. Aisha and Vikram\'s wedding was a spectacular affair with breathtaking views of Lake Pichola.',
    coverImage: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99',
    category: 'Wedding',
    images: [
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'Palace Grandeur', category: 'Venue' },
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'Lake View Ceremony', category: 'Ceremony' },
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Royal Bride', category: 'Portraits' },
      { src: 'https://cms.svastiproduction.com/assets/aeacce5e-3c98-4255-83ee-5538efc35f99', title: 'Elegant Details', category: 'Details' },
      { src: 'https://cms.svastiproduction.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07', title: 'Celebration', category: 'Reception' },
      { src: 'https://cms.svastiproduction.com/assets/abbf5fc0-8d0f-44a6-bbe8-72e793afc333', title: 'Couple Moments', category: 'Couple' },
    ],
    highlights: [
      'Historic City Palace venue',
      'Panoramic lake views',
      'Traditional Rajput ceremonies',
      'Royal boat procession',
    ],
  },
};

export default async function GallerySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = weddingStories[slug as keyof typeof weddingStories];

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] mb-16">
        <ImageWithBlur
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <HeroAnimation>
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-16">
            <div className="max-w-4xl">
              <HeroFade delay={0.2}>
                <p className="text-white/90 text-lg mb-4">
                  {story.category} Story
                </p>
              </HeroFade>
              <HeroText delay={0.3}>
                <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">
                  {story.title}
                </h1>
              </HeroText>
              <HeroFade delay={0.4}>
                <p className="text-2xl md:text-3xl text-white/90 font-light mb-6">
                  {story.subtitle}
                </p>
              </HeroFade>
              <HeroFade delay={0.5}>
                <div className="flex flex-wrap gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{story.location}</span>
                  </div>
                </div>
              </HeroFade>
            </div>
          </div>
        </HeroAnimation>
      </section>

      {/* Story Description */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">The Story</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {story.description}
          </p>
          
          {/* Highlights */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-playfair text-2xl font-bold mb-4">Highlights</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {story.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="container mx-auto px-6 mb-16">
        <div className="mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-4">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Relive the beautiful moments from this celebration
          </p>
        </div>
        
        <MasonryGrid images={story.images} />
      </section>

      {/* Navigation */}
      <section className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Book Your Story
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}