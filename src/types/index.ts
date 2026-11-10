export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryId: string;
  tags: string[];
  images: string[];
  dimensions: string;
  weight: string;
  material: string;
  artisanProvenance: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isHeritage?: boolean;
  isNewArrival?: boolean;
  variants?: {
    name: string;
    options: string[];
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedVariant?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod: 'Razorpay' | 'COD' | 'NetBanking' | 'UPI';
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  addresses?: ShippingAddress[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
  productPurchased?: string;
  verifiedBuyer: boolean;
}

