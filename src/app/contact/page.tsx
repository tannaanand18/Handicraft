import { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Artisan Concierge & Private Inquiries — SHREEJI HANDICRAFT',
  description:
    'Inquire regarding bespoke handicraft commissions, royal wedding gifting, or private showroom viewings with our master curators.',
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="font-serif text-lg text-[#34251F]">Loading Concierge Suite...</div>
        </div>
      }
    >
      <ContactClient />
    </Suspense>
  );
}

