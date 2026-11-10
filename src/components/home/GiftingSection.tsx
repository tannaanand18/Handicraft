'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/content';
import { Gift, Package, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const GiftingSection: React.FC = () => {
  const { gifting } = SITE_CONFIG;

  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#34251F] text-[#FAF8F5] border border-[#D9C7AA]/50 shadow-2xl">
          {/* Background image & gradient */}
          <div className="absolute inset-0 z-0">
            <img
              src={gifting.bannerImage}
              alt="Luxury Indian Gifting Presentation"
              className="w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E1512] via-[#1E1512]/90 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5]/10 border border-[#B4975A]/40 rounded-full text-[10px] uppercase tracking-[0.25em] text-[#D9C7AA] mb-4">
              <Gift className="w-3.5 h-3.5 text-[#B4975A]" />
              <span>Royal Gifting Suite</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#FAF8F5]">
              {gifting.title}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#EDE5D9]/85 leading-relaxed font-light">
              {gifting.subtitle}
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B4975A]/20 flex items-center justify-center text-[#B4975A] shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-xs text-[#FAF8F5]">
                  Velvet-Lined Heirloom Wooden Boxes
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B4975A]/20 flex items-center justify-center text-[#B4975A] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs text-[#FAF8F5]">
                  Handwritten Calligraphy Gift Scrolls
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop?category=Handmade+Gifts"
                className="px-8 py-3.5 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>{gifting.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact?type=corporate-gifting"
                className="px-6 py-3.5 border border-[#D9C7AA]/60 hover:bg-[#FAF8F5]/10 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center"
              >
                Corporate & Festive Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

