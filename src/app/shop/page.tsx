import { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopClient } from './ShopClient';

export const metadata: Metadata = {
  title: 'Curated Collection — Browse Handcrafted Heirlooms',
  description:
    'Explore our complete portfolio of certified authentic Indian handicrafts: brass metallurgy, carved teakwood, Nathdwara Pichwai, and Jaipur pottery.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="font-serif text-lg text-[#34251F]">Loading Curated Portfolio...</div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}

