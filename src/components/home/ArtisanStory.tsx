'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, HeartHandshake } from 'lucide-react';

export const ArtisanStory: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#D9C7AA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold">
              <HeartHandshake className="w-4 h-4" />
              <span>Sustaining Hereditary Masters</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F] leading-[1.15]">
              The Hands Behind the Heirloom
            </h2>

            <p className="text-sm text-[#34251F]/80 leading-relaxed font-light">
              Behind every intricate curve of bell brass, hand-beveled teakwood jharokha, and
              pigment-infused Pichwai painting lies the unwavering patience of Indian master
              artisans. Most have inherited their craft across six generations, preserving secrets of
              clay permeability, bronze alloy ratios, and natural lacquer buffing.
            </p>

            <div className="p-6 bg-[#F8F5EF] border border-[#D9C7AA]/60 space-y-3">
              <p className="font-serif text-sm italic text-[#34251F] leading-relaxed">
                &ldquo;When a patron invites one of our pieces into their home across the world, our
                ancestral village feels honored. It proves that what our grandfathers carved with
                hammers still touches human hearts today.&rdquo;
              </p>
              <div className="text-[11px] uppercase tracking-wider text-[#A85D42] font-semibold">
                — Master Craftsman from the Swamimalai Metallurgy Guild
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-3 border border-[#D9C7AA]/40 bg-[#FAF8F5]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#A85D42]">
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#34251F]/70">
                  Fair Trade Remuneration
                </span>
              </div>
              <div className="p-3 border border-[#D9C7AA]/40 bg-[#FAF8F5]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#A85D42]">
                  60+
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#34251F]/70">
                  Artisan Families Supported
                </span>
              </div>
              <div className="p-3 border border-[#D9C7AA]/40 bg-[#FAF8F5]">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#A85D42]">
                  Zero
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#34251F]/70">
                  Factory Machinery Used
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/story"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#A85D42] hover:text-[#8C4730] transition-colors"
              >
                <span>Discover our Artisan Guild Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Artisan Portrait Split-Screen */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#34251F] border border-[#D9C7AA] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=85&w=1200&auto=format&fit=crop"
                alt="Artisan Craftsmanship In Progress"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center text-[#FAF8F5]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9C7AA] font-mono">
                  Preserving Living Heritage
                </span>
                <h4 className="font-serif text-xl text-[#FAF8F5] mt-1">
                  Master Inlay & Metal Engravers
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

