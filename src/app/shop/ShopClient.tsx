'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  Grid3X3,
  Search,
} from 'lucide-react';

export const ShopClient: React.FC = () => {
  const searchParams = useSearchParams();

  // URL Query Parameters
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [onlyHeritage, setOnlyHeritage] = useState<boolean>(initialFilter === 'heritage');

  // Sync state if search params change
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search')!);
    }
    if (searchParams.get('filter') === 'heritage') {
      setOnlyHeritage(true);
    }
  }, [searchParams]);

  // Unique Materials
  const materials = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.material.includes('Brass')) list.add('Brass & Bronze');
      else if (p.material.includes('Teak') || p.material.includes('Wood')) list.add('Natural Wood');
      else if (p.material.includes('Marble')) list.add('Makrana Marble');
      else if (p.material.includes('Clay') || p.material.includes('Pottery')) list.add('Clay & Pottery');
      else if (p.material.includes('Cotton') || p.material.includes('Pigments')) list.add('Pigments & Khadi');
    });
    return ['All', ...Array.from(list)];
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'All') {
        if (selectedMaterial === 'Brass & Bronze' && !product.material.includes('Brass') && !product.material.includes('Bronze'))
          return false;
        if (selectedMaterial === 'Natural Wood' && !product.material.includes('Teak') && !product.material.includes('Wood') && !product.material.includes('Sandalwood'))
          return false;
        if (selectedMaterial === 'Makrana Marble' && !product.material.includes('Marble'))
          return false;
        if (selectedMaterial === 'Clay & Pottery' && !product.material.includes('Clay') && !product.material.includes('Pottery') && !product.material.includes('Quartz'))
          return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Heritage filter
      if (onlyHeritage && !product.isHeritage) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.artisanProvenance.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low-high') return a.price - b.price;
      if (selectedSort === 'price-high-low') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // default featured
    });
  }, [selectedCategory, selectedMaterial, priceRange, onlyHeritage, searchQuery, selectedSort]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setPriceRange(25000);
    setOnlyHeritage(false);
    setSearchQuery('');
    setSelectedSort('featured');
  };

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (onlyHeritage ? 1 : 0) +
    (priceRange < 25000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
          Living Traditions
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F]">
          The Curated Portfolio
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#34251F]/70 max-w-xl mx-auto font-light leading-relaxed">
          Each piece is individual, bearing the natural chisel marks and acoustic warmth of its master creator.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter & Sort Control Bar */}
        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="md:hidden w-full flex items-center justify-center gap-2 bg-[#34251F] text-[#FAF8F5] py-2.5 text-xs uppercase tracking-wider font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Search Box inside catalog */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#34251F]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by craft, town..."
              className="w-full bg-[#FAF8F5] border border-[#D9C7AA] pl-9 pr-3 py-2 text-xs text-[#34251F] placeholder:text-[#34251F]/40 focus:outline-none focus:border-[#B4975A]"
            />
          </div>

          {/* Product Count */}
          <div className="text-xs text-[#34251F]/70 font-mono hidden md:block">
            Showing {filteredProducts.length} of {PRODUCTS.length} curated masterworks
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-[#34251F]/60 uppercase tracking-wider hidden sm:inline">
              Sort by:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-[#FAF8F5] border border-[#D9C7AA] text-xs px-3 py-2 text-[#34251F] focus:outline-none focus:border-[#B4975A] cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="bestselling">Best Sellers First</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
            <span className="text-[#34251F]/60 uppercase tracking-wider text-[10px] mr-1">
              Active Filters:
            </span>
            {selectedCategory !== 'All' && (
              <span className="bg-[#EDE5D9] text-[#34251F] px-2.5 py-1 border border-[#D9C7AA] flex items-center gap-1.5">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            )}
            {selectedMaterial !== 'All' && (
              <span className="bg-[#EDE5D9] text-[#34251F] px-2.5 py-1 border border-[#D9C7AA] flex items-center gap-1.5">
                {selectedMaterial}
                <button onClick={() => setSelectedMaterial('All')}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            )}
            {onlyHeritage && (
              <span className="bg-[#B4975A] text-white px-2.5 py-1 flex items-center gap-1.5">
                Heritage Only
                <button onClick={() => setOnlyHeritage(false)}>
                  <X className="w-3 h-3 hover:text-white/80" />
                </button>
              </span>
            )}
            {priceRange < 25000 && (
              <span className="bg-[#EDE5D9] text-[#34251F] px-2.5 py-1 border border-[#D9C7AA] flex items-center gap-1.5">
                Under ₹{priceRange.toLocaleString('en-IN')}
                <button onClick={() => setPriceRange(25000)}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-[#EDE5D9] text-[#34251F] px-2.5 py-1 border border-[#D9C7AA] flex items-center gap-1.5">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-red-600" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#A85D42] hover:underline text-xs font-semibold ml-2"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Main Content: Sidebar Filters (desktop) + Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden md:block md:col-span-3 space-y-8 bg-[#F8F5EF] p-6 border border-[#D9C7AA]/40 h-fit">
            {/* Category Filter */}
            <div>
              <h4 className="font-serif text-sm font-semibold text-[#34251F] uppercase tracking-wider mb-4 pb-2 border-b border-[#D9C7AA]/40">
                Categories
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`text-left w-full transition-colors ${
                      selectedCategory === 'All'
                        ? 'text-[#A85D42] font-semibold'
                        : 'text-[#34251F]/70 hover:text-[#34251F]'
                    }`}
                  >
                    All Categories ({PRODUCTS.length})
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-left w-full transition-colors ${
                        selectedCategory === cat.name
                          ? 'text-[#A85D42] font-semibold'
                          : 'text-[#34251F]/70 hover:text-[#34251F]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material Filter */}
            <div>
              <h4 className="font-serif text-sm font-semibold text-[#34251F] uppercase tracking-wider mb-4 pb-2 border-b border-[#D9C7AA]/40">
                Primary Medium
              </h4>
              <ul className="space-y-2 text-xs">
                {materials.map((mat) => (
                  <li key={mat}>
                    <button
                      onClick={() => setSelectedMaterial(mat)}
                      className={`text-left w-full transition-colors ${
                        selectedMaterial === mat
                          ? 'text-[#A85D42] font-semibold'
                          : 'text-[#34251F]/70 hover:text-[#34251F]'
                      }`}
                    >
                      {mat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-serif text-sm font-semibold text-[#34251F] uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-mono font-semibold text-[#A85D42]">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={25000}
                step={500}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#A85D42] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#34251F]/50 mt-1">
                <span>₹3,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Heritage Toggle Checkbox */}
            <div className="pt-2 border-t border-[#D9C7AA]/40">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#34251F]">
                <input
                  type="checkbox"
                  checked={onlyHeritage}
                  onChange={(e) => setOnlyHeritage(e.target.checked)}
                  className="rounded text-[#A85D42] focus:ring-[#A85D42]"
                />
                <span className="font-medium">Heritage Collections Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-[#F8F5EF] border border-[#D9C7AA]/40 p-8">
                <p className="font-serif text-xl text-[#34251F]">
                  No handcrafted pieces match your exact criteria.
                </p>
                <p className="text-xs text-[#34251F]/70 mt-2">
                  Try adjusting the price range or clearing active filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

