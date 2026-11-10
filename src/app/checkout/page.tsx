'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderItem, ShippingAddress } from '@/types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discount,
    appliedCoupon,
    shippingFee,
    total,
    clearCart,
  } = useCart();
  const { user, addOrder, updateUserAddress } = useAuth();

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.addresses?.[0]?.fullName || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    apartment: user?.addresses?.[0]?.apartment || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Maharashtra',
    pincode: user?.addresses?.[0]?.pincode || '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'COD' | 'UPI' | 'NetBanking'>('Razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#F8F5EF] border border-[#D9C7AA] p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#34251F]">Your Bag is Empty</h2>
          <p className="text-xs text-[#34251F]/70 leading-relaxed">
            Please select at least one handcrafted heirloom before proceeding to royal checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.pincode
    ) {
      setErrorMessage('Please complete all mandatory shipping address fields.');
      return;
    }

    if (formData.pincode.trim().length !== 6) {
      setErrorMessage('Please provide a valid 6-digit Indian PIN code.');
      return;
    }

    setIsProcessing(true);

    // Save address to user context
    updateUserAddress(formData);

    const orderNumber = `SH-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      selectedVariant: item.selectedVariant,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      paymentMethod,
      items: orderItems,
      shippingAddress: formData,
      subtotal,
      discount,
      shippingFee,
      total,
      couponCode: appliedCoupon?.code,
      trackingNumber: `DELHIVERY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courierName: 'Delhivery Insured Royal Transit',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-IN',
        { weekday: 'long', month: 'short', day: 'numeric' }
      ),
    };

    // Simulate payment / gateway confirmation
    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#B4975A', '#A85D42', '#D9C7AA'],
        });
      } catch {
        // ignore
      }

      router.push(`/order-confirmation/${newOrder.id}`);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#34251F]/70">
          <Link href="/shop" className="hover:text-[#A85D42] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#D9C7AA]" />
          <span className="text-[#34251F] font-semibold">Insured Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#D9C7AA]/40 pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold">
                    Step 1 of 2
                  </span>
                  <h2 className="font-serif text-2xl text-[#34251F]">
                    Shipping & Delivery Address
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#34251F]/60">
                  <Lock className="w-3.5 h-3.5 text-[#B4975A]" />
                  <span>256-bit Encrypted</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Maharaja Vikramaditya"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                    Email Address (for Transit Tracking & Invoice) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                    Street Address & House / Villa Number *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="e.g. 42 Heritage Manor, Royal Palms Avenue"
                    className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Kerala">Kerala</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={6}
                      placeholder="400001"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] font-mono focus:outline-none focus:border-[#B4975A]"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-6 sm:p-8">
              <div className="border-b border-[#D9C7AA]/40 pb-4 mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold">
                  Step 2 of 2
                </span>
                <h2 className="font-serif text-2xl text-[#34251F]">
                  Select Payment Mechanism
                </h2>
              </div>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'Razorpay'
                      ? 'border-[#A85D42] bg-[#FAF8F5] shadow-sm'
                      : 'border-[#D9C7AA]/60 bg-[#F8F5EF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={() => setPaymentMethod('Razorpay')}
                    className="mt-1 text-[#A85D42] focus:ring-[#A85D42]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-semibold text-sm text-[#34251F]">
                        Razorpay Secure Gateway (Recommended)
                      </span>
                      <span className="text-[10px] bg-[#34251F] text-[#FAF8F5] px-2 py-0.5 font-mono">
                        INSTANT
                      </span>
                    </div>
                    <p className="text-xs text-[#34251F]/70 mt-1">
                      UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking with instantaneous authorization.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#A85D42] bg-[#FAF8F5] shadow-sm'
                      : 'border-[#D9C7AA]/60 bg-[#F8F5EF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 text-[#A85D42] focus:ring-[#A85D42]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-semibold text-sm text-[#34251F]">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-[#EDE5D9] text-[#34251F] px-2 py-0.5">
                        VERIFIED DISPATCH
                      </span>
                    </div>
                    <p className="text-xs text-[#34251F]/70 mt-1">
                      Pay via Cash or UPI directly to the courier executive upon physical inspection of sealed wooden crating.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-6 sm:p-8 sticky top-24 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-[#34251F] border-b border-[#D9C7AA]/40 pb-3">
                Order Review ({items.length} creations)
              </h3>

              {/* Items Summary */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedVariant}`}
                    className="flex gap-3 text-xs"
                  >
                    <div className="w-14 h-16 bg-[#EDE5D9] relative overflow-hidden shrink-0 border border-[#D9C7AA]/40">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-semibold text-[#34251F] line-clamp-1">
                          {item.product.name}
                        </h4>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#A85D42]">
                            {item.selectedVariant}
                          </span>
                        )}
                        <span className="text-[#34251F]/60 block text-[11px]">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-[#34251F]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs border-t border-[#D9C7AA]/40 pt-4 text-[#34251F]/80">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-[#34251F]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Privilege Coupon ({appliedCoupon?.code})</span>
                    <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Crate Shipping</span>
                  <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `₹${shippingFee}`}</span>
                </div>

                <div className="border-t border-[#D9C7AA]/40 pt-3 flex justify-between text-base font-serif font-bold text-[#34251F]">
                  <span>Total Payable</span>
                  <span className="text-lg text-[#A85D42]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <div>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full bg-[#34251F] hover:bg-[#1E1512] disabled:opacity-60 text-[#FAF8F5] py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Authorizing Royal Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#B4975A]" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-[11px] text-[#34251F]/60 text-center">
                <p>
                  By confirming, you agree to Shreeji Handicraft&apos;s Terms of Service and Art Authenticity Guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

