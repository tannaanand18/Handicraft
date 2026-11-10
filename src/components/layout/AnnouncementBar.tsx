'use client';

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/data/content';
import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = SITE_CONFIG.announcements;

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible) return null;

  return (
    <aside aria-label="Store Announcements" className="bg-[#34251F] text-[#FAF8F5] text-[11px] md:text-xs tracking-[0.16em] uppercase font-sans border-b border-[#4A372E] relative z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="w-6 hidden md:block"></div>
        <div className="flex-1 text-center font-medium transition-opacity duration-500 overflow-hidden">
          <Link
            href="/shop"
            className="hover:text-[#D9C7AA] transition-colors inline-flex items-center gap-1.5 focus:outline-none"
          >
            <span>{announcements[currentIndex]}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-colors p-0.5 rounded focus:outline-none"
          aria-label="Close Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

