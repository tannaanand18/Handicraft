import { Coupon, Testimonial } from '@/types';

export const SITE_CONFIG = {
  brandName: 'SHREEJI HANDICRAFT',
  tagline: 'Where Tradition Meets Timeless Art',
  subheading: 'Discover the beauty of Indian craftsmanship, thoughtfully created to bring artistry, culture and elegance into your everyday spaces.',
  announcements: [
    '✦ COMPLIMENTARY ROYAL SHIPPING ON ALL DOMESTIC ORDERS ABOVE ₹2,999 ✦',
    '✦ USE CODE "HERITAGE10" FOR 10% OFF YOUR CURATED HEIRLOOM PURCHASE ✦',
    '✦ EACH PIECE INDIVIDUALLY HANDCRAFTED BY MASTER INDIAN ARTISANS ✦',
  ],
  contact: {
    // Editable placeholders - no invented real data
    supportEmail: 'care@shreejihandicraft.com', // Placeholder for brand support
    supportPhone: '+91 (0) 00000 00000', // Editable placeholder
    whatsappNumber: '919876543210', // Configurable WhatsApp channel
    operatingHours: 'Monday – Saturday: 10:00 AM – 7:00 PM IST',
    atelierAddress: {
      line1: '[Studio Address Line 1 - Editable in Admin]',
      line2: '[Craft District / Region - Editable in Admin]',
      city: '[City Name - Editable in Admin]',
      state: '[State / Pin - Editable in Admin]',
      country: 'India',
    },
    socials: {
      instagram: 'https://instagram.com/shreejihandicraft',
      facebook: 'https://facebook.com/shreejihandicraft',
      pinterest: 'https://pinterest.com/shreejihandicraft',
    },
  },
  gifting: {
    title: 'The Art of Thoughtful Gifting',
    subtitle: 'From intimate personal milestones to distinguished corporate celebrations, bestow bespoke handcrafted treasures encased in royal velvet and brass-sealed packaging.',
    ctaText: 'Explore Gifting Concierge',
    bannerImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop',
  },
  craftsmanship: {
    eyebrow: 'TIMELESS INDIAN METALLURGY & WOODCRAFT',
    title: 'Poured in Fire. Chiseled by Hand. Cherished for Generations.',
    lead: 'Every Shreeji Handicraft creation begins in the generational workshops of India’s hereditary master craftspeople. From the ancient lost-wax casting of Bastar to the floral wood inlays of Mewar, we revive centuries of sacred artisanal mastery.',
    quote: '"A machine can replicate precision, but only the patient hands of an artisan can breathe soul into wood, clay, and molten bronze."',
    quoteAuthor: '— Sthapati Ramalingam, Swamimalai Master Metalsmith',
    images: {
      main: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1200&auto=format&fit=crop',
      secondary: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
      tertiary: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=1200&auto=format&fit=crop',
    },
  },
};

export const BRAND_VALUES = [
  {
    id: 'val-1',
    title: 'Authentic Craftsmanship',
    subtitle: '100% Handcrafted Legacy',
    description: 'Forged, sculpted, and painted entirely by hereditary Indian masters using techniques refined over hundreds of years.',
    icon: 'Hammer',
  },
  {
    id: 'val-2',
    title: 'Made with Passion',
    subtitle: 'Soul in Every Detail',
    description: 'We avoid mass-production lines. Every single curve, motif, and chisel mark is imbued with genuine human devotion.',
    icon: 'Sparkles',
  },
  {
    id: 'val-3',
    title: 'Timeless Designs',
    subtitle: 'Heritage Meets Modern Spaces',
    description: 'Bridging classic palace aesthetics with sleek contemporary architecture to bring tranquility into your modern sanctuary.',
    icon: 'Compass',
  },
  {
    id: 'val-4',
    title: 'Thoughtful Gifting',
    subtitle: 'Royal Heirloom Packaging',
    description: 'Presented in bespoke fabric-lined protective gift boxes with custom handwritten calligraphy cards upon request.',
    icon: 'Gift',
  },
];

// Sample testimonials clearly identified until genuine reviews are collected
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Aarav Mehta',
    location: 'Mumbai, Maharashtra',
    quote: 'The Mayur Brass Urli has become the defining centerpiece of our penthouse entrance. The weight, the hand-hammered patina, and the musical resonance of the chime bells speak volumes of pure luxury.',
    rating: 5,
    productPurchased: 'Mayur Royal Brass Urli with Bell Accents',
    verifiedBuyer: true,
  },
  {
    id: 't-2',
    author: 'Dr. Radhika Sen',
    location: 'New Delhi',
    quote: 'Finding authentic Bastar Dhokra of this museum caliber online was almost impossible until Shreeji Handicraft. The packaging arrived double-crated with complete provenance certificates.',
    rating: 5,
    productPurchased: 'Nandi Lost-Wax Dhokra Bronze Sculpture',
    verifiedBuyer: true,
  },
  {
    id: 't-3',
    author: 'Karan & Smita Singhania',
    location: 'Bengaluru, Karnataka',
    quote: 'We ordered the Royal Udaipur Jharokha Mirror for our anniversary. The intricate teakwood jaali and distressed finish look like they were commissioned directly from a palace courtyard.',
    rating: 5,
    productPurchased: 'Royal Udaipur Hand-Carved Teakwood Jharokha Mirror',
    verifiedBuyer: true,
  },
  {
    id: 't-4',
    author: 'Meera Chidambaram',
    location: 'Chennai, Tamil Nadu',
    quote: 'The Pietra Dura marble box is sheer Mughal poetry. The lapis lazuli and mother of pearl catch the morning sun in the most mesmerizing way.',
    rating: 5,
    productPurchased: 'Agra Pietra Dura Marble Inlay Keepsake Box',
    verifiedBuyer: true,
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'HERITAGE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 2500,
    expiresAt: '2027-12-31',
    isActive: true,
    description: '10% off your curated heirloom purchase',
  },
  {
    id: 'c-2',
    code: 'SHREEJI20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 10000,
    expiresAt: '2027-12-31',
    isActive: true,
    description: '20% off luxury orders above ₹10,000',
  },
  {
    id: 'c-3',
    code: 'ROYAL500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderAmount: 3000,
    expiresAt: '2027-12-31',
    isActive: true,
    description: 'Flat ₹500 off festive collections',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=800&auto=format&fit=crop',
    caption: 'Evening serenity with floating marigolds and cast brass.',
    likes: 428,
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    caption: 'Teakwood architectural carvings waiting for final beeswax polish.',
    likes: 612,
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=800&auto=format&fit=crop',
    caption: 'Cobalt strokes on Jaipur quartz clay before firing.',
    likes: 389,
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    caption: 'Gold leaf gilding on devotional Pichwai tapestries.',
    likes: 840,
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    caption: 'Agra Pietra Dura keepsake box nestled in bespoke velvet.',
    likes: 512,
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop',
    caption: 'A sanctuary styled with ancient bronze and handcrafted lighting.',
    likes: 924,
  },
];

