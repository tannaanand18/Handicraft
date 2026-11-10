'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/content';
import { CATEGORIES } from '@/data/categories';
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1E1512] text-[#EDE5D9] pt-20 pb-10 border-t border-[#34251F]">
      {/* Brand Values Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#34251F]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#34251F] text-[#B4975A] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#FAF8F5] tracking-wide">
                100% Certified Handcrafted
              </h4>
              <p className="text-xs text-[#D9C7AA]/70 mt-1 leading-relaxed">
                Directly commissioned from hereditary master artisans across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#34251F] text-[#B4975A] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#FAF8F5] tracking-wide">
                Insured Royal Transit
              </h4>
              <p className="text-xs text-[#D9C7AA]/70 mt-1 leading-relaxed">
                Complimentary shipping on orders above ₹2,999 with double-wall wooden crating.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#34251F] text-[#B4975A] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#FAF8F5] tracking-wide">
                7-Day Art Concierge Return
              </h4>
              <p className="text-xs text-[#D9C7AA]/70 mt-1 leading-relaxed">
                Hassle-free collection and replacement for total peace of mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#34251F] text-[#B4975A] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold text-[#FAF8F5] tracking-wide">
                Secure Indian Gateways
              </h4>
              <p className="text-xs text-[#D9C7AA]/70 mt-1 leading-relaxed">
                Razorpay, UPI, NetBanking and credit cards with 256-bit encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-medium uppercase text-[#FAF8F5]">
                SHREEJI
              </span>
              <span className="block text-[9px] uppercase tracking-[0.45em] text-[#B4975A] font-sans font-medium">
                HANDICRAFT
              </span>
            </div>
            <p className="text-xs text-[#D9C7AA]/80 leading-relaxed max-w-sm">
              Shreeji Handicraft is an Indian luxury artisanal house dedicated to the preservation
              and presentation of rare handicraft legacies. From hand-cast bell brass to royal
              teakwood architecture, we curate heirlooms for discerning collectors worldwide.
            </p>

            {/* Newsletter Sign Up */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#B4975A] font-semibold block mb-2">
                Join the Private Circle
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#D9C7AA] bg-[#34251F] p-3 border border-[#B4975A]/40">
                  <Check className="w-4 h-4 text-[#B4975A]" />
                  <span>Welcome to our patron circle. Your gift code will arrive shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-[#34251F] border border-[#4A372E] text-xs text-[#FAF8F5] px-3.5 py-2.5 flex-1 focus:outline-none focus:border-[#B4975A] placeholder-[#D9C7AA]/40"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={SITE_CONFIG.contact.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#4A372E] flex items-center justify-center text-[#D9C7AA] hover:text-[#FAF8F5] hover:border-[#B4975A] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#4A372E] flex items-center justify-center text-[#D9C7AA] hover:text-[#FAF8F5] hover:border-[#B4975A] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Curated Portfolios */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#D9C7AA]/80">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="text-[#B4975A] hover:underline font-medium">
                  View Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase mb-4">
              Client Support
            </h5>
            <ul className="space-y-2.5 text-xs text-[#D9C7AA]/80">
              <li>
                <Link href="/story" className="hover:text-[#FAF8F5] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF8F5] transition-colors">
                  Bespoke Inquiries
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#FAF8F5] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#FAF8F5] transition-colors">
                  Shipping & Handling
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#FAF8F5] transition-colors">
                  Returns & Art Guarantee
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FAF8F5] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FAF8F5] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact Information (Editable Placeholders) */}
          <div>
            <h5 className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5] uppercase mb-4">
              Atelier & Contact
            </h5>
            <p className="text-[11px] text-[#B4975A] uppercase tracking-wider mb-3">
              Official Inquiries
            </p>
            <ul className="space-y-3 text-xs text-[#D9C7AA]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B4975A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.contact.atelierAddress.line1}
                  <br />
                  {SITE_CONFIG.contact.atelierAddress.city},{' '}
                  {SITE_CONFIG.contact.atelierAddress.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span>{SITE_CONFIG.contact.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span>{SITE_CONFIG.contact.supportEmail}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B4975A] shrink-0" />
                <span className="text-[11px]">{SITE_CONFIG.contact.operatingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#34251F]/80 text-xs text-[#D9C7AA]/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} SHREEJI HANDICRAFT. All rights reserved. Handcrafted in India.</p>
        </div>

        {/* Accepted Payment Methods */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#D9C7AA]/50 uppercase tracking-widest mr-1">
            Secured By:
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 bg-[#34251F] text-[#FAF8F5] border border-[#4A372E]">
              RAZORPAY
            </span>
            <span className="px-2 py-0.5 bg-[#34251F] text-[#FAF8F5] border border-[#4A372E]">
              UPI
            </span>
            <span className="px-2 py-0.5 bg-[#34251F] text-[#FAF8F5] border border-[#4A372E]">
              VISA / MC
            </span>
            <span className="px-2 py-0.5 bg-[#34251F] text-[#FAF8F5] border border-[#4A372E]">
              RUPAY
            </span>
            <span className="px-2 py-0.5 bg-[#34251F] text-[#FAF8F5] border border-[#4A372E]">
              NETBANKING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

