'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const AccountClient: React.FC = () => {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'orders' | 'wishlist' | 'profile') || 'orders';

  const {
    user,
    orders,
    login,
    loginAsDemoCustomer,
    loginAsDemoAdmin,
    logout,
    isAuthenticated,
    isAdmin,
  } = useAuth();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>(initialTab);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    login(emailInput);
  };

  // If not logged in, show luxury auth portal with 1-click test buttons
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#F8F5EF] border border-[#D9C7AA] p-8 shadow-xl">
          <div className="text-center mb-8">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium uppercase text-[#34251F] block">
              SHREEJI
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-[#B4975A] font-sans font-medium block">
              HANDICRAFT
            </span>
            <h2 className="font-serif text-xl text-[#34251F] mt-4">Patron Sign-In</h2>
            <p className="text-xs text-[#34251F]/70 mt-1">
              Access your order chronicles, certificates of origin & private collections.
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="p-4 bg-[#EDE5D9]/70 border border-[#D9C7AA] mb-6 space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A85D42] block">
              Instant 1-Click Access for Evaluation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoCustomer}
                className="px-3 py-2 bg-[#34251F] text-[#FAF8F5] hover:bg-[#1E1512] text-[11px] font-medium uppercase tracking-wider transition-colors text-center"
              >
                Patron Demo
              </button>
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="px-3 py-2 bg-[#B4975A] text-[#FAF8F5] hover:bg-[#A85D42] text-[11px] font-medium uppercase tracking-wider transition-colors text-center"
              >
                Admin Console
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="patron@domain.com"
                className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#34251F] mb-1">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:outline-none focus:border-[#B4975A]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow"
            >
              Sign In to Atelier
            </button>
          </form>

          <p className="text-center text-[11px] text-[#34251F]/60 mt-6">
            New patron? Enter your email above to automatically initialize your account profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patron Circle</span>
              {isAdmin && (
                <span className="bg-[#A85D42] text-white px-2 py-0.5 rounded-full text-[9px]">
                  Store Curator / Admin
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#34251F] mt-1">
              Namaste, {user?.name}
            </h1>
            <p className="text-xs text-[#34251F]/70 mt-0.5">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Go to Admin Dashboard</span>
              </Link>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 bg-transparent border border-[#D9C7AA] hover:bg-[#EDE5D9] text-[#34251F] text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D9C7AA]/50 gap-8 mb-8 overflow-x-auto text-xs font-semibold tracking-wider uppercase">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3.5 transition-colors relative flex items-center gap-2 shrink-0 ${
              activeTab === 'orders' ? 'text-[#A85D42]' : 'text-[#34251F]/60 hover:text-[#34251F]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3.5 transition-colors relative flex items-center gap-2 shrink-0 ${
              activeTab === 'wishlist' ? 'text-[#A85D42]' : 'text-[#34251F]/60 hover:text-[#34251F]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist.length})</span>
            {activeTab === 'wishlist' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3.5 transition-colors relative flex items-center gap-2 shrink-0 ${
              activeTab === 'profile' ? 'text-[#A85D42]' : 'text-[#34251F]/60 hover:text-[#34251F]'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile & Addresses</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85D42]" />
            )}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-[#F8F5EF] border border-[#D9C7AA]/40 p-8">
                <Package className="w-10 h-10 text-[#B4975A] mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#34251F]">No Orders Registered Yet</h3>
                <p className="text-xs text-[#34251F]/70 mt-1 max-w-sm mx-auto">
                  When you acquire a handcrafted masterwork from Shreeji, its tracking dossier will appear here.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-block px-6 py-2.5 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#F8F5EF] border border-[#D9C7AA]/60 p-6 sm:p-8 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9C7AA]/40 pb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-[#A85D42]">
                        Order #{order.orderNumber}
                      </span>
                      <p className="text-xs text-[#34251F]/70 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-3 py-1 font-semibold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="font-serif font-bold text-base text-[#34251F]">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Bar */}
                  {order.trackingNumber && (
                    <div className="p-3 bg-[#FAF8F5] border border-[#D9C7AA]/40 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#A85D42]" />
                        <span className="font-medium">{order.courierName}</span>
                        <span className="font-mono text-[11px] text-[#34251F]/70">
                          ({order.trackingNumber})
                        </span>
                      </div>
                      <span className="text-[#A85D42] font-semibold">
                        Estimated Arrival: {order.estimatedDelivery}
                      </span>
                    </div>
                  )}

                  {/* Items List */}
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

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-xs uppercase tracking-wider text-[#A85D42] hover:underline font-semibold"
                    >
                      View Full Acquisition Receipt & Certificate →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="text-center py-20 bg-[#F8F5EF] border border-[#D9C7AA]/40 p-8">
                <Heart className="w-10 h-10 text-[#B4975A] mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#34251F]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#34251F]/70 mt-1 max-w-sm mx-auto">
                  Click the heart icon on any brass, wood, or painting masterwork to bookmark it for later reflection.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-block px-6 py-2.5 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#F8F5EF] border border-[#D9C7AA]/60 p-8 space-y-6">
            <h3 className="font-serif text-xl font-semibold text-[#34251F] border-b border-[#D9C7AA]/40 pb-3">
              Patron Profile Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#34251F]/60 block uppercase tracking-wider text-[10px]">
                  Full Name
                </span>
                <span className="font-medium text-sm text-[#34251F]">{user?.name}</span>
              </div>
              <div>
                <span className="text-[#34251F]/60 block uppercase tracking-wider text-[10px]">
                  Email
                </span>
                <span className="font-medium text-sm text-[#34251F]">{user?.email}</span>
              </div>
              <div>
                <span className="text-[#34251F]/60 block uppercase tracking-wider text-[10px]">
                  Phone
                </span>
                <span className="font-medium text-sm text-[#34251F]">{user?.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[#34251F]/60 block uppercase tracking-wider text-[10px]">
                  Patron Tier
                </span>
                <span className="font-medium text-sm text-[#B4975A]">Heritage Royal Collector</span>
              </div>
            </div>

            {user?.addresses && user.addresses.length > 0 && (
              <div className="pt-4 border-t border-[#D9C7AA]/40">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#A85D42] block mb-2">
                  Saved Delivery Address
                </span>
                <p className="text-xs text-[#34251F] leading-relaxed p-3 bg-[#FAF8F5] border border-[#D9C7AA]/50">
                  {user.addresses[0].fullName} ({user.addresses[0].phone})
                  <br />
                  {user.addresses[0].street}
                  <br />
                  {user.addresses[0].city}, {user.addresses[0].state} — {user.addresses[0].pincode}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

