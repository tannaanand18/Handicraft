'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/content';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#1E1512]">
      {/* Background Cinematic Imagery with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=85&w=2000&auto=format&fit=crop"
          alt="Shreeji Handicraft Hand-Cast Bell Brass"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1512] via-[#1E1512]/60 to-[#1E1512]/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1E1512]/40 to-[#1E1512]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAF8F5] pt-12 pb-20">
        {/* Subtle royal eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#B4975A]/40 bg-[#34251F]/60 backdrop-blur-md rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#B4975A]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#D9C7AA] font-medium">
            Authentic Indian Heritage Masterworks
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.03em] leading-[1.08] text-[#FAF8F5] max-w-4xl mx-auto">
          {SITE_CONFIG.tagline}
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#EDE5D9]/85 max-w-2xl mx-auto font-light leading-relaxed">
          {SITE_CONFIG.subheading}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/story"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#D9C7AA]/60 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#B4975A]" />
            <span>Explore Our Craft</span>
          </Link>
        </div>

        {/* Quick provenance pill counters */}
        <div className="mt-16 pt-8 border-t border-[#D9C7AA]/20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-[#D9C7AA]">500+</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/60 mt-1 block">
              Years of Legacy
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-[#D9C7AA]">100%</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/60 mt-1 block">
              Hand-Poured & Carved
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-[#D9C7AA]">18+</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/60 mt-1 block">
              Artisan Guilds
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-[#D9C7AA]">GI-Tagged</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/60 mt-1 block">
              Certified Provenance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

