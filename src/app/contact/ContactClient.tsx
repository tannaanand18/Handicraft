'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITE_CONFIG } from '@/data/content';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ContactClient: React.FC = () => {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'general';

  const [inquiryType, setInquiryType] = useState<string>(
    initialType === 'corporate-gifting' ? 'corporate' : 'general'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    'Namaste Shreeji Handicraft. I am requesting a private consultation regarding your master collections.'
  )}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
          Private Client Services
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#34251F]">
          Artisan Concierge & Inquiries
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#34251F]/70 max-w-xl mx-auto font-light leading-relaxed">
          Whether you desire a custom-proportioned teakwood jharokha, a personalized Pichwai
          commission, or bespoke heirloom wedding gifting, our curators are at your service.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F5EF] border border-[#D9C7AA]/50 p-8 sm:p-10 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EDE5D9] flex items-center justify-center mx-auto text-[#A85D42]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#34251F]">Inquiry Registered</h3>
                <p className="text-xs text-[#34251F]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our senior art advisor will reach out via
                  email within 24 business hours with custom sketches and craft details.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#34251F] text-[#FAF8F5] text-xs uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Inquiry Type Radio */}
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#34251F] mb-2">
                    Inquiry Nature
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'general', label: 'General / Order' },
                      { id: 'bespoke', label: 'Bespoke Commission' },
                      { id: 'corporate', label: 'Royal Gifting Suite' },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setInquiryType(tab.id)}
                        className={`py-2 px-2 border text-center transition-all ${
                          inquiryType === tab.id
                            ? 'bg-[#34251F] text-[#FAF8F5] border-[#34251F]'
                            : 'bg-[#FAF8F5] text-[#34251F] border-[#D9C7AA] hover:border-[#34251F]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#34251F] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyadarshini Rao"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:border-[#B4975A] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider font-semibold text-[#34251F] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:border-[#B4975A] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#34251F] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:border-[#B4975A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#34251F] mb-1.5">
                    Your Message / Desired Dimensions / Quantities *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your sanctuary space, custom dimensions, or event timeline..."
                    className="w-full bg-[#FAF8F5] border border-[#D9C7AA] px-3.5 py-2.5 text-xs text-[#34251F] focus:border-[#B4975A] focus:outline-none leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#34251F] hover:bg-[#1E1512] text-[#FAF8F5] py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow flex items-center justify-center gap-2"
                >
                  <span>Dispatch Inquiry to Curator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Atelier Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Atelier Card */}
            <div className="bg-[#FAF8F5] border border-[#D9C7AA] p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold block">
                Atelier Location (Editable Placeholders)
              </span>

              <div className="space-y-4 text-xs text-[#34251F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A85D42] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Craft Gallery & Headquarters</span>
                    <p className="text-[#34251F]/70 leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.atelierAddress.line1}
                      <br />
                      {SITE_CONFIG.contact.atelierAddress.city},{' '}
                      {SITE_CONFIG.contact.atelierAddress.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#A85D42] shrink-0" />
                  <div>
                    <span className="font-semibold block">Direct Line</span>
                    <span className="text-[#34251F]/70">{SITE_CONFIG.contact.supportPhone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#A85D42] shrink-0" />
                  <div>
                    <span className="font-semibold block">Electronic Mail</span>
                    <span className="text-[#34251F]/70">{SITE_CONFIG.contact.supportEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#A85D42] shrink-0" />
                  <div>
                    <span className="font-semibold block">Consultation Hours</span>
                    <span className="text-[#34251F]/70">
                      {SITE_CONFIG.contact.operatingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Button */}
              <div className="pt-4 border-t border-[#D9C7AA]/40">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with WhatsApp Advisor</span>
                </a>
              </div>
            </div>

            {/* Reassurance note */}
            <div className="p-6 bg-[#F8F5EF] border border-[#D9C7AA]/40 text-xs text-[#34251F]/80 leading-relaxed space-y-2">
              <span className="font-serif text-sm font-semibold text-[#34251F] block">
                The Heritage Guarantee
              </span>
              <p>
                Every piece commissioned through our atelier includes authenticated certification of
                materials, artisan community recognition, and dedicated wooden transit crating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

