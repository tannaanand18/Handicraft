'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { X, Heart, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!selectedProduct) return null;

  const currentVariant =
    selectedVariant || (selectedProduct.variants?.[0]?.options[0] ?? '');
  const inWishlist = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addItem(selectedProduct, quantity, currentVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden bg-[#FAF8F5] text-left shadow-2xl transition-all border border-[#D9C7AA]">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 text-[#34251F] hover:text-[#A85D42] bg-[#FAF8F5]/80 rounded-full focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#F8F5EF] flex flex-col justify-between">
              <div className="aspect-square w-full relative overflow-hidden bg-[#EDE5D9] border border-[#D9C7AA]/40 mb-3">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 border relative overflow-hidden transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#B4975A] ring-1 ring-[#B4975A]'
                          : 'border-[#D9C7AA]/50 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#A85D42] font-semibold tracking-wider uppercase mb-1">
                  <span>{selectedProduct.category}</span>
                  <span>•</span>
                  <span>{selectedProduct.artisanProvenance}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#34251F] leading-snug">
                  {selectedProduct.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#B4975A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#34251F]/70">
                    {selectedProduct.rating} ({selectedProduct.reviewCount} connoisseur reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-xl font-serif font-bold text-[#34251F]">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-[#34251F]/50 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {selectedProduct.originalPrice && (
                    <span className="text-[11px] font-semibold text-[#A85D42] uppercase tracking-wider">
                      Save{' '}
                      {Math.round(
                        ((selectedProduct.originalPrice - selectedProduct.price) /
                          selectedProduct.originalPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#34251F]/80 mt-3 leading-relaxed line-clamp-3">
                  {selectedProduct.description}
                </p>

                {/* Variants if present */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#34251F] block">
                      {selectedProduct.variants[0].name}: {currentVariant}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.variants[0].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariant(opt)}
                          className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                            currentVariant === opt
                              ? 'bg-[#34251F] text-[#FAF8F5] border-[#34251F]'
                              : 'bg-transparent text-[#34251F] border-[#D9C7AA] hover:border-[#34251F]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] py-3 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-[#B4975A]" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Heirloom Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-3 border transition-colors ${
                      inWishlist
                        ? 'border-[#A85D42] text-[#A85D42] bg-[#A85D42]/10'
                        : 'border-[#D9C7AA] text-[#34251F] hover:border-[#34251F]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/products/${selectedProduct.slug}`}
                    onClick={closeQuickView}
                    className="inline-flex items-center gap-1.5 text-xs text-[#A85D42] hover:text-[#8C4730] font-medium uppercase tracking-wider"
                  >
                    <span>View Complete Craft Dossier & Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

