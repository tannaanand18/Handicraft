import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/context/Providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/layout/QuickViewModal';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { SearchModal } from '@/components/layout/SearchModal';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SHREEJI HANDICRAFT — Luxury Indian Craftsmanship & Heirlooms',
    template: '%s | SHREEJI HANDICRAFT',
  },
  description:
    'Discover authentic Indian handicraft treasures, handcrafted bell brass, ornate teakwood jharokhas, Pichwai paintings, and royal home decor. Where tradition meets timeless art.',
  keywords: [
    'Indian handicrafts',
    'luxury home decor',
    'brass urli',
    'dhokra art',
    'pichwai painting',
    'teakwood jharokha',
    'shreeji handicraft',
    'handcrafted gifts',
    'heritage craft India',
  ],
  authors: [{ name: 'Shreeji Handicraft' }],
  creator: 'Shreeji Handicraft',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shreejihandicraft.com',
    siteName: 'SHREEJI HANDICRAFT',
    title: 'SHREEJI HANDICRAFT — Where Tradition Meets Timeless Art',
    description:
      'Curated heirlooms of authentic Indian heritage. Master metallurgy, hand-carved woods, and devotional art for discerning sanctuaries worldwide.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Shreeji Handicraft Luxury Brass Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHREEJI HANDICRAFT — Luxury Indian Craftsmanship',
    description: 'Authentic Indian handicrafts, timeless metallurgy, and curated heirlooms.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#34251F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8F5EF] text-[#34251F] font-sans antialiased selection:bg-[#D9C7AA] selection:text-[#1E1512] flex flex-col">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
