'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    isCartOpen,
    closeCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#D9C7AA]">
          {/* Header */}
          <div className="p-5 border-b border-[#D9C7AA]/40 flex items-center justify-between bg-[#F8F5EF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#A85D42]" />
              <h3 className="font-serif text-lg tracking-wider font-semibold text-[#34251F]">
                Your Heirloom Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-[#34251F] hover:text-[#A85D42] transition-colors focus:outline-none"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="px-5 py-3 bg-[#EDE5D9]/60 border-b border-[#D9C7AA]/40 text-xs">
            {freeShippingRemaining > 0 ? (
              <div>
                <p className="text-[#34251F] font-medium flex items-center justify-between mb-1.5">
                  <span>Add ₹{freeShippingRemaining.toLocaleString('en-IN')} for complimentary shipping</span>
                  <span className="font-semibold text-[#A85D42]">{shippingProgress}%</span>
                </p>
                <div className="w-full bg-[#D9C7AA]/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#A85D42] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#8C4730] font-medium">
                <Sparkles className="w-4 h-4 text-[#B4975A]" />
                <span>You have unlocked complimentary insured royal delivery!</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EDE5D9] flex items-center justify-center mx-auto text-[#B4975A]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#34251F]">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#34251F]/70 max-w-xs mx-auto leading-relaxed">
                  Discover heirloom handcrafted creations poured in bronze, carved from teakwood,
                  and painted with mineral pigments.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-block bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] px-6 py-2.5 text-xs uppercase tracking-widest transition-colors font-medium"
                  >
                    Explore Collections
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant || 'default'}`}
                  className="flex gap-4 pb-4 border-b border-[#D9C7AA]/30"
                >
                  <div className="w-20 h-24 bg-[#EDE5D9] relative overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-semibold text-[#34251F] hover:text-[#A85D42] line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedVariant)}
                          className="text-[#34251F]/50 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-[#A85D42] mt-0.5">
                          {item.selectedVariant}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-[#34251F] mt-1">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D9C7AA] bg-[#FAF8F5]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant
                            )
                          }
                          className="p-1 hover:bg-[#EDE5D9] text-[#34251F] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#34251F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant
                            )
                          }
                          className="p-1 hover:bg-[#EDE5D9] text-[#34251F] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#34251F]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-[#F8F5EF] border-t border-[#D9C7AA]/40 space-y-3.5">
              {/* Coupon Accordion */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#EDE5D9] px-3 py-2 text-xs border border-[#D9C7AA]">
                    <div className="flex items-center gap-1.5 text-[#34251F]">
                      <Tag className="w-3.5 h-3.5 text-[#A85D42]" />
                      <span className="font-mono font-bold">{appliedCoupon.code}</span>
                      <span className="text-green-700">(-₹{discount.toLocaleString('en-IN')})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. HERITAGE10)"
                      className="flex-1 bg-[#FAF8F5] border border-[#D9C7AA] text-xs px-3 py-2 uppercase font-mono placeholder:text-gray-400 placeholder:normal-case focus:outline-none focus:border-[#B4975A]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider hover:bg-[#1E1512] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-green-700 mt-1">{couponSuccess}</p>}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-[#34251F]/80 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#34251F]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Voucher Discount</span>
                    <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Packaging & Transit</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `₹${shippingFee}`}</span>
                </div>
                <div className="border-t border-[#D9C7AA]/40 pt-2 flex justify-between text-sm font-semibold text-[#34251F]">
                  <span>Total Amount</span>
                  <span className="text-base font-serif text-[#A85D42]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] py-3 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>Proceed to Royal Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#34251F]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B4975A]" />
                  <span>256-Bit SSL Encrypted Indian Gateway</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

