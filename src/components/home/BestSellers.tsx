'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Sparkles, Trophy } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D9C7AA]/40 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5 text-[#B4975A]" />
              <span>Patron Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F]">
              The Best Seller Vault
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/shop?sort=bestselling"
              className="text-xs uppercase tracking-[0.18em] text-[#A85D42] hover:text-[#8C4730] font-semibold transition-colors"
            >
              Browse All Best Sellers →
            </Link>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

