import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Box, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Insured Transit Policy — SHREEJI HANDICRAFT',
  description: 'Learn about our insured royal packaging, white-glove courier partners, and domestic & international delivery timelines.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A85D42] font-semibold block mb-2">
            Insured Transit Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#34251F]">
            Royal Shipping & Packaging Policy
          </h1>
        </div>

        <div className="bg-[#F8F5EF] border border-[#D9C7AA]/50 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-[#34251F]/80 leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              1. Complimentary Insured Delivery
            </h2>
            <p>
              Shreeji Handicraft provides complimentary insured surface delivery on all domestic orders
              with a cart subtotal exceeding ₹2,999. For orders below this threshold, a standardized
              crating and transit charge of ₹250 applies nationwide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              2. Reinforced Heirloom Crating
            </h2>
            <p>
              Due to the rare metallurgical and fragile sculptural nature of our brass urlis,
              teakwood jharokha mirrors, and hand-painted Pichwai frames, each piece is wrapped in
              triple-layer shock-dampening foam, secured with acid-free tissue, and encased inside
              bespoke reinforced wooden packaging crates before handover to our courier partners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              3. Dispatch & Delivery Timelines
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Metropolitan Cities (Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Hyderabad, Ahmedabad):</strong> 3 to 5 business days from order confirmation.
              </li>
              <li>
                <strong>Rest of India:</strong> 5 to 7 business days depending on regional postal access.
              </li>
              <li>
                <strong>Bespoke Commissions & Made-to-Order Pieces:</strong> 12 to 21 business days, inclusive of individual artisan kiln firing and hand-chasing.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#34251F]">
              4. Real-Time Tracking & Verification
            </h2>
            <p>
              Upon handover to our logistics partners (Delhivery Luxury Express, Blue Dart, and DTDC),
              an encrypted tracking link and live SMS notification is dispatched to your registered
              contact credentials.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-wider text-[#A85D42] hover:underline font-semibold"
          >
            Have a custom transit requirement? Inquire with our concierge →
          </Link>
        </div>
      </div>
    </div>
  );
}

