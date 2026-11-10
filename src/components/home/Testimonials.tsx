'use client';

import React, { useState } from 'react';
import { SAMPLE_TESTIMONIALS } from '@/data/content';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) =>
      curr === 0 ? SAMPLE_TESTIMONIALS.length - 1 : curr - 1
    );
  };

  const next = () => {
    setCurrentIndex((curr) =>
      curr === SAMPLE_TESTIMONIALS.length - 1 ? 0 : curr + 1
    );
  };

  const current = SAMPLE_TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#D9C7AA]/40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Patron Chronicles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#34251F]">
            Reflections from Connoisseurs
          </h2>
          {/* Transparent notice adhering strictly to business guidelines */}
          <p className="text-[11px] text-[#34251F]/60 mt-2 font-mono tracking-wide">
            [Sample Patron Reviews — Genuine client testimonials will be populated dynamically]
          </p>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="relative bg-[#F8F5EF] border border-[#D9C7AA]/60 p-8 sm:p-12 shadow-sm text-center">
          <Quote className="w-10 h-10 text-[#B4975A]/30 mx-auto mb-6" />

          {/* Stars */}
          <div className="flex justify-center text-[#B4975A] mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Quote Body */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-[#34251F] leading-relaxed max-w-3xl mx-auto min-h-[100px] flex items-center justify-center">
            &ldquo;{current.quote}&rdquo;
          </p>

          {/* Author Details */}
          <div className="mt-8 pt-6 border-t border-[#D9C7AA]/30">
            <h4 className="font-serif text-base font-semibold text-[#34251F]">
              {current.author}
            </h4>
            <p className="text-xs text-[#34251F]/70 mt-0.5">
              {current.location}
            </p>
            {current.productPurchased && (
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#A85D42] font-medium mt-2 bg-[#EDE5D9]/70 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Acquired: {current.productPurchased}</span>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center absolute inset-y-0 inset-x-2 sm:inset-x-4 pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto p-2 rounded-full bg-[#FAF8F5] border border-[#D9C7AA] text-[#34251F] hover:bg-[#34251F] hover:text-[#FAF8F5] shadow transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto p-2 rounded-full bg-[#FAF8F5] border border-[#D9C7AA] text-[#34251F] hover:bg-[#34251F] hover:text-[#FAF8F5] shadow transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {SAMPLE_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-8 bg-[#A85D42]' : 'w-2 bg-[#D9C7AA]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

