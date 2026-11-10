'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/content';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  const { craftsmanship } = SITE_CONFIG;

  return (
    <section className="py-28 bg-[#EDE5D9]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Staggered Image Composition Column */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden bg-[#34251F] border border-[#D9C7AA]/60 shadow-lg">
                  <img
                    src={craftsmanship.images.main}
                    alt="Swamimalai Brass Casting"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-[#D9C7AA]/50 text-center">
                  <span className="font-serif text-2xl font-bold text-[#A85D42]">16 Days</span>
                  <p className="text-[10px] uppercase tracking-wider text-[#34251F]/70 mt-0.5">
                    Average manual chisel & firing time per piece
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-10">
                <div className="aspect-square overflow-hidden bg-[#34251F] border border-[#D9C7AA]/60 shadow-lg">
                  <img
                    src={craftsmanship.images.secondary}
                    alt="Wood Carving in Udaipur"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-[#34251F] border border-[#D9C7AA]/60 shadow-lg">
                  <img
                    src={craftsmanship.images.tertiary}
                    alt="Blue Pottery Artisan Painting"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Subtle decorative gold badge */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex w-24 h-24 rounded-full bg-[#34251F] text-[#B4975A] border-2 border-[#B4975A] items-center justify-center text-center p-2 shadow-2xl">
              <span className="font-serif text-[11px] uppercase tracking-widest font-semibold leading-tight">
                Authentic Craft
              </span>
            </div>
          </div>

          {/* Editorial Text Story Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{craftsmanship.eyebrow}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#34251F] leading-[1.15]">
              {craftsmanship.title}
            </h2>

            <p className="text-sm text-[#34251F]/80 leading-relaxed font-light">
              {craftsmanship.lead}
            </p>

            {/* Blockquote */}
            <div className="pl-5 border-l-2 border-[#B4975A] py-1 my-6">
              <p className="font-serif text-base italic text-[#34251F] leading-snug">
                {craftsmanship.quote}
              </p>
              <span className="text-[11px] uppercase tracking-widest text-[#A85D42] block mt-2 font-medium">
                {craftsmanship.quoteAuthor}
              </span>
            </div>

            <p className="text-xs text-[#34251F]/70 leading-relaxed">
              Unlike automated assembly plants, each of our master creations undergoes up to twelve
              meticulous stages: clay mould modeling, beeswax ribbon wrapping, open-pit firing,
              cold chasing with micro-chisels, and natural herbal buffing. When you acquire a piece
              from Shreeji Handicraft, you become the custodian of a living cultural lineage.
            </p>

            <div className="pt-4">
              <Link
                href="/story"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow"
              >
                <span>Read The Heritage Chronicle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

