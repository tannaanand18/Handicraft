'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EDE5D9] border border-[#D9C7AA] rounded-full text-[10px] uppercase tracking-[0.25em] text-[#A85D42] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B4975A]" />
          <span>Curator&apos;s Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F] leading-tight">
          Receive First Notice of Rare Heirloom Releases
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-[#34251F]/70 max-w-xl mx-auto font-light leading-relaxed">
          Subscribers receive invitations to private artisanal auctions, stories from hereditary
          foundries, and an immediate 10% privilege voucher on their inaugural acquisition.
        </p>

        {/* Form or Success State */}
        <div className="mt-8 max-w-md mx-auto">
          {isSubmitted ? (
            <div className="p-4 bg-[#EDE5D9] border border-[#B4975A] text-left flex items-start gap-3">
              <Check className="w-5 h-5 text-[#A85D42] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#34251F]">
                  Welcome to the Patron Circle
                </h4>
                <p className="text-xs text-[#34251F]/80 mt-1">
                  Use promotional code <span className="font-mono font-bold text-[#A85D42]">HERITAGE10</span> at checkout to enjoy 10% off your curated selection.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email address"
                className="flex-1 bg-[#F8F5EF] border border-[#D9C7AA] text-xs px-4 py-3 text-[#34251F] placeholder:text-[#34251F]/40 focus:outline-none focus:border-[#B4975A]"
                required
              />
              <button
                type="submit"
                className="bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <span className="block text-[10px] text-[#34251F]/50 mt-3 uppercase tracking-wider">
            Strict privacy guaranteed. We send dispatches no more than twice a month.
          </span>
        </div>
      </div>
    </section>
  );
};

