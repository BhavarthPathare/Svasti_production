import Hero from '@/components/home/Hero';
import GalleryPreview from '@/components/home/GalleryPreview';
import StorySection from '@/components/home/StorySection';

export default function LocaleHomePage() {
  return (
    <div>
      <Hero />
      <GalleryPreview />
      <StorySection />
    </div>
  );
}