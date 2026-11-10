'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export const HeritageCollection: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#1E1512] text-[#FAF8F5] overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1800&auto=format&fit=crop"
          alt="Traditional Indian Tapestry Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1512] via-[#1E1512]/90 to-[#1E1512]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden bg-[#34251F] border-2 border-[#B4975A]/60 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=85&w=1200&auto=format&fit=crop"
                alt="Shreenathji Pichwai Masterpiece"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9C7AA] font-mono">
                  GI-Tagged Masterpiece
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] mt-1">
                  Nathdwara Pichwai & Swamimalai Bronze
                </h4>
              </div>
            </div>

            {/* Floating Provenance Emblem */}
            <div className="absolute -top-4 -right-4 sm:-right-8 bg-[#34251F] border border-[#B4975A] p-4 shadow-xl max-w-[200px] text-center hidden sm:block">
              <Flame className="w-5 h-5 text-[#B4975A] mx-auto mb-1" />
              <span className="font-serif text-xs text-[#FAF8F5] block font-semibold">
                Lost-Wax Metallurgy
              </span>
              <span className="text-[10px] text-[#D9C7AA]/70 block mt-0.5">
                Casting methods dating back to 2,500 BCE
              </span>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#34251F] border border-[#B4975A]/40 rounded-full text-[10px] uppercase tracking-[0.25em] text-[#D9C7AA]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B4975A]" />
              <span>Certified Sovereign Provenance</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-[#FAF8F5]">
              The Imperial Heritage Collection
            </h2>

            <p className="text-sm text-[#EDE5D9]/80 leading-relaxed font-light">
              In an era dominated by transient mass manufacturing, our Heritage Collection serves as a
              custodial sanctuary for India’s most endangered artistic traditions. Each work is
              individually commissioned from generational masters whose families held commissions for
              the royal courts of Mewar, Thanjavur, and the Vijayanagara Empire.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#D9C7AA]/20">
              <div>
                <h5 className="font-serif text-base text-[#D9C7AA] font-medium">
                  Swamimalai Bell Bronze
                </h5>
                <p className="text-xs text-[#EDE5D9]/60 mt-1 leading-relaxed">
                  Heavy virgin bronze cast with acoustic resonance and natural patina wax.
                </p>
              </div>

              <div>
                <h5 className="font-serif text-base text-[#D9C7AA] font-medium">
                  Nathdwara Pichwai
                </h5>
                <p className="text-xs text-[#EDE5D9]/60 mt-1 leading-relaxed">
                  Crushed stone lapis lazuli pigments embossed with pure 24k gold leaf.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/shop?filter=heritage"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-xl group"
              >
                <span>Acquire From Heritage Vault</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

