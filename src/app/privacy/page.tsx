import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — SHREEJI HANDICRAFT',
  description: 'Our commitment to data discretion and patron confidentiality.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Discretion & Security
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#34251F]">
            Client Privacy Policy
          </h1>
        </div>

        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#34251F]/80 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              1. Information Collection
            </h2>
            <p>
              Shreeji Handicraft collects patron information solely to facilitate secure order
              fulfillment, bespoke courier tracking, and optional newsletter dispatches. We never sell,
              lease, or monetize your contact details to third-party marketing networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              2. Payment Data Security
            </h2>
            <p>
              All online transactions are processed through PCI-DSS Level 1 certified Indian payment
              gateways (Razorpay). Shreeji Handicraft does not store credit card numbers, CVVs, or UPI
              PINs on internal servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              3. Communication Preferences
            </h2>
            <p>
              Patrons may update their notification preferences or opt out of editorial newsletter
              announcements at any time via their account dashboard or direct unsubscribe links.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

