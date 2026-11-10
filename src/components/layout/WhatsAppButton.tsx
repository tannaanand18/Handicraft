'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/data/content';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = SITE_CONFIG.contact.whatsappNumber;
  const message = encodeURIComponent(
    'Namaste Shreeji Handicraft Concierge. I am inquiring about your handcrafted collections and custom heirloom commissions.'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip dialog */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-[#FAF8F5] border border-[#D9C7AA] shadow-2xl p-4 mb-2 animate-fade-in text-[#34251F]">
          <div className="flex items-center justify-between border-b border-[#D9C7AA]/40 pb-2 mb-2">
            <span className="font-serif text-sm font-semibold tracking-wide">
              Artisan Concierge
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#34251F]/60 hover:text-[#34251F]"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#34251F]/80 leading-relaxed mb-3">
            Inquire directly with our art advisors for bespoke orders, gifting sets, or delivery timelines.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 text-xs uppercase tracking-wider font-semibold shadow transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Floating launcher */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#34251F] hover:bg-[#1E1512] text-[#B4975A] border-2 border-[#B4975A] flex items-center justify-center shadow-xl hover:scale-105 transition-all focus:outline-none"
        title="Artisan WhatsApp Concierge"
        aria-label="Chat with Handicraft Concierge"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

