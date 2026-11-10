# ✦ SHREEJI HANDICRAFT — LUXURY E-COMMERCE PLATFORM ✦

> *"Where Tradition Meets Timeless Art"*

An internationally recognized, luxury Indian handicraft e-commerce storefront and atelier management system. Built with Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, and Canvas Confetti.

---

## 🏛️ Brand & Creative Direction

Inspired by the visual restraint, whitespace, and typographic elegance of high-end editorial houses like Unica Seren, Good Earth, and Sabyasachi.

### The Royal Palette
* **Warm Ivory:** `#F8F5EF` — Soft, welcoming museum-grade canvas.
* **Sandstone:** `#D9C7AA` — Reminiscent of Jodhpur and Jaisalmer palace courtyards.
* **Terracotta:** `#A85D42` — Earthy warmth of ancient Indus Valley kilns.
* **Antique Gold:** `#B4975A` — Royal foil accents and subtle shimmers.
* **Deep Espresso:** `#34251F` — High-contrast editorial typography and anchor elements.
* **Dark Velvet:** `#1E1512` — Immersive heritage vaults and nocturnal luxury.

### Typography Hierarchy
* **Headlines & Editorial Titles:** *Cormorant Garamond* (Fine optical serif with generous letter-spacing).
* **Body Text & Metadata:** *Plus Jakarta Sans* (Crisp, modern, legible luxury sans).

---

## 🌟 Key Architectural Features

### 1. Homepage Experience (15 Dedicated Sections)
1. **Announcement Bar:** Ticker carousel with promotions and complimentary shipping thresholds.
2. **Refined Navigation:** Transparent hero header that smoothly transitions to an ivory blur sticky bar on scroll; includes mega-menu category dropdown, mobile drawer, predictive search, account, wishlist counter, and animated bag trigger.
3. **Cinematic Hero:** Full-bleed Swamimalai bell-brass photography, editorial typography, dual CTAs (*Shop Collection* & *Explore Our Craft*), and legacy metric counters.
4. **Brand Highlights:** 4 core brand pillars (*Authentic Craftsmanship*, *Made with Passion*, *Timeless Designs*, *Thoughtful Gifting*).
5. **Shop by Categories:** 8 curated visual categories (*Brass & Metal Art*, *Wooden Handicrafts*, *Home Decor*, *Traditional Indian Crafts*, *Wall Decor*, *Handmade Gifts*, *Decorative Accessories*, *Artistic Collectibles*).
6. **Featured Collection:** Tabbed product showcase with hover image flips, instant quick view modals, wishlist bookmarks, and quick add.
7. **Our Craftsmanship:** Staggered archival photography, master quotes, and metallurgical storytelling.
8. **Best Sellers:** Provenance-backed client favorites with review badges and stock counters.
9. **Heritage Collection:** Deep espresso immersive showcase dedicated to GI-tagged and ancient lost-wax metallurgy.
10. **Artisan Story:** Respectful split-screen narrative honoring hereditary master sculptors and woodcarvers.
11. **Special Gifting Suite:** Bespoke velvet-lined gift boxes and corporate gifting concierge.
12. **Customer Testimonials:** Editorial carousel featuring clearly identified sample connoisseur reviews.
13. **Instagram Atelier Gallery:** Social grid highlighting authentic artisan workshops and collector spaces.
14. **Newsletter Subscription:** Private curator circle sign-up with an instant 10% privilege voucher (`HERITAGE10`).
15. **Editorial Footer:** Complete brand dossier, category links, customer support, trust badges, payment icons, and policy links.

### 2. Dedicated Product Detail Experience (`/products/[slug]`)
* Large multi-angle photography gallery with hover zoom.
* Thumbnail navigation and share / wishlist toggles.
* Price with strike-through original MRP and privilege savings calculation.
* Real-time stock status (*"Only 3 Left"* alert for limited batches).
* Interactive 6-digit Indian Pincode delivery estimator with courier timeline.
* Dynamic variant selector (e.g. *Antique Vintage Brass* vs *Lustrous Temple Gold*).
* Quantity controls, *Add to Heirloom Bag*, and *Acquire Now* (direct checkout jump).
* Tabbed dossier: *Artisan Story & Provenance*, *Material Specifications*, *Heirloom Care*, and *Royal Transit Packaging*.
* Related collection pieces and recently viewed items tracking.

### 3. Catalog & Browsing (`/shop`)
* Real-time search across product names, categories, materials, and artisan regions.
* Category filters, medium/material filters, and price range slider (₹3,000 to ₹25,000).
* "Heritage Only" curation filter.
* Sorting options: *Featured*, *Best Sellers*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*.
* Active filter pills with 1-click removal.

### 4. Slide-Out Cart & Heirloom Bag
* Free Shipping Progress Bar (*Complimentary insured transit unlocked at ₹2,999*).
* Line items with quantity stepper and removal.
* Promotional voucher input engine (e.g., `HERITAGE10`, `SHREEJI20`, `ROYAL500`).
* Real-time subtotal, discount, and total calculation.

### 5. Multi-Step Checkout (`/checkout`)
* Comprehensive shipping address form with validation.
* Multiple payment options:
  * **Razorpay Secure Gateway** (UPI, Cards, NetBanking).
  * **Cash on Delivery (COD)** with courier inspection verification.
* Instant order creation with order number, estimated delivery date, and courier tracking code.
* Order confirmation screen with celebratory confetti animation and printable receipt (`/order-confirmation/[orderId]`).

### 6. Customer Account Portal (`/account`)
* Patron login & profile ledger.
* 1-Click Demo Logins for instant evaluation (*Patron Demo* and *Admin Console*).
* Order history with live status badges (*Processing*, *Shipped*, *Delivered*), courier tracking links, and addresses.
* Personal saved wishlist grid.

### 7. Independent Admin Dashboard (`/admin`)
* **Executive Overview (`/admin`):** Gross sales metrics, order counts, product counts, low stock alerts, quarterly revenue trajectory bar chart, and recent orders table.
* **Product Management (`/admin/products`):** Commission new heirlooms, edit pricing/MRP/inventory, delete/retire products, manage craft origins.
* **Order Management (`/admin/orders`):** Update status (*Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*), assign courier tracking IDs.
* **Coupon Management (`/admin/coupons`):** Create and toggle discount voucher codes.
* **Storefront CMS (`/admin/banners`):** Edit announcement bar ticker messages, hero copy, and support contact placeholders.

### 8. Client Concierge & Legal Pages
* **Contact (`/contact`):** Custom commission request form, corporate gifting requests, and direct WhatsApp advisor link.
* **Our Story (`/story`):** In-depth chronicle of Indian artisanal heritage and fair-trade ethics.
* **Shipping Policy (`/shipping-policy`):** Transit timelines and double-crated packaging details.
* **Returns Policy (`/returns`):** 7-day concierge return policy.
* **Privacy Policy (`/privacy`)** & **Terms of Service (`/terms`)**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env.local
```
Update the keys in `.env.local` if integrating live Razorpay or database credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🎟️ Active Test Promotional Coupons
* `HERITAGE10` — 10% off any curated acquisition above ₹2,500.
* `SHREEJI20` — 20% off luxury orders above ₹10,000.
* `ROYAL500` — Flat ₹500 off festive collections above ₹3,000.

---

## 🛡️ Admin & Patron Evaluation Credentials
For effortless one-click evaluation during review:
* Visit `/account` and click **"Admin Console"** or **"Patron Demo"**.
* Or navigate directly to `/admin` to manage inventory, fulfill client orders, and modify announcement banners.

---

## ⚖️ Business & Ethical Integrity
* **No Invented Business Data:** Company phone numbers, addresses, and registration numbers are strictly configured with editable administrative placeholders.
* **Authentic Transparency:** Customer reviews and testimonials are clearly presented as sample reflections until genuine patron feedback is populated via the admin console.
* **Domain Independent:** All routes and assets are relative and portable for future domain deployments.
#   H a n d i c r a f t  
 