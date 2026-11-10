'use client';

import React from 'react';
import { BRAND_VALUES } from '@/data/content';
import { Sparkles, Heart, Compass, Gift } from 'lucide-react';

export const BrandHighlights: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Hammer':
        return <Compass className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Gift':
        return <Gift className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#D9C7AA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            The Shreeji Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#34251F]">
            Pillars of Indian Artistry
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_VALUES.map((item, index) => (
            <div
              key={item.id}
              className="p-8 bg-[#F8F5EF] border border-[#D9C7AA]/40 relative group hover:border-[#B4975A] transition-all duration-300"
            >
              <span className="text-[10px] font-mono text-[#B4975A] block mb-4">
                0{index + 1}
              </span>
              <div className="w-10 h-10 rounded-full bg-[#EDE5D9] flex items-center justify-center text-[#A85D42] mb-5 group-hover:bg-[#34251F] group-hover:text-[#FAF8F5] transition-colors">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#34251F] tracking-wide mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] uppercase tracking-wider text-[#A85D42] font-medium mb-3">
                {item.subtitle}
              </p>
              <p className="text-xs text-[#34251F]/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

