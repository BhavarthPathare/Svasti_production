import Hero from '@/components/home/Hero';
import GalleryPreview from '@/components/home/GalleryPreview';
import StorySection from '@/components/home/StorySection';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import FeaturedVideo from '@/components/home/FeaturedVideo';

export default function Page() {
  return (
    <div>
      <Hero />
      <Statistics />
      <StorySection />
      <FeaturedVideo />
      <GalleryPreview />
      <Testimonials />
    </div>
  );
}
