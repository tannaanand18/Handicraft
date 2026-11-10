import { Metadata } from 'next';
import { Suspense } from 'react';
import { AccountClient } from './AccountClient';

export const metadata: Metadata = {
  title: 'Patron Account & Heirloom Orders — SHREEJI HANDICRAFT',
  description: 'Manage your handcrafted orders, track insured shipments, and curate your personal wishlist.',
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="font-serif text-lg text-[#34251F]">Accessing Patron Ledger...</div>
        </div>
      }
    >
      <AccountClient />
    </Suspense>
  );
}

