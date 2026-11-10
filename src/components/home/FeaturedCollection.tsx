'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Brass and Metal Art', 'Wooden Handicrafts', 'Wall Decor', 'Traditional Indian Crafts'];

  const filteredProducts =
    activeTab === 'All'
      ? PRODUCTS.filter((p) => p.isFeatured || p.isHeritage).slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-24 bg-[#FAF8F5] border-y border-[#D9C7AA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Selected Heirlooms
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F]">
            The Curated Collection
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4 mb-8" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 font-medium ${
                  activeTab === tab
                    ? 'bg-[#34251F] text-[#FAF8F5] shadow-sm'
                    : 'bg-transparent text-[#34251F]/70 hover:text-[#34251F] border border-[#D9C7AA]/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#34251F] text-[#34251F] hover:text-[#FAF8F5] border border-[#34251F] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm"
          >
            <span>Explore All {PRODUCTS.length} Masterworks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

