'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/data/content';
import { Sliders, Save, Check, RefreshCw } from 'lucide-react';

export default function AdminBannersPage() {
  const [tagline, setTagline] = useState(SITE_CONFIG.tagline);
  const [subheading, setSubheading] = useState(SITE_CONFIG.subheading);
  const [announcement1, setAnnouncement1] = useState(SITE_CONFIG.announcements[0]);
  const [announcement2, setAnnouncement2] = useState(SITE_CONFIG.announcements[1]);
  const [supportEmail, setSupportEmail] = useState(SITE_CONFIG.contact.supportEmail);
  const [supportPhone, setSupportPhone] = useState(SITE_CONFIG.contact.supportPhone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Title */}
      <div className="flex justify-between items-center border-b border-[#34251F] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B4975A] font-mono block">
            Digital Storefront
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
            Banners & Editorial Content CMS
          </h1>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-950/60 border border-green-800 px-3 py-1.5">
            <Check className="w-4 h-4" />
            <span>Storefront Content Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
        {/* Announcement Bar Settings */}
        <div className="bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5] border-b border-[#34251F] pb-3">
            Top Announcement Bar Ticker
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Ticker Message 1
              </label>
              <input
                type="text"
                value={announcement1}
                onChange={(e) => setAnnouncement1(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Ticker Message 2
              </label>
              <input
                type="text"
                value={announcement2}
                onChange={(e) => setAnnouncement2(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Cinematic Hero Copy */}
        <div className="bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5] border-b border-[#34251F] pb-3">
            Cinematic Hero Banner Copy
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Hero Headline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-sm font-serif text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Hero Supporting Paragraph
              </label>
              <textarea
                rows={3}
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Business Contact Details (Editable Placeholders) */}
        <div className="bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5] border-b border-[#34251F] pb-3">
            Customer Support & Atelier Contact Placeholders
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Support Email Address
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#D9C7AA] uppercase tracking-wider mb-1 font-semibold">
                Support Phone Number
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes to Storefront</span>
        </button>
      </form>
    </div>
  );
}

