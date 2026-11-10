'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Sparkles,
  MapPin,
  Check,
  ChevronRight,
  Share2,
} from 'lucide-react';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<Props> = ({ product, relatedProducts }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'provenance' | 'specs' | 'care' | 'shipping'>('provenance');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Track recently viewed in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shreeji_recently_viewed');
      let parsed: Product[] = stored ? JSON.parse(stored) : [];
      parsed = [product, ...parsed.filter((p) => p.id !== product.id)].slice(0, 4);
      localStorage.setItem('shreeji_recently_viewed', JSON.stringify(parsed));
      setRecentlyViewed(parsed.filter((p) => p.id !== product.id));
    } catch {
      // ignore
    }
  }, [product]);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      const date = new Date();
      date.setDate(date.getDate() + 4);
      setPincodeStatus(
        `✓ Serviceable! Estimated Royal Delivery by ${date.toLocaleDateString('en-IN', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })} via Insured Express.`
      );
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-xs text-[#34251F]/70 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#A85D42] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#D9C7AA]" />
        <Link href="/shop" className="hover:text-[#A85D42] transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3 h-3 text-[#D9C7AA]" />
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#A85D42] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#D9C7AA]" />
        <span className="text-[#34251F] font-medium line-clamp-1">{product.name}</span>
      </div>

      {/* Main Product Presentation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Gallery Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 border overflow-hidden transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#B4975A] ring-2 ring-[#B4975A]/60'
                        : 'border-[#D9C7AA]/50 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Primary Zoom Image */}
            <div className="flex-1 bg-[#F8F5EF] border border-[#D9C7AA]/60 relative aspect-[4/5] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 cursor-crosshair"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isHeritage && (
                  <span className="bg-[#B4975A] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold">
                    Royal Heritage
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-[#A85D42] text-[#FAF8F5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-semibold">
                    {discountPercent}% Privilege
                  </span>
                )}
              </div>

              {/* Share & Wishlist in gallery */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full shadow-md transition-all ${
                    inWishlist
                      ? 'bg-[#A85D42] text-white'
                      : 'bg-[#FAF8F5]/90 text-[#34251F] hover:bg-[#34251F] hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-[#FAF8F5]/90 text-[#34251F] hover:bg-[#34251F] hover:text-white shadow-md transition-all"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {isCopied && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#34251F] text-[#FAF8F5] text-xs px-3 py-1.5 rounded shadow">
                  Product Link Copied to Clipboard
                </div>
              )}
            </div>
          </div>

          {/* Details & Commerce Action Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Provenance Pill */}
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#A85D42] font-semibold">
                <span>{product.category}</span>
                <span>•</span>
                <span className="text-[#B4975A]">{product.artisanProvenance}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#34251F] mt-2 leading-[1.18]">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#34251F]/70 mt-1 font-light italic">
                {product.subtitle}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex text-[#B4975A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#34251F]/80">
                  {product.rating} Rating ({product.reviewCount} Connoisseur Reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-[#D9C7AA]/40">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#34251F]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-base text-[#34251F]/50 line-through">
                    ₹{product.originalPrice!.toLocaleString('en-IN')}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs uppercase tracking-wider text-[#A85D42] font-semibold">
                    (Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')})
                  </span>
                )}
                <span className="text-[11px] text-[#34251F]/60 ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Brief Description */}
              <p className="text-xs sm:text-sm text-[#34251F]/80 mt-4 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#34251F] flex justify-between">
                    <span>{product.variants[0].name}</span>
                    <span className="text-[#A85D42] font-normal">{selectedVariant}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-4 py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                          selectedVariant === opt
                            ? 'bg-[#34251F] text-[#FAF8F5] border-[#34251F] shadow'
                            : 'bg-[#F8F5EF] text-[#34251F] border-[#D9C7AA] hover:border-[#34251F]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Warning */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#34251F]">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#D9C7AA] bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-[#EDE5D9] text-[#34251F]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold text-[#34251F]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 hover:bg-[#EDE5D9] text-[#34251F]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  {product.stock <= 5 ? (
                    <span className="text-xs text-[#A85D42] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Only {product.stock} items remaining
                    </span>
                  ) : (
                    <span className="text-xs text-green-700 font-medium">
                      ✓ In Stock & Ready to Ship
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B4975A]" />
                  <span>Add to Heirloom Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Acquire Now (Direct Checkout)</span>
                </button>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="mt-8 p-4 bg-[#F8F5EF] border border-[#D9C7AA]/50 space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#34251F] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A85D42]" />
                  Check Royal Express Delivery
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-[#FAF8F5] border border-[#D9C7AA] text-xs px-3 py-2 font-mono focus:outline-none focus:border-[#B4975A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#1E1512]"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p
                    className={`text-xs mt-1 ${
                      pincodeStatus.startsWith('✓') ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Reassurance Badges */}
              <div className="mt-8 grid grid-cols-3 gap-3 text-center border-t border-[#D9C7AA]/40 pt-6">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#B4975A]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#34251F]/80">
                    Insured Wooden Crate
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#B4975A]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#34251F]/80">
                    Artisan Provenance
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#B4975A]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#34251F]/80">
                    7-Day Concierge Return
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Craft Dossier & Specifications */}
        <div className="mt-20 pt-10 border-t border-[#D9C7AA]/50">
          <div className="flex border-b border-[#D9C7AA]/40 gap-6 sm:gap-10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('provenance')}
              className={`pb-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors relative shrink-0 ${
                activeTab === 'provenance'
                  ? 'text-[#A85D42]'
                  : 'text-[#34251F]/60 hover:text-[#34251F]'
              }`}
            >
              Artisan Story & Provenance
              {activeTab === 'provenance' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors relative shrink-0 ${
                activeTab === 'specs'
                  ? 'text-[#A85D42]'
                  : 'text-[#34251F]/60 hover:text-[#34251F]'
              }`}
            >
              Material & Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`pb-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors relative shrink-0 ${
                activeTab === 'care'
                  ? 'text-[#A85D42]'
                  : 'text-[#34251F]/60 hover:text-[#34251F]'
              }`}
            >
              Heirloom Preservation Care
              {activeTab === 'care' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors relative shrink-0 ${
                activeTab === 'shipping'
                  ? 'text-[#A85D42]'
                  : 'text-[#34251F]/60 hover:text-[#34251F]'
              }`}
            >
              Packaging & Royal Transit
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
              )}
            </button>
          </div>

          <div className="py-8 max-w-4xl text-sm leading-relaxed text-[#34251F]/85 font-light">
            {activeTab === 'provenance' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-medium text-[#34251F]">
                  The Ancestral Lineage of {product.name}
                </h4>
                <p>{product.story}</p>
                <div className="p-4 bg-[#F8F5EF] border border-[#D9C7AA] mt-4 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#B4975A] shrink-0" />
                  <span className="text-xs">
                    Each creation comes stamped with an individual master smith serial number and
                    a wax-sealed certificate of origin from {product.artisanProvenance}.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F8F5EF] border border-[#D9C7AA]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#A85D42] font-semibold block">
                      Dimensions
                    </span>
                    <span className="font-medium text-xs text-[#34251F]">{product.dimensions}</span>
                  </div>
                  <div className="p-3 bg-[#F8F5EF] border border-[#D9C7AA]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#A85D42] font-semibold block">
                      Net Weight
                    </span>
                    <span className="font-medium text-xs text-[#34251F]">{product.weight}</span>
                  </div>
                  <div className="p-3 bg-[#F8F5EF] border border-[#D9C7AA]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#A85D42] font-semibold block">
                      Primary Material
                    </span>
                    <span className="font-medium text-xs text-[#34251F]">{product.material}</span>
                  </div>
                  <div className="p-3 bg-[#F8F5EF] border border-[#D9C7AA]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#A85D42] font-semibold block">
                      Regional GI Provenance
                    </span>
                    <span className="font-medium text-xs text-[#34251F]">
                      {product.artisanProvenance}
                    </span>
                  </div>
                </div>

                {product.specifications && (
                  <div className="mt-4 border border-[#D9C7AA]/40 overflow-hidden">
                    {product.specifications.map((spec, i) => (
                      <div
                        key={i}
                        className={`flex justify-between p-3 text-xs ${
                          i % 2 === 0 ? 'bg-[#F8F5EF]' : 'bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="text-[#34251F]/70">{spec.label}</span>
                        <span className="font-medium text-[#34251F]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg text-[#34251F]">Preserving Living Patina</h4>
                <p>
                  Natural bronze, brass, and wood breathe with the moisture and climate of your
                  sanctuary. To maintain the authentic luster:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#34251F]/80">
                  <li>Dust gently with a clean dry microfiber cloth once a week.</li>
                  <li>
                    Avoid industrial acidic detergents or synthetic metal polish sprays which strip
                    the protective wax barrier.
                  </li>
                  <li>
                    For bronze and brass, rub gently with a dab of natural pitambari or tamarind
                    water once a year, followed immediately by thorough drying.
                  </li>
                  <li>Keep wooden jharokhas away from excessive direct rainwater dampness.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg text-[#34251F]">Royal Transit & Insurance</h4>
                <p>
                  Every fragile sculpture and artwork is packed inside multi-layered shock-absorbent
                  foam, velvet fabric wrapping, and reinforced wooden crating to guarantee zero
                  in-transit vibration damage.
                </p>
                <p className="text-xs">
                  All shipments are 100% comprehensively insured with real-time GPS tracking sent to
                  your phone and email.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#D9C7AA]/40">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold block mb-1">
                  Complementary Heirlooms
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#34251F]">
                  You May Also Admire
                </h3>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs uppercase tracking-wider text-[#A85D42] hover:underline font-semibold"
              >
                View Collection →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#D9C7AA]/40">
            <h3 className="font-serif text-xl sm:text-2xl text-[#34251F] mb-8">
              Recently Viewed Masterworks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((rv) => (
                <ProductCard key={rv.id} product={rv} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

