'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, Coupon } from '@/types';
import { INITIAL_COUPONS } from '@/data/content';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeItem: (productId: string, selectedVariant?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Hydrate from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('shreeji_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('shreeji_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {
      console.warn('Failed to hydrate cart from storage');
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('shreeji_cart', JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem('shreeji_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('shreeji_coupon');
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon, isMounted]);

  const addItem = (product: Product, quantity = 1, selectedVariant?: string) => {
    setItems((prev) => {
      const variantKey = selectedVariant || 'Standard';
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && (item.selectedVariant || 'Standard') === variantKey
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variantKey }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, selectedVariant?: string) => {
    const variantKey = selectedVariant || 'Standard';
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (item.selectedVariant || 'Standard') === variantKey)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedVariant?: string) => {
    if (quantity <= 0) {
      removeItem(productId, selectedVariant);
      return;
    }
    const variantKey = selectedVariant || 'Standard';
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (item.selectedVariant || 'Standard') === variantKey) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Apply Coupon Calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find((c) => c.code.toUpperCase() === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (subtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `This coupon requires a minimum cart total of ₹${found.minOrderAmount.toLocaleString('en-IN')}.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

