import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — SHREEJI HANDICRAFT',
  description: 'Terms and conditions governing acquisitions and services on Shreeji Handicraft.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#34251F]">
            Terms of Service
          </h1>
        </div>

        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#34251F]/80 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and placing an order through SHREEJI HANDICRAFT, you acknowledge and agree
              to abide by these Terms of Service and our Authenticity Guarantees.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              2. Intellectual Property
            </h2>
            <p>
              All editorial imagery, brand typography, custom product descriptions, and artisanal
              designs presented on this website are the proprietary property of Shreeji Handicraft and
              its partnering artisan guilds. Unauthorized commercial replication is strictly
              prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              3. Pricing and Availability
            </h2>
            <p>
              All prices are listed in Indian Rupees (₹ INR) and include applicable statutory GST.
              Due to small-batch manual kiln production, availability may fluctuate without prior
              notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              4. Governing Law
            </h2>
            <p>
              These terms shall be construed and governed in accordance with the laws of the Republic
              of India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

