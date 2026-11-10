'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  MapPin,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';

interface Props {
  orderId: string;
}

export const ConfirmationClient: React.FC<Props> = ({ orderId }) => {
  const { orders } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setOrder(found);
    }
  }, [orders, orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#F8F5EF] border border-[#D9C7AA] p-8 text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-[#A85D42] mx-auto" />
          <h2 className="font-serif text-2xl text-[#34251F]">Acquisition Registered</h2>
          <p className="text-xs text-[#34251F]/70">
            Your heirloom order reference is being dispatched to the artisan packing guild.
          </p>
          <Link
            href="/account"
            className="inline-block px-6 py-2.5 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium"
          >
            View Account & Orders
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-[#F8F5EF] border-2 border-[#B4975A]/60 p-8 sm:p-12 text-center shadow-lg mb-8">
          <div className="w-16 h-16 rounded-full bg-[#EDE5D9] flex items-center justify-center mx-auto text-[#A85D42] mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-1">
            Order Confirmed & Certified
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#34251F]">
            Thank You for Patronizing Our Heritage
          </h1>

          <p className="text-xs sm:text-sm text-[#34251F]/80 max-w-lg mx-auto mt-3 font-light leading-relaxed">
            Your masterwork acquisition order <span className="font-mono font-bold text-[#A85D42]">#{order.orderNumber}</span> has been logged. Our workshop is preparing your custom velvet-lined wooden crating.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#34251F]">
            <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D9C7AA]">
              Tracking ID: {order.trackingNumber}
            </span>
            <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D9C7AA]">
              Courier: {order.courierName}
            </span>
            <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D9C7AA]">
              Estimated Delivery: {order.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Order Details Receipt Card */}
        <div className="bg-[#FAF8F5] border border-[#D9C7AA] p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-[#D9C7AA]/40 pb-4">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#34251F]">
                Heirloom Acquisition Receipt
              </h3>
              <p className="text-[11px] text-[#34251F]/60">
                Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs text-[#34251F] hover:text-[#A85D42] border border-[#D9C7AA] px-3 py-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Items Table */}
          <div className="divide-y divide-[#D9C7AA]/30">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-[#EDE5D9] overflow-hidden shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-[#34251F]">
                      {item.productName}
                    </h4>
                    {item.selectedVariant && (
                      <span className="text-[11px] text-[#A85D42] block">
                        {item.selectedVariant}
                      </span>
                    )}
                    <span className="text-[#34251F]/60 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-semibold text-sm text-[#34251F]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-[#D9C7AA]/40 pt-4 space-y-2 text-xs text-[#34251F]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#34251F]">
                ₹{order.subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Promotional Voucher Discount</span>
                <span className="font-semibold">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Insured Transit</span>
              <span>{order.shippingFee === 0 ? 'COMPLIMENTARY' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="border-t border-[#D9C7AA]/40 pt-2 flex justify-between text-sm font-semibold text-[#34251F]">
              <span>Total Paid</span>
              <span className="text-base font-serif text-[#A85D42]">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-t border-[#D9C7AA]/40 pt-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A85D42] block mb-1">
              Destination Address
            </span>
            <p className="text-xs text-[#34251F] leading-relaxed">
              <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.phone})
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-6 py-3 bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
          >
            Continue Exploring Catalogue
          </Link>

          <Link
            href="/account"
            className="px-6 py-3 bg-transparent hover:bg-[#EDE5D9] text-[#34251F] border border-[#34251F] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
          >
            View in My Patron Account
          </Link>
        </div>
      </div>
    </div>
  );
};

