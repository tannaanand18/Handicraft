import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, HeartHandshake, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Indian Artisanal Heritage — SHREEJI HANDICRAFT',
  description:
    'Discover the legacy of Shreeji Handicraft: preserving centuries of lost-wax casting, royal woodwork, and devotional painting through generational master craftspeople.',
};

export default function StoryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-24">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-3">
          The Living Heritage Chronicle
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#34251F] leading-tight max-w-3xl mx-auto">
          Honoring the Hereditary Masters of Sacred Craft
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#34251F]/80 max-w-2xl mx-auto font-light leading-relaxed">
          Shreeji Handicraft was founded with an unyielding devotion: to elevate India’s most rare,
          endangered artisanal traditions into timeless luxury heirlooms for connoisseurs worldwide.
        </p>
      </div>

      {/* Cinematic Full-Bleed Editorial Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-[#34251F] border border-[#D9C7AA] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=85&w=2000&auto=format&fit=crop"
            alt="Centuries of Indian Metal Casting"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-center text-[#FAF8F5]">
            <span className="font-serif text-lg sm:text-2xl font-light italic">
              &ldquo;True luxury is never rushed. It is forged in the silence of patient hands.&rdquo;
            </span>
          </div>
        </div>
      </div>

      {/* Three Pillars of Our Ethos */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-[#F8F5EF] border border-[#D9C7AA]/50 space-y-4">
            <span className="text-xs font-mono text-[#B4975A]">01 / PRESERVATION</span>
            <h3 className="font-serif text-xl font-semibold text-[#34251F]">
              Direct Guild Partnerships
            </h3>
            <p className="text-xs text-[#34251F]/70 leading-relaxed font-light">
              We eliminate multiple layers of commercial trading brokers. Our patrons directly fund
              hereditary craft workshops across Swamimalai, Bastar, Nathdwara, and Udaipur, ensuring
              craftspeople receive dignified, sovereign compensation.
            </p>
          </div>

          <div className="p-8 bg-[#F8F5EF] border border-[#D9C7AA]/50 space-y-4">
            <span className="text-xs font-mono text-[#B4975A]">02 / INTEGRITY</span>
            <h3 className="font-serif text-xl font-semibold text-[#34251F]">
              Ancient, Clay-Free & Mineral Media
            </h3>
            <p className="text-xs text-[#34251F]/70 leading-relaxed font-light">
              From pure 100% solid bell brass cast in beeswax models to natural mineral stone
              pigments ground by hand on granite slabs, our creations adhere strictly to traditional
              Vedic material sastras.
            </p>
          </div>

          <div className="p-8 bg-[#F8F5EF] border border-[#D9C7AA]/50 space-y-4">
            <span className="text-xs font-mono text-[#B4975A]">03 / HEIRLOOM</span>
            <h3 className="font-serif text-xl font-semibold text-[#34251F]">
              Designed for Centuries
            </h3>
            <p className="text-xs text-[#34251F]/70 leading-relaxed font-light">
              We reject transient disposable trends. A Shreeji piece is conceived as an architectural
              anchor for generational homes—maturing with an enchanting natural patina that only grows
              more revered with time.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#1E1512] text-[#FAF8F5] p-12 sm:p-16 border border-[#B4975A]/60 shadow-2xl">
        <Sparkles className="w-8 h-8 text-[#B4975A] mx-auto mb-4" />
        <h2 className="font-serif text-2xl sm:text-3xl font-normal">
          Begin Your Private Heirloom Collection
        </h2>
        <p className="text-xs sm:text-sm text-[#EDE5D9]/80 max-w-xl mx-auto mt-3 font-light leading-relaxed">
          Every piece arrives in our bespoke velvet-lined wooden crates with authenticated
          certificates of regional GI provenance.
        </p>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-lg"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

