'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-search-modal', handleOpen);
    return () => window.removeEventListener('open-search-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.artisanProvenance.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Brass Urli',
    'Pichwai Art',
    'Teakwood Mirror',
    'Dhokra Bronze',
    'Jaipur Pottery',
    'Sandalwood',
  ];

  const handleSelectKeyword = (kw: string) => {
    setQuery(kw);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-[#FAF8F5] shadow-2xl border border-[#D9C7AA] overflow-hidden">
          {/* Search Header */}
          <div className="p-6 border-b border-[#D9C7AA]/40 flex items-center gap-4 bg-[#F8F5EF]">
            <Search className="w-6 h-6 text-[#A85D42] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by craft, material, region, or piece..."
              className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#34251F] placeholder:text-[#34251F]/40 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs uppercase text-[#34251F]/60 hover:text-[#34251F]"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 text-[#34251F] hover:text-[#A85D42] rounded-full focus:outline-none"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Keywords */}
          <div className="px-6 py-3 bg-[#EDE5D9]/40 border-b border-[#D9C7AA]/30 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#34251F]/60 uppercase tracking-widest text-[10px] mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B4975A]" />
              Popular:
            </span>
            {popularSearches.map((kw) => (
              <button
                key={kw}
                onClick={() => handleSelectKeyword(kw)}
                className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D9C7AA] text-[#34251F] hover:border-[#34251F] transition-colors rounded-none"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="text-center py-12 text-[#34251F]/60">
                <p className="font-serif text-lg text-[#34251F]">
                  Search across 500+ years of Indian heritage crafts
                </p>
                <p className="text-xs mt-1">
                  Type to instantly browse Swamimalai brass, Bastar Dhokra, Udaipur woodwork, and Nathdwara art.
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 text-[#34251F]/70">
                <p className="font-serif text-lg">No heirlooms match &ldquo;{query}&rdquo;</p>
                <p className="text-xs mt-1">
                  Try searching for &ldquo;brass&rdquo;, &ldquo;teak&rdquo;, &ldquo;urli&rdquo;, or &ldquo;pottery&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-[#34251F]/70 border-b border-[#D9C7AA]/30 pb-2">
                  <span>Found {results.length} curated masterworks</span>
                  <Link
                    href={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={handleClose}
                    className="text-[#A85D42] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>View all in full catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleClose}
                      className="group flex gap-3 p-2 bg-[#F8F5EF] hover:bg-[#EDE5D9]/50 border border-transparent hover:border-[#D9C7AA] transition-all"
                    >
                      <div className="w-16 h-20 bg-[#EDE5D9] relative overflow-hidden shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#A85D42] font-semibold">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-[#34251F] group-hover:text-[#A85D42] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#34251F] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

