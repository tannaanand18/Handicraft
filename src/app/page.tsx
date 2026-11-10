import { HeroSection } from '@/components/home/HeroSection';
import { BrandHighlights } from '@/components/home/BrandHighlights';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { CraftsmanshipStory } from '@/components/home/CraftsmanshipStory';
import { BestSellers } from '@/components/home/BestSellers';
import { HeritageCollection } from '@/components/home/HeritageCollection';
import { ArtisanStory } from '@/components/home/ArtisanStory';
import { GiftingSection } from '@/components/home/GiftingSection';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Section 3: Cinematic Hero */}
      <HeroSection />

      {/* Section 4: Brand Highlights */}
      <BrandHighlights />

      {/* Section 5: Shop by Categories */}
      <CategoriesSection />

      {/* Section 6: Featured Collection */}
      <FeaturedCollection />

      {/* Section 7: Our Craftsmanship */}
      <CraftsmanshipStory />

      {/* Section 8: Best Sellers */}
      <BestSellers />

      {/* Section 9: Heritage Collection */}
      <HeritageCollection />

      {/* Section 10: Artisan Story */}
      <ArtisanStory />

      {/* Section 11: Special Gifts */}
      <GiftingSection />

      {/* Section 12: Customer Testimonials */}
      <Testimonials />

      {/* Section 13: Instagram Gallery */}
      <InstagramGallery />

      {/* Section 14: Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
