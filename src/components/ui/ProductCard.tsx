'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variants?.[0]?.options[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Flip */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE5D9]/70 border border-[#D9C7AA]/40">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary image for hover reveal */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-[#34251F] text-[#FAF8F5] text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium">
              Best Seller
            </span>
          )}
          {product.isHeritage && (
            <span className="bg-[#B4975A] text-[#FAF8F5] text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium">
              Heritage
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#A85D42] text-[#FAF8F5] text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 font-medium">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Stock status indicator */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="bg-[#FAF8F5]/90 backdrop-blur-sm text-[#A85D42] text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 border border-[#D9C7AA]/50">
              Only {product.stock} Left
            </span>
          </div>
        )}

        {/* Quick Action Floating Bar on Hover */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 transition-opacity duration-300">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist
                ? 'bg-[#A85D42] text-white shadow-md'
                : 'bg-[#FAF8F5]/90 text-[#34251F] hover:bg-[#34251F] hover:text-white shadow-sm'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-[#FAF8F5]/90 text-[#34251F] hover:bg-[#34251F] hover:text-white flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Quick View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add Button Slide Up */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#FAF8F5] hover:bg-[#34251F] text-[#34251F] hover:text-[#FAF8F5] py-2 px-3 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors shadow flex items-center justify-center gap-1.5"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B4975A]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Meta Content */}
      <div className="pt-3.5 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#A85D42] font-semibold mb-1">
          {product.category}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="font-serif text-sm sm:text-base font-semibold text-[#34251F] hover:text-[#A85D42] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        <p className="text-[11px] text-[#34251F]/70 line-clamp-1 mt-0.5">
          {product.artisanProvenance}
        </p>

        {/* Price Row */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif font-bold text-sm sm:text-base text-[#34251F]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#34251F]/40 line-through">
              ₹{product.originalPrice!.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

