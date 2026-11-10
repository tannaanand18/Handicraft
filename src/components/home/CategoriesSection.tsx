'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D9C7AA]/40 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
              Curated Masterworks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F]">
              Shop by Craft & Medium
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#34251F]/70 max-w-md font-light leading-relaxed">
            Each category celebrates a distinct ancestral discipline—from the fiery foundry of Swamimalai to the silent marble studios of Agra.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#34251F] border border-[#D9C7AA]/40 block"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 group-hover:opacity-75 opacity-90"
                loading="lazy"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1512]/90 via-[#1E1512]/30 to-transparent" />

              {/* Top Meta info */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#FAF8F5]/80 backdrop-blur-sm flex items-center justify-center text-[#34251F] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-[#FAF8F5] transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9C7AA] font-mono block mb-1">
                  {category.itemCount} Heirloom Pieces
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
                  {category.name}
                </h3>
                <p className="text-xs text-[#FAF8F5]/70 line-clamp-1 mt-1 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

