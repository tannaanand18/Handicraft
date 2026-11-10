import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Authenticity Guarantee — SHREEJI HANDICRAFT',
  description: 'Our 7-day art concierge return policy and 100% certified provenance guarantee.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Patron Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#34251F]">
            Returns & Authenticity Guarantee
          </h1>
        </div>

        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#34251F]/80 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              1. 7-Day Concierge Return Window
            </h2>
            <p>
              We want you to feel unconditional serenity with every handcrafted acquisition. If a
              piece does not harmonize with your sanctuary, you may request a return or exchange
              within 7 calendar days of physical receipt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              2. Transit Damage Guarantee
            </h2>
            <p>
              In the rare event that an item suffers damage during transit, please notify our
              concierge within 48 hours of unboxing with photographic evidence. We will arrange
              immediate doorstep reverse pickup and expedite an identical replacement or full refund
              with zero deduction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              3. Nature of Handcrafted Artifacts
            </h2>
            <p>
              Please note that slight organic variations in bronze patina shading, wood grain texture,
              and miniature brush stroke densities are authentic signatures of manual craft, not
              manufacturing defects. Each piece is fundamentally unique.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              4. Refund Processing
            </h2>
            <p>
              Upon safe inspection at our master studio, refunds are credited back to your original
              payment source (Razorpay, UPI, or Bank Account) within 5 to 7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

