'use client';

import React from 'react';
import { INSTAGRAM_POSTS, SITE_CONFIG } from '@/data/content';
import { InstagramIcon } from '@/components/ui/SocialIcons';
import { Heart } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-24 bg-[#F8F5EF] border-b border-[#D9C7AA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@shreejihandicraft</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#34251F]">
            The Living Atelier
          </h2>
          <p className="text-xs text-[#34251F]/70 mt-2 font-light">
            Tag us in your sanctuary styling with #ShreejiHandicraft to be featured in our seasonal curation.
          </p>
        </div>

        {/* 6-Photo Curated Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={SITE_CONFIG.contact.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#34251F] border border-[#D9C7AA]/50 block"
            >
              <img
                src={post.image}
                alt="Instagram craft highlight"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#1E1512]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-[#FAF8F5]">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-[#B4975A]" />
                </div>
                <div>
                  <p className="text-[11px] font-serif leading-snug line-clamp-3">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#D9C7AA] mt-2">
                    <Heart className="w-3 h-3 fill-current text-[#A85D42]" />
                    <span>{post.likes} loves</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


