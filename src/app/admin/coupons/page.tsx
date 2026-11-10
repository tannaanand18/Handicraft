'use client';

import React, { useState } from 'react';
import { INITIAL_COUPONS } from '@/data/content';
import { Coupon } from '@/types';
import { Tag, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState(3000);
  const [newDesc, setNewDesc] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const coupon: Coupon = {
      id: `c-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newDiscount),
      minOrderAmount: Number(newMinOrder),
      expiresAt: '2028-12-31',
      isActive: true,
      description: newDesc || `${newDiscount}% privilege discount`,
    };

    setCoupons([coupon, ...coupons]);
    setNewCode('');
    setNewDesc('');
  };

  const handleToggle = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Title */}
      <div className="border-b border-[#34251F] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B4975A] font-mono block">
          Patron Privileges
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
          Promotional Coupon Management
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Coupon Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5] border-b border-[#34251F] pb-3">
            Issue New Promotional Code
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                Coupon Code *
              </label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. DIWALI25"
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono uppercase focus:border-[#B4975A] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Discount (%) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(Number(e.target.value))}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Min Cart Total (₹) *
                </label>
                <input
                  type="number"
                  value={newMinOrder}
                  onChange={(e) => setNewMinOrder(Number(e.target.value))}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                Description / Benefit
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. 15% off festive bronze creations"
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] py-2.5 uppercase tracking-wider font-semibold transition-colors shadow"
            >
              Activate Coupon
            </button>
          </form>
        </div>

        {/* Existing Coupons Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5] border-b border-[#34251F] pb-3">
            Active Store Coupons
          </h3>

          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="p-4 bg-[#1E1512] border border-[#34251F] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#FAF8F5] bg-[#34251F] px-2 py-0.5 border border-[#4A372E]">
                      {coupon.code}
                    </span>
                    <span className="text-xs text-green-400 font-semibold">
                      {coupon.discountValue}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#D9C7AA]/70 mt-1">{coupon.description}</p>
                  <span className="text-[10px] text-[#EDE5D9]/50 font-mono block mt-0.5">
                    Min Cart: ₹{coupon.minOrderAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(coupon.id)}
                    className={`text-[10px] uppercase font-mono px-2 py-1 font-semibold transition-colors ${
                      coupon.isActive
                        ? 'bg-green-900/60 text-green-300'
                        : 'bg-red-900/60 text-red-300'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Disabled'}
                  </button>

                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="p-1.5 text-red-400 hover:text-white hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

